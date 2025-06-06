"use client"

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Calendar, Users, Heart, Star, CheckCircle, CreditCard } from "lucide-react";
import toast from "react-hot-toast";
import Galla from "@/components/galla";

const Index = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    mpesaMessage: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

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
      toast.error("Please fill in all required fields including your M-Pesa confirmation message.")
      return;
    }

    console.log("Registration submitted:", formData);
    
    setIsSubmitted(true);
    toast.success("Registration Successful!")
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
            <h2 className="text-3xl font-bold text-slate-800 mb-4">You&rsquo;re In! 🎉</h2>
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
  className="relative min-h-screen flex items-center justify-center text-center px-4 overflow-hidden bg-cover bg-center animate-zoom"
  style={{ 
    backgroundImage: `url('https://res.cloudinary.com/donshmlbl/image/upload/v1748712390/Vault_Funky_corrected_dhhmjc.png')`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
    
     }} // Replace with your actual image path
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-black/60 z-0"></div>

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
    <div className="mb-24">
    <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6 leading-tight">
      Camp Ndunda Falls
    </h1>
    <h2 className="text-3xl md:text-5xl text-white drop-shadow font-bold mb-4">
      Vault Retreat 2025
    </h2>
    </div>
{/* 
    <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed font-medium drop-shadow">
      Join us for an incredible weekend of adventure, fellowship and spiritual growth 
      in God&rsquo;s beautiful creation. Where young hearts meet Jesus and friendships are born!
    </p> */}

    {/* <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12 text-lg">
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
    </div> */}

    <Button 
      onClick={scrollToRegistration}
      size="lg" 
      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-12 py-6 mb-6 text-xl font-bold rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
    >
      Secure Your Spot Now!
    </Button>
  </div>
</section>

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
              Don&rsquo;t miss out on this life-changing experience! 
              Register now with your M-Pesa payment confirmation.
            </p>
          </div>
          
          <div className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
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
                  <Label htmlFor="phone" className="text-lg font-semibold text-slate-700">
                    Emergency Phone * <span className="text-sm tracking-tighter text-gray-500">(parent/guardian)</span>
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
                    placeholder="Till: 4941686"
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
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
              Event Details
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Everything you need to know to prepare for an unforgettable retreat at Camp Ndunda Falls.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Event Info Cards */}
            <div className="space-y-6">
              <div className="flex items-center bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                <Calendar className="w-8 h-8 text-purple-600 mr-4" />
                <div>
                  <h3 className="text-xl font-semibold text-slate-800">Date</h3>
                  <p className="text-slate-600">August 17, 2025</p>
                </div>
              </div>
              <div className="flex items-center bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                <MapPin className="w-8 h-8 text-purple-600 mr-4" />
                <div>
                  <h3 className="text-xl font-semibold text-slate-800">Location</h3>
                  <p className="text-slate-600">Camp Ndunda Falls, Embu County, Kenya</p>
                </div>
              </div>
              <div className="flex items-center bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                <CreditCard className="w-8 h-8 text-purple-600 mr-4" />
                <div>
                  <h3 className="text-xl font-semibold text-slate-800">Payment Methods</h3>
                  <p className="text-slate-600">M-Pesa Till: <span className="tracking-wider text-green-700 text-xl font-semibold">4941686</span></p>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="bg-white/30 backdrop-blur-sm rounded-xl shadow-lg p-2">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Pickup Location</h3>
              <div className="relative w-full h-96 rounded-lg overflow-hidden">
                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d73548.53294710068!2d36.6407831!3d-1.1075085!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f27bc1a7cb8cf%3A0xfb635419c9916829!2sLife%20Church%20International%20-%20Limuru%2C!5e1!3m2!1sen!2ske!4v1749232169690!5m2!1sen!2ske" width="600" height="450" style={{ border:0 }} allowFullScreen loading="lazy" title="Camp Ndunda Falls Pickup Location"></iframe>
              </div>
              <p className="text-slate-600 mt-4 text-center">
                Pickup point: LCI, Old Sanctuary - Limuru Town
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Contact Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-800 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl md:text-5xl font-bold mb-6">Have Questions?</h3>
          <p className="text-xl mb-8 text-purple-100 max-w-2xl mx-auto">
            We&rsquo;re here to help! Reach out if you need any information about the retreat, 
            payment, or what to bring.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <div className="flex items-center bg-white/20 backdrop-blur-sm px-6 py-4 rounded-full">
              <Phone className="w-6 h-6 mr-3 text-yellow-300" />
              <span className="text-lg font-semibold">+254 705590618</span>
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