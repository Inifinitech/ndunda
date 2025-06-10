import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertCircle, CreditCard, Search } from "lucide-react";
import toast from "react-hot-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface InstallmentTrackerProps {
  phoneNumber: string;
}

interface PaymentPhase {
  phase: number;
  amount: number;
  description: string;
  paid: boolean;
}

const InstallmentTracker = ({ phoneNumber }: InstallmentTrackerProps) => {
  const [mpesaCode, setMpesaCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lookupData, setLookupData] = useState({ name: "", phone: "" });
  const [isLookupOpen, setIsLookupOpen] = useState(false);
  const [hasLookedUp, setHasLookedUp] = useState(false);
  
  // Mock payment phases - in real app, this would come from your backend
  const [paymentPhases, setPaymentPhases] = useState<PaymentPhase[]>([
    { phase: 1, amount: 500, description: "Initial Deposit", paid: true },
    { phase: 2, amount: 500, description: "First Installment", paid: false },
    { phase: 3, amount: 500, description: "Second Installment", paid: false },
    { phase: 4, amount: 700, description: "Final Payment", paid: false },
  ]);

  const currentPhase = paymentPhases.find(phase => !phase.paid);
  const totalPaid = paymentPhases.filter(phase => phase.paid).reduce((sum, phase) => sum + phase.amount, 0);
  const totalAmount = 2200;
  const remainingAmount = totalAmount - totalPaid;

  const handleLookupSubmit = () => {
    if (!lookupData.name.trim() || !lookupData.phone.trim()) {
      toast.error("Please enter both name and phone number")
      return;
    }

    setIsLoading(true);
    
    // Simulate fetching user data from backend
    setTimeout(() => {
      // Mock response - in real app, this would fetch actual user data
      setHasLookedUp(true);
      setIsLookupOpen(false);
      
      toast.success(`Found payment record for ${lookupData.name}. Remaining balance: KSH ${remainingAmount.toLocaleString()}`)
      
      setIsLoading(false);
    }, 2000);
  };

  const handleInstallmentPayment = () => {
    if (!mpesaCode.trim()) {
      toast.error("Please enter your M-Pesa confirmation code")
      return;
    }

    setIsLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      if (currentPhase) {
        setPaymentPhases(prev => 
          prev.map(phase => 
            phase.phase === currentPhase.phase 
              ? { ...phase, paid: true }
              : phase
          )
        );
        
        toast.error(`Phase ${currentPhase.phase} payment of KSH ${currentPhase.amount} has been processed successfully.`)
        
        setMpesaCode("");
      }
      setIsLoading(false);
    }, 2000);
  };

  // Show lookup button if no phone number provided and no lookup done
  if (!phoneNumber && !hasLookedUp) {
    return (
      <Card className="shadow-xl border-0 bg-white/50 to-muted/10">
        <CardContent className="p-8 text-center">
          <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Payment Status Lookup</h3>
          <p className="text-muted-foreground mb-6">
            Enter your phone number in the registration tab or lookup your existing payment status
          </p>
          
          <Dialog open={isLookupOpen} onOpenChange={setIsLookupOpen}>
            <DialogTrigger asChild>
              <Button className="h-12 px-8 text-lg bg-gradient-to-r from-purple-600 to-blue-600 font-semibold">
                <Search className="w-5 h-5 mr-2" />
                Already Paid Deposit
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-center">Payment Status Lookup</DialogTitle>
              </DialogHeader>
              <div className="space-y-6 pt-4">
                <div className="space-y-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
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
                  className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600"
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

  return (
    <div className="space-y-6">
      {/* Show user info if looked up */}
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
          </CardContent>
        </Card>
      )}

      {/* Payment Progress Overview */}
      <Card className="shadow-xl border-0 bg-gradient-to-br from-primary/10 to-primary/5">
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
                style={{ width: `${(totalPaid / totalAmount) * 100}%` }}
              ></div>
            </div>
            <p className="text-muted-foreground">
              Remaining: <span className="font-semibold text-foreground">KSH {remainingAmount.toLocaleString()}</span>
            </p>
          </div>

          {/* Payment Phases */}
          <div className="space-y-3">
            {paymentPhases.map((phase) => (
              <div key={phase.phase} className="flex items-center justify-between p-4 rounded-lg border bg-card">
                <div className="flex items-center gap-3">
                  {phase.paid ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : phase.phase === currentPhase?.phase ? (
                    <Clock className="w-5 h-5 text-primary" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30"></div>
                  )}
                  <div>
                    <p className="font-medium">Phase {phase.phase}: {phase.description}</p>
                    <p className="text-sm text-muted-foreground">KSH {phase.amount.toLocaleString()}</p>
                  </div>
                </div>
                <Badge variant={phase.paid ? "default" : phase.phase === currentPhase?.phase ? "secondary" : "outline"}>
                  {phase.paid ? "Paid" : phase.phase === currentPhase?.phase ? "Current" : "Pending"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current Payment Due */}
      {currentPhase && (
        <Card className="shadow-xl border-0 bg-gradient-to-br from-card to-card/90">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-bold text-card-foreground">
              Next Payment Due
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center p-6 bg-primary/10 rounded-xl border border-primary/20">
              <h3 className="text-2xl font-bold text-primary mb-2">
                Phase {currentPhase.phase}: {currentPhase.description}
              </h3>
              <div className="text-4xl font-bold text-foreground mb-2">
                KSH {currentPhase.amount.toLocaleString()}
              </div>
              <p className="text-muted-foreground">Amount due for this installment</p>
            </div>

            <div className="text-center p-4 bg-muted/20 rounded-lg">
              <h4 className="font-bold text-lg mb-2 text-foreground">Pay via M-Pesa</h4>
              <div className="text-2xl font-bold bg-green-600 bg-clip-text text-transparent mb-2">4941686</div>
              <p className="text-sm text-muted-foreground">Till Number</p>
            </div>

            <div className="space-y-4">
              <Label htmlFor="installmentMpesa" className="text-base font-medium">
                M-Pesa Confirmation Code
              </Label>
              <Input
                id="installmentMpesa"
                placeholder="Enter M-Pesa confirmation code..."
                value={mpesaCode}
                onChange={(e) => setMpesaCode(e.target.value)}
                className="h-12 text-base"
              />
            </div>

            <Button 
              onClick={handleInstallmentPayment}
              disabled={isLoading || !mpesaCode.trim()}
              className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600"
            >
              {isLoading ? "Processing..." : `Pay KSH ${currentPhase.amount.toLocaleString()}`}
            </Button>

            <div className="p-4 bg-muted/30 rounded-lg">
              <h5 className="font-semibold mb-2 text-sm">Payment Instructions:</h5>
              <ol className="text-xs text-muted-foreground space-y-1">
                <li>1. Go to M-Pesa on your phone</li>
                <li>2. Select &ldquo;Lipa na M-Pesa&rdquo;</li>
                <li>3. Select &ldquo;Buy Goods and Services&rdquo;</li>
                <li>4. Enter Till Number: <strong>4641686</strong></li>
                <li>5. Enter amount: <strong>KSH {currentPhase.amount}</strong></li>
                <li>6. Complete payment and enter confirmation code above</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Payment Complete */}
      {!currentPhase && (
        <Card className="shadow-xl border-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
          <CardContent className="p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-green-800 dark:text-green-200 mb-2">
              Payment Complete! 🎉
            </h3>
            <p className="text-green-700 dark:text-green-300">
              You have successfully completed all payments for the Camp Ndunda Falls retreat.
              We&lsquo;ll send you final details closer to the event date.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default InstallmentTracker;
