"use client"

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Calendar, Users, Heart, Star, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Galla from "@/components/galla";

const Index = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    mpesaMessage: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.mpesaMessage) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields including your M-Pesa confirmation message.",
        variant: "destructive"
      });
      return;
    }

    console.log("Registration submitted:", formData);
    
    setIsSubmitted(true);
    toast({
      title: "Registration Successful!",
      description: "Thank you for registering. We'll contact you soon with more details.",
    });
  };

  const scrollToRegistration = () => {
    document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-cyan-100 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardContent className="pt-8 pb-8">
            <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-slate-800 mb-4">You're In! 🎉</h2>
            <p className="text-slate-600 mb-8 text-lg leading-relaxed">
              Your spot is secured! Get ready for an amazing time of worship, fellowship, and fun at Camp Ndunda Falls.
            </p>
            <Button 
              onClick={() => setIsSubmitted(false)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Register Another Person
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-cyan-100">
      {/* Hero Section */}
     {/* Hero Section */}
<section
  className="relative min-h-screen flex items-center justify-center text-center px-4 overflow-hidden bg-cover bg-center"
  style={{ backgroundImage: `url('https://res.cloudinary.com/donshmlbl/image/upload/v1748712390/Vault_Funky_corrected_dhhmjc.png')` }} // Replace with your actual image path
>
  {/* Overlay */}
  <div className="absolute inset-0 backdrop-blur-sm z-0"></div>

  {/* Floating decorative elements */}
  <div className="absolute top-20 left-10 text-yellow-400 animate-pulse z-10">
    <Star className="w-8 h-8" />
  </div>
  <div className="absolute top-40 right-20 text-pink-400 animate-bounce z-10">
    <Heart className="w-6 h-6" />
  </div>
  <div className="absolute bottom-32 left-20 text-blue-400 animate-pulse z-10">
    <Star className="w-6 h-6" />
  </div>

  <div className="relative z-10 max-w-6xl mx-auto">
    <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6 leading-tight">
      Camp Ndunda Falls
    </h1>
    <h2 className="text-3xl md:text-5xl text-white drop-shadow font-bold mb-4">
      Vault Retreat 2025
    </h2>

    <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed font-medium drop-shadow">
      Join us for an incredible weekend of adventure, fellowship and spiritual growth 
      in God's beautiful creation. Where young hearts meet Jesus and friendships are born!
    </p>

    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12 text-lg">
      <div className="flex items-center text-white bg-black/40 px-6 py-3 rounded-full shadow-lg backdrop-blur-sm">
        <MapPin className="w-5 h-5 mr-3 text-purple-200" />
        <span className="font-semibold">Embu County, Kenya</span>
      </div>
      <div className="flex items-center text-white bg-black/40 px-6 py-3 rounded-full shadow-lg backdrop-blur-sm">
        <Calendar className="w-5 h-5 mr-3 text-blue-200" />
        <span className="font-semibold">Dates: 17/8/2025</span>
      </div>
      <div className="flex items-center text-white bg-black/40 px-6 py-3 rounded-full shadow-lg backdrop-blur-sm">
        <Users className="w-5 h-5 mr-3 text-cyan-200" />
        <span className="font-semibold">Limited Spots Available</span>
      </div>
    </div>

    <Button 
      onClick={scrollToRegistration}
      size="lg" 
      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-12 py-6 mb-6 text-xl font-bold rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
    >
      Secure Your Spot Now!
    </Button>
  </div>
</section>

      {/* About Section
      <section className="py-20 px-4 bg-white/80">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
              Why You Don't Want to Miss This!
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              This isn't just another retreat - it's where faith comes alive, friendships are forged, 
              and memories are made that will last a lifetime!
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-purple-50 to-blue-50">
              <CardHeader className="pb-4">
                <div className="bg-gradient-to-br from-purple-500 to-blue-500 p-6 rounded-full w-20 h-20 mx-auto mb-4 shadow-lg">
                  <Cross className="w-8 h-8 text-white mx-auto" />
                </div>
                <CardTitle className="text-2xl text-slate-800 font-bold">Spiritual Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed text-lg">
                  Powerful worship sessions, inspiring messages, and quiet time with God in nature's cathedral. 
                  Come encounter Jesus in a fresh way!
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-blue-50 to-cyan-50">
              <CardHeader className="pb-4">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-6 rounded-full w-20 h-20 mx-auto mb-4 shadow-lg">
                  <Users className="w-8 h-8 text-white mx-auto" />
                </div>
                <CardTitle className="text-2xl text-slate-800 font-bold">Amazing Fellowship</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed text-lg">
                  Connect with fellow young believers, share your journey, and build friendships 
                  that will encourage you long after the retreat ends.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-cyan-50 to-green-50">
              <CardHeader className="pb-4">
                <div className="bg-gradient-to-br from-cyan-500 to-green-500 p-6 rounded-full w-20 h-20 mx-auto mb-4 shadow-lg">
                  <Heart className="w-8 h-8 text-white mx-auto" />
                </div>
                <CardTitle className="text-2xl text-slate-800 font-bold">Fun & Adventure</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed text-lg">
                  From hiking to the falls to team games and campfires under the stars. 
                  Experience God's joy through laughter and adventure!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section> */}

      {/* Media Gallery Section */}
      <Galla />

      {/* Registration Section */}
      <section id="registration" className="py-20 px-4 bg-gradient-to-br from-purple-100 to-blue-100">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
              Ready to Join Us?
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed">
              Don't miss out on this life-changing experience! 
              Register now with your M-Pesa payment confirmation.
            </p>
          </div>
          
          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader className="text-center pb-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-t-lg">
              <CardTitle className="text-3xl font-bold">Registration Form</CardTitle>
              <CardDescription className="text-lg text-purple-100">
                Fill out the form below to secure your spot
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-lg font-semibold text-slate-700">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="h-14 text-lg border-2 border-purple-200 focus:border-purple-500 focus:ring-purple-500 rounded-xl"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-lg font-semibold text-slate-700">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="e.g., +254 700 000 000"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="h-14 text-lg border-2 border-purple-200 focus:border-purple-500 focus:ring-purple-500 rounded-xl"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="mpesaMessage" className="text-lg font-semibold text-slate-700">
                    M-Pesa Confirmation Message *
                  </Label>
                  <Textarea
                    id="mpesaMessage"
                    name="mpesaMessage"
                    placeholder="Paste your complete M-Pesa confirmation message here..."
                    value={formData.mpesaMessage}
                    onChange={handleInputChange}
                    className="min-h-[120px] text-lg border-2 border-purple-200 focus:border-purple-500 focus:ring-purple-500 resize-none rounded-xl"
                    required
                  />
                  <p className="text-purple-600 font-semibold text-center">
                    💳 Please paste your M-Pesa confirmation to complete registration
                  </p>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full h-16 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold text-xl rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Complete Registration
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-800 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl md:text-5xl font-bold mb-6">Have Questions?</h3>
          <p className="text-xl mb-8 text-purple-100 max-w-2xl mx-auto">
            We're here to help! Reach out if you need any information about the retreat, 
            payment, or what to bring.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <div className="flex items-center bg-white/20 backdrop-blur-sm px-6 py-4 rounded-full">
              <Phone className="w-6 h-6 mr-3 text-yellow-300" />
              <span className="text-lg font-semibold">+254 700 000 000</span>
            </div>
            <div className="flex items-center bg-white/20 backdrop-blur-sm px-6 py-4 rounded-full">
              <MapPin className="w-6 h-6 mr-3 text-yellow-300" />
              <span className="text-lg font-semibold">Camp Ndunda Falls, Embu</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
