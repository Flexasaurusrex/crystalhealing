import { useState } from "react";
import { motion } from "framer-motion";
import { Gem, Heart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { ContactFormData } from "@shared/schema";

export function DonateSection() {
  const [selectedAmount, setSelectedAmount] = useState<string | null>(null);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const { toast } = useToast();
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const contactMutation = useMutation({
    mutationFn: (data: ContactFormData) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
        variant: "default",
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to send message: ${error instanceof Error ? error.message : "Unknown error"}`,
        variant: "destructive",
      });
    }
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

  return (
    <section id="donate" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="flex flex-col lg:flex-row items-stretch bg-[hsl(var(--stone-50))] dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="lg:w-1/2 p-8 md:p-12">
            <h2 className="font-playfair font-bold text-3xl md:text-4xl text-[hsl(var(--purple-800))] dark:text-purple-300 mb-4">Make a Difference</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[hsl(var(--purple-500))] to-[hsl(var(--pink-400))] mb-6"></div>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Your donation helps us bring the wonder and beauty of crystals to children in hospitals. 
              Choose how you'd like to contribute to our mission:
            </p>
            
            <div className="space-y-6 mb-8">
              <motion.div 
                className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm cursor-pointer hover:shadow-md transition-shadow duration-300 transform hover:-translate-y-1"
                whileHover={{ y: -4 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-playfair font-semibold text-xl text-[hsl(var(--purple-800))] dark:text-purple-300">Crystal Donation</h3>
                  <Gem className="h-5 w-5 text-[hsl(var(--purple-500))]" />
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Donate high-quality crystal specimens directly. We accept amethyst, clear quartz, 
                  rose quartz, and other visually appealing crystals.
                </p>
                <a href="#" className="text-[hsl(var(--purple-500))] font-medium hover:text-[hsl(var(--purple-800))] transition-colors inline-flex items-center space-x-2">
                  <span>Donation guidelines</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </motion.div>
              
              <motion.div 
                className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm cursor-pointer hover:shadow-md transition-shadow duration-300 transform hover:-translate-y-1"
                whileHover={{ y: -4 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-playfair font-semibold text-xl text-[hsl(var(--purple-800))] dark:text-purple-300">Financial Support</h3>
                  <Heart className="h-5 w-5 text-[hsl(var(--pink-400))]" />
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Your monetary donations help us purchase specimens, create custom displays, 
                  and cover program administration costs.
                </p>
                
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div 
                    className={`${
                      selectedAmount === "50" 
                        ? "bg-[hsl(var(--purple-500))] text-white" 
                        : "bg-purple-50 dark:bg-purple-900/30 text-[hsl(var(--purple-800))] dark:text-purple-300"
                    } rounded-lg p-3 text-center cursor-pointer hover:bg-[hsl(var(--purple-500))] hover:text-white transition-colors`}
                    onClick={() => setSelectedAmount("50")}
                  >
                    <span className="font-medium">$50</span>
                  </div>
                  <div 
                    className={`${
                      selectedAmount === "100" 
                        ? "bg-[hsl(var(--purple-500))] text-white" 
                        : "bg-purple-50 dark:bg-purple-900/30 text-[hsl(var(--purple-800))] dark:text-purple-300"
                    } rounded-lg p-3 text-center cursor-pointer hover:bg-[hsl(var(--purple-500))] hover:text-white transition-colors`}
                    onClick={() => setSelectedAmount("100")}
                  >
                    <span className="font-medium">$100</span>
                  </div>
                  <div 
                    className={`${
                      selectedAmount === "250" 
                        ? "bg-[hsl(var(--purple-500))] text-white" 
                        : "bg-purple-50 dark:bg-purple-900/30 text-[hsl(var(--purple-800))] dark:text-purple-300"
                    } rounded-lg p-3 text-center cursor-pointer hover:bg-[hsl(var(--purple-500))] hover:text-white transition-colors`}
                    onClick={() => setSelectedAmount("250")}
                  >
                    <span className="font-medium">$250</span>
                  </div>
                </div>
                
                <Button className="w-full bg-[hsl(var(--purple-500))] hover:bg-[hsl(var(--purple-800))] font-montserrat text-white">
                  {selectedAmount ? `Donate $${selectedAmount} Now` : 'Donate Now'}
                </Button>
              </motion.div>
            </div>
            
            <div className="bg-white dark:bg-gray-900 rounded-xl p-5 shadow-sm border border-green-100 dark:border-green-900">
              <div className="flex items-center space-x-3 text-[hsl(var(--green-500))]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm font-medium">Support our startup initiative to help children</p>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 p-0">
            {/* Contact Form Section */}
            <div className="bg-[hsl(var(--purple-800))] dark:bg-purple-900 p-8 md:p-12 h-full">
              <h3 className="font-playfair font-bold text-2xl text-white mb-6">Contact Us</h3>
              <p className="text-purple-100 mb-6">
                Have questions about our initiative or how you can get involved? 
                We'd love to hear from you.
              </p>
              
              <div className="flex items-center space-x-2 mb-8 text-purple-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:flex@capyapp.xyz" className="text-white hover:text-pink-200 transition-colors">flex@capyapp.xyz</a>
              </div>
              
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="w-full sm:w-1/2">
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-purple-700 text-white placeholder-purple-300 border border-purple-600 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--pink-400))]"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  
                  <div className="w-full sm:w-1/2">
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-purple-700 text-white placeholder-purple-300 border border-purple-600 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--pink-400))]"
                      placeholder="Your Email"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-purple-700 text-white placeholder-purple-300 border border-purple-600 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--pink-400))]"
                    placeholder="Subject"
                    required
                  />
                </div>
                
                <div>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg bg-purple-700 text-white placeholder-purple-300 border border-purple-600 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--pink-400))]"
                    placeholder="Your Message"
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-[hsl(var(--pink-400))] hover:bg-pink-500 font-montserrat text-white text-center font-medium px-6 py-3 rounded-full"
                  disabled={contactMutation.isPending}
                >
                  {contactMutation.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
