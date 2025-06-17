"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Calendar, Phone, Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";

const RegistrationConfirmation = () => {
  const router = useRouter();

  useEffect(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

    const interval: NodeJS.Timeout = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      confetti({
        ...defaults,
        particleCount: 20,
        origin: { x: Math.random(), y: Math.random() * 0.5 },
      });

      confetti({
        ...defaults,
        particleCount: 20,
        origin: { x: Math.random(), y: 1 - Math.random() * 0.5 },
      });

      confetti({
        ...defaults,
        particleCount: 10,
        origin: { x: 0, y: Math.random() },
      });

      confetti({
        ...defaults,
        particleCount: 10,
        origin: { x: 1, y: Math.random() },
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const handleBackToForm = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full animate-pulse opacity-10 bg-[url('/sparkles.svg')] bg-repeat"></div>
      </div>

      <Card className="max-w-2xl w-full shadow-2xl border-0 bg-white/95 backdrop-blur-sm relative z-10">
        <CardContent className="p-0">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8 text-center rounded-t-lg">
            <CheckCircle className="w-20 h-20 mx-auto mb-4 text-green-300 animate-bounce" />
            <h1 className="text-4xl font-bold mb-2 animate-fade-in-up">
              🎉 Registration Received!
            </h1>
            <p className="text-xl text-purple-100">
              Thank you for joining Camp Ndunda Falls Vault Retreat 2025
            </p>
          </div>

          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                What Happens Next?
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Your registration is being processed by our team. We’ll review your submission 
                and get back to you within 24–48 hours with confirmation and next steps.
              </p>
            </div>

            <div className="space-y-6 mb-8">
              {[
                {
                  icon: <CheckCircle className="w-5 h-5" />,
                  color: "bg-green-500",
                  title: "Registration Submitted",
                  desc: "Your form and payment confirmation have been received",
                },
                {
                  icon: <Calendar className="w-5 h-5" />,
                  color: "bg-blue-500",
                  title: "Payment Verification",
                  desc: "We’ll verify your M-Pesa payment within 24 hours",
                },
              ].map((step, idx) => (
                <div className="flex items-start space-x-4" key={idx}>
                  <div className={`${step.color} text-white rounded-full p-2 flex-shrink-0`}>
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">{step.title}</h3>
                    <p className="text-slate-600">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-2 md:p-4 mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-4 text-center">
                Need Help or Have Questions?
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center justify-center space-x-3 bg-white rounded-lg p-4 shadow-sm">
                  <Phone className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold text-slate-700">+254 705 590 618</span>
                </div>
                <div className="flex items-center justify-center space-x-3 bg-white rounded-lg p-4 shadow-sm">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-slate-700 text-sm">vaultministerial@gmail.com</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
              <h4 className="font-semibold text-yellow-800 mb-2">Important Notes:</h4>
              <ul className="text-yellow-700 space-y-1 text-sm">
                <li>• Keep your phone available - we may call to confirm details</li>
                <li>• Check your messages regularly for updates</li>
                <li>• If you don’t hear from us within 48 hours, please contact us</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleBackToForm}
                variant="outline"
                className="flex items-center space-x-2 border-2 border-purple-200 hover:border-purple-400 text-purple-700 hover:text-purple-800"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Register Another Person</span>
              </Button>

              <Link href="/">
                <Button
                  className="flex bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Back to Homepage
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistrationConfirmation;