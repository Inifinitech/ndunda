import { useState, FormEvent } from "react";
import Image from "next/image";
import { motion } from 'framer-motion'
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import toast from "react-hot-toast";
import { User, Phone, CreditCard, Calculator, Copy, CheckCircle } from "lucide-react";
import InstallmentTracker from "./installmentstracker";

// Define interface for form data
interface FormData {
  fullName: string;
  phoneNumber: string;
  location: string;
  emergencyContact: string;
  emergencyPhone: string;
  paymentPlan: string;
  mpesaMessage: string;
}

// Define interface for API response (simplified)
interface ApiResponse {
  message: string;
  record?: {
    id: number;
    name: string;
    phone: string;
    location: string;
    emergency_contact: string;
    emergency_phone: string;
    payment_plan: string;
    total_amount: number;
    total_paid: number;
    remaining_amount: number;
    phases: Array<{
      phase_number: number;
      description: string;
      amount: number;
      paid: boolean;
      mpesa_code: string | null;
      status: string;
      paid_at: string | null;
    }>;
  };
  error?: string;
}

const RegistrationForm: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"register" | "installments">("register");
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phoneNumber: "",
    location: "",
    emergencyContact: "",
    emergencyPhone: "",
    paymentPlan: "",
    mpesaMessage: ""
  });
  const tillNumber = "4941686"
  const [copied, setCopied] = useState(false)
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(tillNumber)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch (error) {
      console.error("Failed to copy", error)
    }
  }

  const api = process.env.NEXT_PUBLIC_BACKEND_URLA;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.phoneNumber || !formData.location || 
        !formData.emergencyContact || !formData.emergencyPhone || !formData.paymentPlan) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // Extract M-Pesa transaction code from message (e.g., "QJ1234567890 Confirmed...")
    const mpesaCodeMatch = formData.mpesaMessage.match(/^[A-Z0-9]{10}/);
    const mpesaCode = mpesaCodeMatch ? mpesaCodeMatch[0] : null;

    try {
      setLoading(true)
      const response = await fetch(`${api}retreatreg`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          phoneNumber: formData.phoneNumber,
          location: formData.location,
          emergencyContact: formData.emergencyContact,
          emergencyPhone: formData.emergencyPhone,
          paymentPlan: formData.paymentPlan,
          mpesaCode
        })
      });

      const data: ApiResponse = await response.json();
      if (!response.ok) {
         if (data.error?.includes("M-Pesa transaction code") && data.error?.includes("is already used")) {
          toast.error("This M-Pesa transaction code has already been used. Please use a different one.");
        } else {
          toast.error(data.error || "Registration failed. Please try again.");
        }
        throw new Error(data.error || "Registration failed");
      }

      router.push("/registrationsuccess")
      toast.success("Registration successful! 🎉");
      setActiveTab("installments"); 
      setFormData({
        fullName: "",
        phoneNumber: "",
        location: "",
        emergencyContact: "",
        emergencyPhone: "",
        paymentPlan: "",
        mpesaMessage: ""
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Registration failed. Please try again.");
    } finally {
      setLoading(false)
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6 text-center">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <section id="registration" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Join the
            <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text">Adventure</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Reserve your place for an unforgettable retreat experience at Kenya&lsquo;s most spectacular natural destination
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={(value: string) => setActiveTab(value as "register" | "installments")} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="register" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Registration
              </TabsTrigger>
              <TabsTrigger value="installments" className="flex items-center gap-2">
                <Calculator className="w-4 h-4" />
                Installments
              </TabsTrigger>
            </TabsList>

            <TabsContent value="register">
                {loading ? (
                  <Card>
                    <CardHeader className="text-center pb-8">
                      <CardTitle className="text-3xl font-bold flex bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent items-center justify-center gap-3">
                        <User className="w-8 h-8 text-primary" />
                        Registration Form
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="container mx-auto p-6 text-center rounded-lg">
                        <LoadingSpinner />
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Registration Form Fields */}
                  <Card className="shadow-2xl border-0">
                    <CardHeader className="text-center pb-8">
                      <CardTitle className="text-3xl font-bold flex bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent items-center justify-center gap-3">
                        <User className="w-8 h-8 text-primary" />
                        Registration Form
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Personal Information */}
                      <div className="space-y-6">
                        <h3 className="text-xl font-bold text-foreground border-b border-border pb-2">
                          Personal Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="fullName" className="text-base font-medium bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Full Name *</Label>
                            <Input
                              id="fullName"
                              placeholder="Enter your full name"
                              value={formData.fullName}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("fullName", e.target.value)}
                              className="h-12 text-base"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phoneNumber" className="text-base font-medium bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Phone Number *</Label>
                            <Input
                              id="phoneNumber"
                              placeholder="07XX XXX XXX"
                              value={formData.phoneNumber}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("phoneNumber", e.target.value)}
                              className="h-12 text-base"
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location" className="text-base font-medium bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Location *</Label>
                          <Input
                            id="location"
                            placeholder="Where do you live"
                            value={formData.location}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("location", e.target.value)}
                            className="h-12 text-base"
                            required
                          />
                        </div>
                      </div>

                      {/* Emergency Contact */}
                      <div className="space-y-6">
                        <h3 className="text-xl font-bold text-foreground border-b border-border pb-2 flex items-center gap-2">
                          <Phone className="w-5 h-5 text-primary" />
                          Emergency Contact
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="emergencyContact" className="text-base font-medium bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Emergency Contact Name *</Label>
                            <Input
                              id="emergencyContact"
                              placeholder="parent/guardian"
                              value={formData.emergencyContact}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("emergencyContact", e.target.value)}
                              className="h-12 text-base"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="emergencyPhone" className="text-base font-medium bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Emergency Phone Number *</Label>
                            <Input
                              id="emergencyPhone"
                              placeholder="07XX XXX XXX"
                              value={formData.emergencyPhone}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("emergencyPhone", e.target.value)}
                              className="h-12 text-base"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      {/* Payment Plan */}
                      <div className="space-y-6">
                        <h3 className="text-xl font-bold text-foreground border-b border-border pb-2 flex items-center gap-2">
                          <CreditCard className="w-5 h-5 text-primary" />
                          Choose Your Payment Plan
                        </h3>
                        <RadioGroup 
                          value={formData.paymentPlan} 
                          onValueChange={(value: string) => handleInputChange("paymentPlan", value)}
                          className="space-y-4"
                        >
                          <div className="flex items-center space-x-3 p-4 border-2 border-radius rounded-xl hover:border-primary/50 transition-colors">
                            <RadioGroupItem value="full" id="full" className="mt-1" />
                            <div className="flex-1">
                              <Label htmlFor="full" className="text-lg font-semibold cursor-pointer bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                Pay in Full - KSH 2,200
                              </Label>
                              <p className="text-sm text-muted-foreground mt-1">
                                Complete payment now and enjoy peace of mind
                              </p>
                            </div>
                            <div className="text-2xl font-bold text-primary">💰</div>
                          </div>
                          <div className="flex items-center space-x-3 p-4 border-2 border-radius rounded-xl hover:border-primary/50 transition-colors">
                              <RadioGroupItem value="installments" id="installments" className="mt-1" />
                            <div className="flex-1">
                              <Label htmlFor="installments" className="text-lg font-semibold cursor-pointer bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                Pay in Installments - Start with KSH 500
                              </Label>
                              <p className="text-sm text-muted-foreground mt-1">
                                Deposit: KSH 500 → Phase 2: KSH 500 → Phase 3: KSH 500 → Final: KSH 700
                              </p>
                            </div>
                            <div className="text-2xl font-bold text-primary">📅</div>
                          </div>
                        </RadioGroup>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Payment Information */}
                  <Card className="shadow-2xl border-0 bg-gradient-to-br from-primary/10 to-primary/5">
                    <CardHeader className="text-center">
                      <CardTitle className="text-2xl font-bold text-card-foreground flex items-center justify-center gap-3">
                        <Image src="https://res.cloudinary.com/donshmlbl/image/upload/v1749478295/mpesa-logo_figug6.png" alt="mpesa-logo" width={200} height={500}/>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="text-center p-6 bg-green-300/30 rounded-xl border border-primary/30">
                        <h4 className="font-bold text-lg mb-2 text-foreground">Pay via M-Pesa</h4>
                         <div className="flex justify-center items-center gap-2 text-3xl font-bold text-green-600 mb-2">
                            {tillNumber}
                            <button
                              type="button"
                              onClick={handleCopy}
                              className="text-green-800 hover:text-green-600 transition-colors duration-300"
                              aria-label="Copy till number"
                            >
                              <span className="inline-block transition-all duration-300 ease-in-out scale-100">
                                {copied ? (
                                  <CheckCircle className="w-5 h-5 text-green-600 animate-ping-once" />
                                ) : (
                                  <Copy className="w-5 h-5" />
                                )}
                              </span>
                            </button>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {copied ? "Copied!" : "Till Number"}
                          </p>
                      </div>
                      <div className="space-y-4">
                        <Label htmlFor="mpesaMessage" className="text-base font-medium">
                          Paste M-Pesa Transaction Code Here
                        </Label>
                        <Textarea
                          id="mpesaMessage"
                          placeholder="Paste your M-Pesa confirmation message here after payment..."
                          value={formData.mpesaMessage}
                          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange("mpesaMessage", e.target.value)}
                          className="min-h-[120px] text-sm bg-white"
                        />
                      </div>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <h5 className="font-semibold mb-2 text-sm">Payment Instructions:</h5>
                        <ol className="text-xs text-muted-foreground space-y-1">
                          <li>1. Go to M-Pesa on your phone</li>
                          <li>2. Select “Lipa na M-Pesa”</li>
                          <li>3. Select “Buy Goods and Services”</li>
                          <li>4. Enter Till Number: <strong>4941686</strong></li>
                          <li>5. Enter amount based on your plan</li>
                          <li>6. Copy and paste confirmation here</li>
                        </ol>
                      </div>
                      <Button 
                        type="submit" 
                        size="lg" 
                        className="w-full h-14 text-lg font-semibold rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:bg-primary/90 shadow-xl hover:shadow-2xl transition-all duration-300"
                      >
                        Secure My Spot
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </form>
                )}
            </TabsContent>

            <TabsContent value="installments">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">Installment Payment Tracker</h3>
                  <p className="text-muted-foreground">
                    Track your payment progress and make installment payments for your retreat registration
                  </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <InstallmentTracker phoneNumber={formData.phoneNumber} />
                  </div>
                  <div className="space-y-6">
                    <Card className="shadow-xl border-0 bg-gradient-to-br from-card to-card/80">
                      <CardHeader className="text-center">
                        <CardTitle className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Payment Plan</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4 text-sm">
                        <div className="space-y-3">
                          <div className="flex justify-between p-2 bg-muted/30 rounded">
                            <span>Initial Deposit:</span>
                            <span className="font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">KSH 500</span>
                          </div>
                          <div className="flex justify-between p-2 bg-muted/30 rounded">
                            <span>1st Installment:</span>
                            <span className="font-bold">KSH 500</span>
                          </div>
                          <div className="flex justify-between p-2 bg-muted/30 rounded">
                            <span>2nd Installment:</span>
                            <span className="font-bold">KSH 500</span>
                          </div>
                          <div className="flex justify-between p-2 bg-muted/30 rounded">
                            <span>Final Payment:</span>
                            <span className="font-bold">KSH 700</span>
                          </div>
                          <div className="border-t pt-2">
                            <div className="flex justify-between font-bold text-primary">
                              <span>Total:</span>
                              <span>KSH 2,200</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;

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
