"use client"

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertCircle, CreditCard, Search, Copy, Clock as ClockIcon, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface InstallmentTrackerProps {
  phoneNumber?: string;
  fullName?: string;
}

interface PaymentPhase {
  phase_number: number;
  amount: string;
  description: string;
  paid: boolean;
  mpesa_code: string | null;
  status: string;
}

interface MemberData {
  id: string;
  full_name: string;
  phone: string;
  location: string;
  e_contact_name: string;
  e_contact_phone: string;
  payment_plan: string;
  total_amount: string;
  phases: PaymentPhase[];
  created_at: string;
  updated_at: string;
  total_paid: number;
}

const api = process.env.NEXT_PUBLIC_BACKEND_URLA

const InstallmentTracker = ({ phoneNumber, fullName }: InstallmentTrackerProps) => {
  const [mpesaCode, setMpesaCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lookupData, setLookupData] = useState({ name: fullName || "", phone: phoneNumber || "" });
  const [isLookupOpen, setIsLookupOpen] = useState(false);
  const [hasLookedUp, setHasLookedUp] = useState(false);
  const [memberData, setMemberData] = useState<MemberData | null>(null);
  const [copied, setCopied] = useState(false);

  const tillNumber = '4941686';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(tillNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error("Failed to copy", error);
    }
  };

  const fetchMemberData = async (phone: string, name: string, showToast: boolean = true) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${api}retreatreg?phoneNumber=${encodeURIComponent(phone)}&fullName=${encodeURIComponent(name)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch payment record");
      }

      const data: MemberData = await response.json();
      // console.log("Fetched member data:", JSON.stringify(data, null, 2));
      setMemberData(data);
      setHasLookedUp(true);
      setLookupData({ name: data.full_name, phone: data.phone });
      if (showToast) {
        toast.success(`Found payment record for ${data.full_name}. Remaining balance: KSH ${(parseFloat(data.total_amount) - data.total_paid).toLocaleString()}`);
      }
    } catch (error: unknown) {
      console.error("Error fetching member data:", error);
      const message = error instanceof Error ? error.message : String(error)
      toast.error(message || "Failed to fetch payment record");
    } finally {
      setIsLoading(false);
    }
  };

  // Find the first unpaid phase, ignoring invalid PENDING statuses
  const currentPhase = memberData?.phases.find((phase, index) => {
    if (phase.paid) return false;
    // Treat PENDING with null mpesa_code as unpaid
    if (phase.status === "PENDING" && !phase.mpesa_code) return true;
    const previousPhases = memberData.phases.slice(0, index);
    return previousPhases.every(prevPhase => !(prevPhase.status === "PENDING" && prevPhase.mpesa_code));
  });

  // Block payment if any phase up to currentPhase is PENDING with a valid mpesa_code
  const isPaymentBlocked = memberData?.phases.some(
    phase => phase.status === "PENDING" && phase.mpesa_code && phase.phase_number <= (currentPhase?.phase_number || Infinity)
  ) || false;

  // Check if all payments are complete
  const isPaymentComplete = memberData?.phases && memberData.phases.length > 0 ? memberData.phases.every(
    phase => phase.status === "CONFIRMED" && phase.paid) : false;

  const totalPaid = memberData?.total_paid || 0;
  const totalAmount = parseFloat(memberData?.total_amount || "0") || 2200;
  const remainingAmount = totalAmount - totalPaid;

  // Debug phase status
  // useEffect(() => {
  //   if (memberData?.phases) {
  //     console.log("Phases:", JSON.stringify(memberData.phases, null, 2));
  //     console.log("isPaymentComplete:", isPaymentComplete);
  //     console.log("currentPhase:", JSON.stringify(currentPhase, null, 2));
  //     console.log("isPaymentBlocked:", isPaymentBlocked);
  //   }
  // }, [memberData, isPaymentComplete, currentPhase, isPaymentBlocked]);

  useEffect(() => {
    if (phoneNumber && fullName && !hasLookedUp) {
      fetchMemberData(phoneNumber, fullName);
    }
  }, [phoneNumber, fullName, hasLookedUp]);

  const handleLookupSubmit = async () => {
    if (!lookupData.name.trim() || !lookupData.phone) {
      toast.error("Please enter both name and phone number");
      return;
    }
    await fetchMemberData(lookupData.phone, lookupData.name);
    setIsLookupOpen(false);
  };

  const handleRefresh = async () => {
    if (lookupData?.phone && lookupData?.name) {
      await fetchMemberData(lookupData.phone, lookupData.name, false);
      toast.success("Payment status refreshed");
    }
  };

  const handleInstallmentPayment = async () => {
    if (!mpesaCode.trim()) {
      toast.error("Please enter your M-Pesa confirmation code");
      return;
    }

    if (!memberData || !currentPhase) {
      toast.error("No current phase to pay");
      return;
    }

    setIsLoading(true);

    try {
      // Optimistically update phase status to PENDING
      setMemberData(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          phases: prev.phases.map(phase =>
            phase.phase_number === currentPhase.phase_number
              ? { ...phase, status: "PENDING", mpesa_code: mpesaCode }
              : phase
          ),
        };
      });

      const payload = {
        phone: memberData.phone,
        mpesa_code: mpesaCode,
        phase_number: currentPhase.phase_number,
        amount: parseFloat(currentPhase.amount),
      };
      // console.log("Sending payment payload:", JSON.stringify(payload, null, 2));

      const response = await fetch(`${api}payments/process`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        // Revert optimistic update
        setMemberData(prev => {
          if (!prev) return prev;
          return {
            ...prev,
            phases: prev.phases.map(phase =>
              phase.phase_number === currentPhase.phase_number
                ? { ...phase, status: phase.status === "PENDING" && phase.mpesa_code === mpesaCode ? "" : phase.status, mpesa_code: phase.mpesa_code === mpesaCode ? null : phase.mpesa_code }
                : phase
            ),
          };
        });
        throw new Error(errorData.error || "Failed to process payment");
      }

      const data: { message: unknown; record: MemberData } = await response.json();
      // console.log("Payment response:", JSON.stringify(data, null, 2));
      setMemberData(data.record);
      toast.success(`Phase ${currentPhase.phase_number} payment of KSH ${parseFloat(currentPhase.amount).toLocaleString()} submitted, awaiting approval.`);
      setMpesaCode("");
    } catch (error: unknown) {
      console.error("Error processing payment:", error);
      const message = error instanceof Error ? error.message : String(error)
      toast.error(message || "Failed to process payment");
    } finally {
      setIsLoading(false);
    }
  };

  if (!phoneNumber && !hasLookedUp) {
    return (
      <Card className="shadow-xl border-0 bg-white/50">
        <CardContent className="p-8 text-center">
          <AlertCircle className="w-20 h-20 text-muted-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Installment Status Lookup</h3>
          <p className="text-muted-500 mb-6">
            Enter your phone number in the registration tab or lookup your existing payment status
          </p>
          
          <Dialog open={isLookupOpen} onOpenChange={setIsLookupOpen}>
            <DialogTrigger asChild>
              <Button className="h-12 px-8 text-lg bg-gradient-to-r from-blue-600 to-purple-600 font-semibold">
                <Search className="w-5 h-5 mr-2" />
                Already Paid Deposit
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-center">Fees Status Lookup</DialogTitle>
              </DialogHeader>
              <div className="space-y-6 pt-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="lookupName" className="text-base font-medium">Full Name</Label>
                    <Input
                      id="lookupName"
                      placeholder="Enter your full name"
                      value={lookupData.name}
                      onChange={(e) => setLookupData(prev => ({ ...prev, name: e.target.value }))}
                      className="h-12 text-base"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="lookupPhone" className="text-base font-medium">Phone Number</Label>
                    <Input
                      id="lookupPhone"
                      placeholder="07XX XXX XXX"
                      value={lookupData.phone}
                      onChange={(e) => setLookupData(prev => ({ ...prev, phone: e.target.value }))}
                      className="h-12 text-base"
                    />
                  </div>
                </div>
                
                <Button 
                  onClick={handleLookupSubmit}
                  disabled={isLoading}
                  className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600"
                >
                  {isLoading ? "Looking up..." : "Get Payment Status"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    );
  }

  if (!memberData) {
    return (
      <Card className="shadow-xl border-0 bg-white/50">
        <CardContent className="p-8 text-center">
          <AlertCircle className="w-20 h-20 text-muted-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-4">Loading Payment Data</h3>
          <p className="text-muted-500">Please wait while we fetch your payment details...</p>
        </CardContent>
      </Card>
    );
  }

  // Handle empty phases
  if (!memberData.phases.length) {
    return (
      <Card className="shadow-xl border-0 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900">
        <CardContent className="p-8 text-center">
          <AlertCircle className="w-20 h-20 text-red-500 mx-auto mb-3" />
          <h4 className="text-xl font-bold text-red-800 dark:text-red-200 mb-2">
            Payment Setup Error
          </h4>
          <p className="text-red-700 dark:text-red-300 mb-4">
            No payment phases found for your plan. Please contact support to set up your payment plan.
          </p>
          <Button
            onClick={handleRefresh}
            variant="outline"
            className="h-12 px-6 text-base font-semibold"
            disabled={isLoading}
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Determine error reason for no current phase
  let errorReason = "";
  if (!isPaymentComplete && !currentPhase) {
    const allPaid = memberData.phases.every(phase => phase.paid);
    const allPending = memberData.phases.some(phase => phase.status === "PENDING" && phase.mpesa_code);
    if (allPaid) {
      errorReason = "All phases are marked as paid, but not all are confirmed.";
    } else if (allPending) {
      errorReason = "One or more phases are pending approval, blocking further payments.";
    } else {
      errorReason = "Invalid phase configuration detected.";
    }
  }

  return (
    <div className="space-y-6">
      {hasLookedUp && (
        <Card className="shadow-xl border-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <h3 className="font-semibold text-green-800 dark:text-green-200">Payment Record Found</h3>
            </div>
            <p className="text-green-700 dark:text-green-300">
              <strong>Name:</strong> {lookupData.name} | <strong>Phone:</strong> {lookupData.phone}
            </p>
            <Button
              onClick={handleRefresh}
              variant="outline"
              className="mt-4 h-10 px-4 text-sm font-semibold"
              disabled={isLoading}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Status
            </Button>
          </CardContent>
        </Card>
      )}

      <Card className="shadow-xl border-0 bg-gradient-to-br from-primary/5 to-primary/10">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-card-foreground flex items-center justify-center gap-3">
            <CreditCard className="w-6 h-6 text-primary" />
            Payment Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">
              KSH {totalPaid.toLocaleString()} / {totalAmount.toLocaleString()}
            </div>
            <div className="w-full bg-muted rounded-full h-3 mb-4">
              <div 
                className="bg-primary h-3 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((totalPaid / totalAmount) * 100, 100)}%` }}
              />
            </div>
            <p className="text-muted-foreground">
              Remaining: <span className="font-semibold text-foreground">KSH {remainingAmount.toLocaleString()}</span>
            </p>
          </div>

          <div className="space-y-3">
            {memberData.phases.map((phase) => (
              <div key={phase.phase_number} className="flex items-center justify-between p-4 rounded-lg border bg-card">
                <div className="flex items-center gap-3">
                  {phase.status === "CONFIRMED" && phase.paid ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : phase.status === "PENDING" && phase.mpesa_code ? (
                    <Clock className="w-5 h-5 text-yellow-500" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30" />
                  )}
                  <div>
                    <p className="font-medium">Phase {phase.phase_number}: {phase.description}</p>
                    <p className="text-sm text-muted-foreground">KSH {parseFloat(phase.amount).toLocaleString()}</p>
                  </div>
                </div>
                <Badge
                  variant={
                    phase.status === "CONFIRMED" && phase.paid
                    ? "default"
                    : phase.status === "PENDING" && phase.mpesa_code
                    ? "secondary"
                    : "outline"
                  }
                >
                  {phase.status === "CONFIRMED" && phase.paid
                    ? "Paid"
                    : phase.status === "PENDING" && phase.mpesa_code
                    ? "Pending"
                    : "Not Paid"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {isPaymentComplete ? (
        <Card className="shadow-xl border-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
          <CardContent className="p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h4 className="text-2xl font-bold text-green-800 dark:text-green-200 mb-4">
              Fully Paid! 🎉
            </h4>
            <p className="text-green-600 dark:text-green-300 mb-4">
              You have successfully completed all payments for the Camp Ndi Falls Retreat.
              We’ll send you final details closer to the event date.
            </p>
          </CardContent>
        </Card>
      ) : currentPhase ? (
        <>
          {isLoading ? (
            <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Processing...
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <LoadingSpinner />
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="text-center">
                <CardTitle className="text-xl font-bold text-gray-800">
                  Next Payment Due
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center p-6 bg-gradient-to-r from-blue-50/30 to-purple-50/30 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-bold text-blue-700 mb-2">
                    Phase {currentPhase.phase_number}: {currentPhase.description}
                  </h3>
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    KSH {parseFloat(currentPhase.amount).toLocaleString()}
                  </div>
                  <p className="text-sm text-gray-500">Amount due for this installment</p>
                </div>

                <div className="flex justify-center items-center">
                  <div className="text-center p-6 bg-green-100 dark:bg-green-50/30 rounded-lg border border-gray-200">
                    <h4 className="font-bold text-lg mb-2 text-gray-700">Pay via M-Pesa</h4>
                    <div className="flex justify-center items-center gap-4 text-2xl font-bold text-green-600 mb-2">
                      {tillNumber}
                      <button
                        type="button"
                        onClick={handleCopy}
                        className="text-gray-700 hover:text-green-600 transition-colors duration-200"
                        aria-label="Copy till number"
                      >
                        <span className="inline-flex items-center justify-center transition-transform duration-200 hover:scale-110">
                          {copied ? (
                            <CheckCircle className="w-6 h-6 text-green-600 animate-pulse" />
                          ) : (
                            <Copy className="w-5 h-5" />
                          )}
                        </span>
                      </button>
                    </div>
                    <p className="text-sm text-gray-500">
                      {copied ? "Copied!" : "Till Number"}
                    </p>
                  </div>
                </div>

                {isPaymentBlocked ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-center p-6 bg-gradient-to-r from-yellow-50 to-yellow-200 dark:from-yellow-900 dark:to-yellow-800 rounded-lg border border-yellow-200 dark:border-yellow-600"
                  >
                    <ClockIcon className="w-16 h-16 text-yellow-500 dark:text-yellow-400 mx-auto mb-4 animate-pulse" />
                    <h4 className="text-xl font-semibold text-yellow-800 dark:text-yellow-200 mb-3">
                      Your Previous Payment is Awaiting Approval
                    </h4>
                    <p className="text-yellow-600 dark:text-yellow-300">
                      Your payment is being reviewed by our team. Please wait until it’s approved to proceed!
                    </p>
                  </motion.div>
                ) : (
                  <>
                    <div className="space-y-4">
                      <Label htmlFor="installmentMpesa" className="text-base font-semibold">
                        M-Pesa Confirmation Code
                      </Label>
                      <Input
                        id="installmentMpesa"
                        placeholder="Enter M-Pesa code..."
                        value={mpesaCode}
                        onChange={(e) => setMpesaCode(e.target.value)}
                        className="h-12 h-12 text-base border-gray-300 focus:ring-blue-500"
                        
                      />
                    </div>

                    <Button 
                      onClick={handleInstallmentPayment}
                      disabled={isLoading || !mpesaCode.trim()}
                      className="w-full h-12 h-12 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600"
                    >
                      {isLoading ? "Processing..." : "Pay KSH " + parseFloat(currentPhase.amount).toLocaleString()}
                    </Button>

                    <div className="p-4 bg-gray-100 rounded-lg">
                      <h5 className="text-sm font-semibold text-gray-700 mb-2">Payment Instructions:</h5>
                      <ol className="text-xs text-gray-500 space-y-1">
                        <li>1. Go to M-Pesa on your phone</li>
                        <li>2. Select “Lipa na M-Pesa”</li>
                        <li>3. Select “Swipe to Pay”</li>
                        <li>4. Enter Till Number: <strong>{tillNumber}</strong></li>
                        <li>5. Enter amount: <strong>KSH {parseFloat(currentPhase.amount)}</strong></li>
                        <li>6. Complete payment and enter confirmation code above</li>
                      </ol>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          )}
        </>
      ) : (
        <Card className="shadow-xl border-0 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900 dark:to-red-200">
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-20 h-16 text-red-500 mx-auto mb-3" />
            <h4 className="text-xl font-bold text-red-800 dark:text-red-200 mb-3">
              Payment Status Error
            </h4>
            <p className="text-red-700 dark:text-red-400 mb-4">
              Unable to determine next payment: {errorReason}
              <br />
              Please try refreshing or contact support for assistance.
            </p>
            <Button
              onClick={handleRefresh}
              variant="outline"
              className="h-12 px-6 text-base font-semibold"
              disabled={isLoading}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

function LoadingSpinner () {
  return (
    <div className="relative flex items-center justify-center rounded-lg bg-gradient-to-r from-purple-600/20 to-blue-600/20 bg-opacity-75 z-40">
      <motion.div 
        className="relative w-24 h-24 flex items-center justify-center"
        animate={{
          rotate: [0, -15, 15, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.2,
          ease: "easeInOut"
        }}
      >

        <Image
          src="https://res.cloudinary.com/donshmlbl/image/upload/v1741962506/vault_offlogo_yvepfj.jpg"
          alt="Loading"
          width={32}
          height={32}
          className="z-10"
        />
        
        <div className="absolute w-14 h-14 border-4 border-purple-600/80 border-t-transparent border-b-transparent rounded-full animate-spin" />
      </motion.div>
    </div>
  )
}

export default InstallmentTracker;