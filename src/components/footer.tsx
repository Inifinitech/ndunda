import { MapPin, Phone, Mail, Clock, ExternalLink, Calendar, Instagram, Facebook } from "lucide-react";
import { FaWhatsapp } from 'react-icons/fa';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Footer = () => {
  const faqs = [
    {
      question: "What should I bring?",
      answer: "Bring comfortable clothes for outdoor activities and extra clothes for the mud fun!"
    },
    {
      question: "Do I need to be a Vault Member to attend?",
      answer: "Not at all! We welcome people from all backgrounds. Come as you are, this is a safe space."
    },
    {
      question: "What about meals and accommodation?",
      answer: "All meals are included in the registration fee. Just carry a bottle of water and some snacks if you need to."
    },
    {
      question: "How do I pay for the retreat?",
      answer: "Payment is via M-Pesa. The till number is 4641686. Select your payment plan and paste your transaction code on the form above."
    },
    {
      question: "Is Transport provided?",
      answer: "Transport is from the pick-up point to Camp Ndunda Contact us for more details or inquiries."
    }
  ];

  return (
    <footer className="bg-gradient-to-r from-purple-800 to-blue-800 text-white">
      {/* Main Footer Content */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">

              <h3 className="text-2xl font-bold">Vault Funky</h3>
            </div>
            {/* <p className="text-gray-300 leading-relaxed">
              A Christian youth retreat center in the beautiful landscapes of Embu County. 
              Where young hearts meet Jesus and friendships are born!
            </p> */}
             <div className="flex space-x-4 mt-4">
              <a href="https://www.instagram.com/vault_church/" target="_blank" rel="noopener noreferrer">
                <Instagram className="w-6 h-6 text-red-400 hover:text-[#E1306C] transition-colors" />
              </a>
              <a href="https://www.facebook.com/vaulteenz" target="_blank" rel="noopener noreferrer">
                <Facebook className="w-6 h-6 text-blue-400 hover:text-[#1877F2] transition-colors" />
              </a>
              <a href="https://wa.me/+254705590618" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp className="w-6 h-6 text-green-400 hover:text-[#25D366] transition-colors" />
              </a>
            </div>

            <div className="pt-4">
              <a 
                href="https://campndunda.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-4 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <span>Take a Virtual Tour</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Contact & Quick Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-yellow-400 mb-4">Contact Info</h3>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <span>+254 705590618</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <span>vaultministerial@gmail.com</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-yellow-400 mb-4">Quick Info</h3>
              <div className="space-y-2 text-gray-300">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  <span>Embu County, Kenya</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  <span>August 17th, 2025</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span>All denominations welcome</span>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-yellow-400 mb-4">Frequently Asked Questions (FAQ)</h3>
            <Accordion type="single" collapsible className="space-y-2">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border-gray-600 bg-white/5 rounded-lg px-4"
                >
                  <AccordionTrigger className="text-gray-200 hover:text-white text-left text-sm py-3">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 text-sm pb-3">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-300">
                &copy; 2025 Vault Ministry. All rights reserved.
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Building faith, friendships, and futures
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-400">
              <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                All Denominations Welcome
              </span>
              {/* <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                Safe Environment
              </span>
              <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                Licensed & Insured
              </span> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
