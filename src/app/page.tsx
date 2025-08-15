// "use client"

// import { Heart, Star} from "lucide-react";
// import Galla from "@/components/galla";
// import RegistrationForm from "@/components/registrationform";
// import EventDetails from "@/components/eventdetails";
// import { Button } from "@/components/ui/button";
// import Footer from "@/components/footer";

// const Index = () => {
//   // const [formData, setFormData] = useState({
//   //   name: "",
//   //   phone: "",
//   //   e_phone: "",
//   //   mpesaMessage: ""
//   // });
//   // const [isSubmitted, setIsSubmitted] = useState(false);

//   // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//   //   const { name, value } = e.target;
//   //   setFormData(prev => ({
//   //     ...prev,
//   //     [name]: value
//   //   }));
//   // };

//   // const handleSubmit = (e: React.FormEvent) => {
//   //   e.preventDefault();
    
//   //   if (!formData.name || !formData.phone || !formData.mpesaMessage) {
//   //     toast.error("Please fill in all required fields including your M-Pesa confirmation message.")
//   //     return;
//   //   }

//   //   console.log("Registration submitted:", formData);
    
//   //   setIsSubmitted(true);
//   //   toast.success("Registration Successful!")
//   // };

//   const scrollToRegistration = () => {
//     document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' });
//   };

//   // if (isSubmitted) {
//   //   return (
//   //     <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-cyan-100 flex items-center justify-center p-4">
//   //       <Card className="max-w-md w-full text-center shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
//   //         <CardContent className="pt-8 pb-8">
//   //           <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
//   //           <h2 className="text-3xl font-bold text-slate-800 mb-4">You&rsquo;re In! 🎉</h2>
//   //           <p className="text-slate-600 mb-8 text-lg leading-relaxed">
//   //             Your spot is secured! Get ready for an amazing time of worship, fellowship, and fun at Camp Ndunda Falls.
//   //           </p>
//   //           <Button 
//   //             onClick={() => setIsSubmitted(false)}
//   //             className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
//   //           >
//   //             Register Another Person
//   //           </Button>
//   //         </CardContent>
//   //       </Card>
//   //     </div>
//   //   );
//   // }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-cyan-100">
//      {/* Hero Section */}
// <section
//   className="relative min-h-screen flex items-center justify-center text-center px-4 overflow-hidden bg-cover bg-center animate-zoom"
//   style={{ 
//     backgroundImage: `url('https://res.cloudinary.com/donshmlbl/image/upload/v1748712390/Vault_Funky_corrected_dhhmjc.png')`,
//     backgroundRepeat: "no-repeat",
//     backgroundPosition: "center"
    
//      }} // Replace with your actual image path
// >
//   {/* Overlay */}
//   <div className="absolute inset-0 bg-black/60 z-0"></div>

//   {/* Floating decorative elements */}
//   <div className="absolute top-20 left-10 text-yellow-400 animate-pulse z-10">
//     <Star className="w-8 h-8" />
//   </div>
//   <div className="absolute top-40 right-20 text-pink-400 animate-bounce z-10">
//     <Heart className="w-6 h-6" />
//   </div>
//   <div className="absolute bottom-32 left-20 text-blue-400 animate-pulse z-10">
//     <Star className="w-6 h-6" />
//   </div>

//   <div className="relative z-10 max-w-6xl mx-auto">
//     <div className="mb-24">
//     <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6 leading-tight">
//       Camp Ndunda Falls
//     </h1>
//     <h2 className="text-3xl md:text-5xl text-white drop-shadow font-bold mb-4">
//       Vault Retreat 2025
//     </h2>
//     </div>

//     {/* <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed font-medium drop-shadow">
//       Join us for an incredible weekend of adventure, fellowship and spiritual growth 
//       in God&rsquo;s beautiful creation. Where young hearts meet Jesus and friendships are born!
//     </p> 

//      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12 text-lg">
//       <div className="flex items-center text-white bg-black/40 px-6 py-3 rounded-full shadow-lg backdrop-blur-sm">
//         <MapPin className="w-5 h-5 mr-3 text-purple-200" />
//         <span className="font-semibold">Embu County, Kenya</span>
//       </div>
//       <div className="flex items-center text-white bg-black/40 px-6 py-3 rounded-full shadow-lg backdrop-blur-sm">
//         <Calendar className="w-5 h-5 mr-3 text-blue-200" />
//         <span className="font-semibold">Dates: 17/8/2025</span>
//       </div>
//       <div className="flex items-center text-white bg-black/40 px-6 py-3 rounded-full shadow-lg backdrop-blur-sm">
//         <Users className="w-5 h-5 mr-3 text-cyan-200" />
//         <span className="font-semibold">Limited Spots Available</span>
//       </div>
//     </div>
//     */}

//     <Button 
//       onClick={scrollToRegistration}
//       size="lg" 
//       className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-12 py-6 mb-6 text-xl font-bold rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
//     >
//       Secure Your Spot Now!
//     </Button>
//   </div>
// </section>

//       {/* Media Gallery Section */}
//       <Galla />

//       {/* Registration Section */}
//       <RegistrationForm />
      
//       <EventDetails />

//       {/* Contact Section */}
//       <Footer />
//       {/* <section className="py-16 px-4 bg-gradient-to-r from-purple-800 to-blue-800 text-white">
//         <div className="max-w-4xl mx-auto text-center">
//           <h3 className="text-4xl md:text-5xl font-bold mb-6">Have Questions?</h3>
//           <p className="text-xl mb-8 text-purple-100 max-w-2xl mx-auto">
//             We&rsquo;re here to help! Reach out if you need any information about the retreat, 
//             payment, or what to bring.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
//             <div className="flex items-center bg-white/20 backdrop-blur-sm px-6 py-4 rounded-full">
//               <Phone className="w-6 h-6 mr-3 text-yellow-300" />
//               <span className="text-lg font-semibold">+254 705590618</span>
//             </div>
//             <div className="flex items-center bg-white/20 backdrop-blur-sm px-6 py-4 rounded-full">
//               <MapPin className="w-6 h-6 mr-3 text-yellow-300" />
//               <span className="text-lg font-semibold">Camp Ndunda Falls, Embu</span>
//             </div>
//           </div>
//         </div>
//       </section> */}
//     </div>
//   );
// };

// export default Index;


"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Phone, Star, XCircle } from "lucide-react";

const RegistrationClosed = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-cyan-100 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Overlay with subtle opacity */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      {/* Decorative elements with animations */}
      <div className="absolute top-10 left-10 text-yellow-300 animate-pulse z-10">
        <Star className="w-12 h-12 opacity-70" />
      </div>
      <div className="absolute top-32 right-16 text-pink-300 animate-bounce z-10">
        <Heart className="w-10 h-10 opacity-70" />
      </div>
      <div className="absolute bottom-20 left-16 text-blue-300 animate-pulse z-10">
        <Star className="w-10 h-10 opacity-70" />
      </div>
      <div className="absolute bottom-40 right-24 text-yellow-200 animate-spin-slow z-10">
        <XCircle className="w-14 h-14 opacity-60" />
      </div>

      {/* Main content */}
      <Card className="relative z-10 max-w-lg w-full text-center shadow-2xl border-0 bg-white/90 backdrop-blur-md rounded-2xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-4xl font-bold text-red-500 flex items-center justify-center gap-2">
            <XCircle className="w-8 h-8 text-red-400" />
            Registration Closed
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pb-8">
          <p className="text-lg text-slate-600 leading-relaxed max-w-md mx-auto">
            We sincerely appreciate your enthusiasm for the Vault Retreat 2025 at Camp Ndunda Falls. 
            Unfortunately, registration for this funky has officially closed. 
            Stay tuned for updates. Reach out to our team for any inquiries!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              className="bg-transparent border-purple-300 text-purple-700 hover:bg-purple-50 hover:text-purple-800 rounded-full px-6 py-2 text-lg font-semibold shadow-md transition-all duration-300"
              onClick={() => window.location.href = "tel:+254705590618"}
            >
              <span className="flex items-center gap-2"><Phone size={16}/>0705590618</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistrationClosed;