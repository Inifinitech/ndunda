import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Calendar, Phone, Mail, ArrowLeft } from "lucide-react";

interface RegistrationConfirmationProps {
  onBackToForm: () => void;
}

const RegistrationConfirmation = ({ onBackToForm }: RegistrationConfirmationProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        <CardContent className="p-0">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8 text-center rounded-t-lg">
            <CheckCircle className="w-20 h-20 mx-auto mb-4 text-green-300" />
            <h1 className="text-4xl font-bold mb-2">Registration Received!</h1>
            <p className="text-xl text-purple-100">
              Thank you for joining Camp Ndunda Falls Youth Retreat 2025
            </p>
          </div>

          {/* Content Section */}
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                What Happens Next?
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Your registration is being processed by our team. We&lsquo;ll review your submission 
                and get back to you within 24-48 hours with confirmation and next steps.
              </p>
            </div>

            {/* Steps Timeline */}
            <div className="space-y-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="bg-green-500 text-white rounded-full p-2 flex-shrink-0">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Registration Submitted</h3>
                  <p className="text-slate-600">Your form and payment confirmation have been received</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-500 text-white rounded-full p-2 flex-shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Payment Verification</h3>
                  <p className="text-slate-600">We&lsquo;ll verify your M-Pesa payment within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-purple-500 text-white rounded-full p-2 flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Confirmation & Details</h3>
                  <p className="text-slate-600">You&lsquo;ll receive retreat details, packing list, and final instructions</p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-4 text-center">
                Need Help or Have Questions?
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center justify-center space-x-3 bg-white rounded-lg p-4 shadow-sm">
                  <Phone className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold text-slate-700">+254 705590618</span>
                </div>
                <div className="flex items-center justify-center space-x-3 bg-white rounded-lg p-4 shadow-sm">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-slate-700">vaultministerial@gmail.com</span>
                </div>
              </div>
            </div>

            {/* Important Notes */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
              <h4 className="font-semibold text-yellow-800 mb-2">Important Notes:</h4>
              <ul className="text-yellow-700 space-y-1 text-sm">
                <li>• Keep your phone available - we may call to confirm details</li>
                <li>• Check your messages regularly for updates</li>
                <li>• If you don&lsquo;t hear from us within 48 hours, please contact us</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={onBackToForm}
                variant="outline"
                className="flex items-center space-x-2 border-2 border-purple-200 hover:border-purple-400 text-purple-700 hover:text-purple-800"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Register Another Person</span>
              </Button>
              
              <Button 
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => window.location.reload()}
              >
                Back to Homepage
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistrationConfirmation;
