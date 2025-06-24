"use client"

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import { Users, Search, Eye, CheckCircle, XCircle, DollarSign, Clock, User, RefreshCcw } from "lucide-react";
import LoadingSpinner from "@/components/loadingspinner";

interface PaymentPhase {
  phase_number: number;
  description: string;
  amount: number;
  paid: boolean;
  mpesa_code: string | null;
  status: "PENDING" | "CONFIRMED" | "FAILED";
}

interface Member {
  id: string;
  full_name: string;
  phone: string;
  location: string;
  e_contact_name: string;
  e_contact_phone: string;
  payment_plan: "full" | "installment";
  created_at: string;
  updated_at: string;
  total_amount: number;
  total_paid: number;
  remaining_amount: number;
  phases: PaymentPhase[];
  status: "active" | "completed" | "pending";
}

interface PaymentRecord {
  member_id: string;
  member_name: string;
  phase_number: number;
  amount: number;
  expected_amount: number;
  mpesa_code: string | null;
  status: "PENDING" | "CONFIRMED" | "FAILED";
  submitted_date: string;
  approved_date?: string;
  approved_by?: string;
  notes?: string;
}

const AdminPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<PaymentRecord | null>(null);
  const [activeTab, setActiveTab] = useState("members");
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const api = process.env.NEXT_PUBLIC_BACKEND_URLA;

  const fetchMembers = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${api}retreatreg`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch members");
      }

      const data: Member[] = await response.json();

     const mappedData: Member[] = data.map((member) => ({
      id: member.id,
      full_name: member.full_name,
      phone: member.phone,
      location: member.location,
      e_contact_name: member.e_contact_name,
      e_contact_phone: member.e_contact_phone,
      created_at: member.created_at,
      updated_at: member.updated_at,
      payment_plan: member.payment_plan,
      status: member.remaining_amount <= 0 ? "completed" : member.total_paid > 0 ? "active" : "pending",
      total_paid: member.total_paid,
      total_amount: member.total_amount,
      remaining_amount: member.remaining_amount,
      phases: member.phases,
    }));
      setMembers(mappedData);
    } catch (error: unknown) {
      console.error("Error fetching members:", error);
      toast.error("Failed to fetch members");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);


  useEffect(() => {
    fetchRefreshPage()
  }, [])

    const fetchRefreshPage = async () => {
    const response = await fetch(`${api}retreatreg`, {})
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch members");
      }

       const data: Member[] = await response.json();
      
     const mappedData: Member[] = data.map((member) => ({
      id: member.id,
      full_name: member.full_name,
      phone: member.phone,
      location: member.location,
      e_contact_name: member.e_contact_name,
      e_contact_phone: member.e_contact_phone,
      created_at: member.created_at,
      updated_at: member.updated_at,
      payment_plan: member.payment_plan,
      status: member.remaining_amount <= 0 ? "completed" : member.total_paid > 0 ? "active" : "pending",
      total_paid: member.total_paid,
      total_amount: member.total_amount,
      remaining_amount: member.remaining_amount,
      phases: member.phases,
    }));
      setMembers(mappedData);
  }
 
  const pendingPayments: PaymentRecord[] = members.flatMap(member =>
    member.phases
      .filter(phase => phase.status === "PENDING" && phase.mpesa_code)
      .map(phase => ({
        member_id: member.id,
        member_name: member.full_name,
        phase_number: phase.phase_number,
        amount: phase.amount,
        expected_amount: phase.amount,
        mpesa_code: phase.mpesa_code,
        status: phase.status,
        submitted_date: member.updated_at,
        approved_date: undefined,
        approved_by: undefined,
        notes: undefined,
      }))
  );

  const handlePaymentAction = async (
    memberId: string,
    phaseNumber: number,
    action: "approve" | "reject",
  ) => {
    try {
      const member = members.find(m => m.id === memberId);
      if (!member) {
        throw new Error("Member not found");
      }

      const updatedPhases = member.phases.map(phase =>
        phase.phase_number === phaseNumber
          ? {
              ...phase,
              status: action === "approve" ? "CONFIRMED" : "FAILED",
              paid: action === "approve",
            }
          : phase
      );

      const payload = {
        id: memberId,
        phases: updatedPhases,
      };
      // console.log("Sending PATCH payload:", JSON.stringify(payload, null, 2));

      const response = await fetch(`${api}retreatreg`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("PATCH error response:", errorData);
        throw new Error(errorData.error || `Failed to ${action} payment`);
      }

      const data: { message: string; record: Member } = await response.json();
      console.log("PATCH response:", JSON.stringify(data, null, 2));

      setMembers(prev =>
        prev.map(m =>
          m.id === memberId
            ? {
                ...data.record,
                payment_plan: data.record.payment_plan.toLowerCase() as "full" | "installment",
                status: data.record.remaining_amount <= 0 ? "completed" : data.record.total_paid > 0 ? "active" : "pending",
              }
            : m
        )
      );

      toast.success(`Payment for phase ${phaseNumber} has been ${action === "approve" ? "approved" : "rejected"} successfully.`);
      await fetchMembers();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      toast.error(`Failed to ${action} payment: ${message}`);
    }
  };

  const filteredMembers = members.filter(member =>
    member.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.phone.includes(searchTerm) ||
    member.phases.some(phase => phase.mpesa_code && phase.mpesa_code.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getPhaseStatus = (member: Member): string => {
    const phaseWithMpesa = member.phases.find(phase => phase.mpesa_code);
    if (phaseWithMpesa) {
      return phaseWithMpesa.status.toLowerCase();
    }

    const latestPhase = member.phases.reduce((latest, phase) =>
      phase.phase_number > latest.phase_number ? phase : latest,
      member.phases[0]
    );
    return latestPhase?.status.toLowerCase() || "pending";
  };

  const completedMembersCount = members.filter(member => {
    const phases = member.phases || [];

    if (member.payment_plan === "full") {
      return phases.length === 1 && phases[0].status === "CONFIRMED";
    }

    if (member.payment_plan === "installment") {
      return (
        phases.length === 4 &&
        phases.every(phase => phase.status === "CONFIRMED")
      );
    }

    return false;
  }).length;

  const totalPaid = members.reduce((sum, member) => {
  const phases = member.phases || [];

  // For FULL plan
  if (member.payment_plan === "full") {
    if (phases.length === 1 && phases[0].status === "CONFIRMED") {
      return sum + parseFloat(String(phases[0].amount || "0"));
    }
  }

  // For INSTALLMENT plan
  if (member.payment_plan === "installment") {
    const confirmedPhasesAmount = phases.reduce((phaseSum, phase) => {
      if (phase.status === "CONFIRMED") {
        return phaseSum + parseFloat(String(phase.amount || "0"));
      }
      return phaseSum;
    }, 0);

    return sum + confirmedPhasesAmount;
  }

  return sum;
}, 0);

  const handleRefresh = () => {
    fetchRefreshPage()
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 text-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="w-full p-4 space-y-6">
      <div className="md:flex items-center justify-between">
      <div className="mb-2">
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <p className="text-muted-foreground">Manage member registrations and payments</p>
      </div>
        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="px-3 py-2">
            <Users className="w-4 h-4 mr-2" />
            {members.length} Members
          </Badge>
          <Badge variant="outline" className="px-3 py-2">
            <DollarSign className="w-4 h-4 mr-2" />
            {pendingPayments.length} Pending
          </Badge>
        </div>
        </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="payments">Pending Payments</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="md:flex items-center justify-between">
                <div className="flex items-center gap-2">
                <CardTitle className="mb-2">Registered Members</CardTitle>
                <button 
                  onClick={handleRefresh}
                  className="flex items-center gap-2 bg-black/80 text-gray-100 py-1 px-2 rounded-lg text-sm mb-2">
                  <RefreshCcw size={12} />
                  Refresh List
                </button>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search members..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8 w-64"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Payment Plan</TableHead>
                    <TableHead>M-Pesa Code</TableHead>
                    <TableHead>Total Paid</TableHead>
                    <TableHead>Remaining</TableHead>
                    <TableHead>Phase Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">{member.full_name}</TableCell>
                      <TableCell>{member.phone}</TableCell>
                      <TableCell>
                        <Badge variant={member.payment_plan === "full" ? "default" : "secondary"}>
                          {member.payment_plan === "full" ? "Full Payment" : "Installments"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {member.phases.some(phase => phase.mpesa_code) ? (
                          <div className="max-h-20 overflow-y-auto border rounded p-2">
                            {member.phases
                              .filter(phase => phase.mpesa_code)
                              .map(phase => (
                                <span
                                  key={phase.mpesa_code}
                                  className="block text-sm text-muted-foreground"
                                >
                                  {phase.mpesa_code} (Phase {phase.phase_number})
                                </span>
                              ))}
                          </div>
                        ) : (
                          "N/A"
                        )}
                      </TableCell>
                      <TableCell>KSH {member.total_paid.toLocaleString()}</TableCell>
                      <TableCell>KSH {member.remaining_amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={
                          getPhaseStatus(member) === "confirmed" ? "default" :
                          getPhaseStatus(member) === "pending" ? "secondary" : "destructive"
                        }>
                          {getPhaseStatus(member)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedMember(member)}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="w-full h-full p-4 sm:max-w-2xl sm:h-auto sm:p-6 overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Member Details</DialogTitle>
                            </DialogHeader>
                            {selectedMember && (
                              <div className="space-y-6 mt-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  <div>
                                    <Label className="text-sm font-medium text-muted-foreground">Full Name</Label>
                                    <p className="text-sm">{selectedMember.full_name}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium text-muted-foreground">Phone Number</Label>
                                    <p className="text-sm">{selectedMember.phone}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium text-muted-foreground">Location</Label>
                                    <p className="text-sm">{selectedMember.location}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium text-muted-foreground">Emergency Contact</Label>
                                    <p className="text-sm">{selectedMember.e_contact_name}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium text-muted-foreground">Emergency Phone</Label>
                                    <p className="text-sm">{selectedMember.e_contact_phone}</p>
                                  </div>
                                </div>

                                <div>
                                  <Label className="text-sm font-medium text-muted-foreground">Payment History</Label>
                                  <div className="space-y-2 mt-2">
                                    {selectedMember.phases.map((phase) => (
                                      <div key={phase.phase_number} className="border rounded-lg p-3">
                                        <div className="flex items-center justify-between">
                                          <div>
                                            <p className="font-medium">
                                              Phase {phase.phase_number}: {phase.description} - KSH {phase.amount.toLocaleString()}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                              M-Pesa Code: {phase.mpesa_code || "N/A"} | Updated: {new Date(selectedMember.updated_at).toLocaleString("en-KE", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                hour12: false,
                                                })}
                                            </p>
                                          </div>
                                          <Badge variant={
                                            phase.status === "CONFIRMED" ? "default" :
                                            phase.status === "PENDING" ? "secondary" : "destructive"
                                          }>
                                            {phase.status.toLowerCase()}
                                          </Badge>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
  <Card>
    <CardHeader>
      <div className="flex items-center gap-2">
      <CardTitle>Pending Payment Approvals</CardTitle>
      <button 
        onClick={handleRefresh}
        className="flex items-center gap-2 bg-black/80 text-gray-100 py-1 px-2 rounded-lg text-sm mb-2">
        <RefreshCcw size={12} />
        Refresh List
      </button>
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {pendingPayments.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <CheckCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No pending payments to review</p>
          </div>
        ) : (
          pendingPayments.map((payment) => (
            <Card key={`${payment.member_id}-${payment.phase_number}`} className="border-l-4 border-l-yellow-500">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <User className="w-4 h-4" />
                      <span className="font-medium">{payment.member_name}</span>
                      <Badge variant="outline">Phase {payment.phase_number}</Badge>
                    </div>
                    <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                      {/* <span>Amount: KSH {payment.amount.toLocaleString()}</span> */}
                      <span>M-Pesa Code: {payment.mpesa_code}</span>
                      <span>
                          Date: {new Date(payment.submitted_date).toLocaleString("en-KE", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          })}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-end">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedPayment(payment)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Review
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="w-full sm:max-w-lg md:max-w-2xl p-6">
                        <DialogHeader>
                          <DialogTitle>Review Payment</DialogTitle>
                        </DialogHeader>
                        {selectedPayment && (
                          <div className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <Label>Member Name</Label>
                                <p className="text-sm">{selectedPayment.member_name}</p>
                              </div>
                              <div>
                                <Label>Phase</Label>
                                <p className="text-sm">Phase {selectedPayment.phase_number}</p>
                              </div>
                              {/* <div>
                                <Label>Amount Paid</Label>
                                <p className="text-sm">KSH {selectedPayment.amount.toLocaleString()}</p>
                              </div> */}
                              <div>
                                <Label>Expected Amount</Label>
                                <p className="text-sm">KSH {selectedPayment.expected_amount.toLocaleString()}</p>
                              </div>
                            </div>

                            <div>
                              <Label>M-Pesa Code</Label>
                              <Textarea 
                                value={selectedPayment.mpesa_code || "No M-Pesa code provided"}
                                readOnly
                                className="mt-2 min-h-[100px]"
                              />
                            </div>

                            <div className="flex flex-col sm:flex-row gap-2">
                              <Button 
                                onClick={() => handlePaymentAction(
                                  selectedPayment.member_id,
                                  selectedPayment.phase_number,
                                  "approve",
                                )}
                                className="flex-1"
                              >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Approve Payment
                              </Button>
                              <Button 
                                variant="destructive"
                                onClick={() => handlePaymentAction(
                                  selectedPayment.member_id,
                                  selectedPayment.phase_number,
                                  "reject",
                                )}
                                className="flex-1"
                              >
                                <XCircle className="w-4 h-4 mr-2" />
                                Reject Payment
                              </Button>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </CardContent>
  </Card>
</TabsContent>


          <TabsContent value="stats" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <Card>
                <CardContent className="p-6">
                  
                  <div className="flex items-center">
                    <Users className="h-8 w-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-muted-foreground">Total Members</p>
                      <p className="text-2xl font-bold">{members.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <DollarSign className="h-8 w-8 text-green-200" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-muted-foreground">Total Expected</p>
                      <p className="text-2xl font-bold">
                        KSH {members.reduce((sum, member) => sum + member.total_paid, 0).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <DollarSign className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-muted-foreground">Total Paid</p>
                      <p className="text-2xl font-bold">
                        KSH {totalPaid.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-muted-foreground">Completed</p>
                      <p className="text-2xl font-bold">
                        {completedMembersCount}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Clock className="h-8 w-8 text-yellow-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-muted-foreground">Pending</p>
                      <p className="text-2xl font-bold">{pendingPayments.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
};

export default AdminPage;