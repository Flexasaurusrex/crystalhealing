import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { Gem, Heart, Check, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { ContactFormData } from "@shared/schema";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

// Interactive Crystal Animation Component
function InteractiveCrystal() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [sparkleCount, setSparkleCount] = useState(0);
  const controls = useAnimation();
  const crystalRef = useRef<HTMLDivElement>(null);
  
  // Colors for the crystal to cycle through when clicked
  const crystalColors = [
    "#9c27b0", // Purple
    "#e91e63", // Pink
    "#3f51b5", // Indigo
    "#2196f3", // Blue
    "#4caf50", // Green
    "#ff9800", // Orange
  ];
  
  const handleCrystalClick = () => {
    // Start animation and add sparkles
    setIsAnimating(true);
    setSparkleCount(prev => Math.min(prev + 8, 40)); // Add more sparkles up to a maximum
    
    // Animate the crystal - pulse and glow effect
    controls.start({
      scale: [1, 1.15, 1],
      filter: ["drop-shadow(0 0 2px rgba(168, 139, 218, 0.5))", "drop-shadow(0 0 15px rgba(168, 139, 218, 0.8))", "drop-shadow(0 0 2px rgba(168, 139, 218, 0.5))"],
      transition: { 
        duration: 1.8,
        ease: "easeInOut"
      }
    });
    
    // Reset animation state after the animation completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 1800);
  };
  
  // Generate random position for sparkles
  const generateSparklePosition = () => {
    if (!crystalRef.current) return { top: "50%", left: "50%" };
    
    return {
      top: `${Math.random() * 200 - 50}%`,
      left: `${Math.random() * 200 - 50}%`
    };
  };
  
  return (
    <div className="relative w-full h-[300px] flex items-center justify-center my-12">
      <motion.div
        ref={crystalRef}
        className="cursor-pointer relative"
        animate={controls}
        onClick={handleCrystalClick}
        whileHover={{ scale: 1.05 }}
        initial={{ scale: 1 }}
      >
        {/* Exact diamond logo SVG animation - just the diamond without all the text */}
        <div className="relative w-full flex flex-col items-center justify-center">
          {/* Diamond SVG that matches your logo exactly */}
          <svg 
            width="195" 
            height="195" 
            viewBox="0 0 50 50" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="transform scale-[1.5]"
          >
            {/* Top half */}
            <path 
              d="M25 5L45 25L25 45L5 25L25 5Z" 
              fill="url(#diamond-gradient)" 
              stroke="#c4b5d9" 
              strokeWidth="0.8"
            />
            
            {/* Bottom facet line */}
            <path 
              d="M15 25L25 45L35 25" 
              stroke="#c4b5d9" 
              strokeWidth="0.8" 
              fill="none"
            />
            
            {/* Right facet line */}
            <path 
              d="M25 15L45 25L25 35" 
              stroke="#c4b5d9" 
              strokeWidth="0.8" 
              fill="none"
            />
            
            {/* Left facet line */}
            <path 
              d="M25 15L5 25L25 35" 
              stroke="#c4b5d9" 
              strokeWidth="0.8" 
              fill="none"
            />
            
            {/* Inner decoration */}
            <path 
              d="M25 15L35 25L25 35L15 25L25 15Z" 
              fill="url(#inner-gradient)" 
              stroke="#c4b5d9" 
              strokeWidth="0.5"
            />
            
            {/* Light reflection */}
            <path 
              d="M22 12L26 16" 
              stroke="white" 
              strokeWidth="0.8" 
              strokeOpacity="0.7"
            />
            
            {/* Define gradients */}
            <defs>
              <linearGradient id="diamond-gradient" x1="10" y1="10" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#a78bda" />
                <stop offset="100%" stopColor="#7e57c2" />
              </linearGradient>
              <linearGradient id="inner-gradient" x1="15" y1="15" x2="35" y2="35" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#9c7ad0" />
                <stop offset="100%" stopColor="#6c45b6" />
              </linearGradient>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
          </svg>
        </div>
        
        {/* Sparkles around crystal when clicked */}
        <AnimatePresence>
          {isAnimating && Array.from({ length: sparkleCount }).map((_, i) => {
            const position = generateSparklePosition();
            return (
              <motion.div
                key={`sparkle-${i}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: [0, 1.5, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: Math.random() * 1.5 + 0.5 }}
                className="absolute w-4 h-4 text-yellow-200"
                style={{ top: position.top, left: position.left }}
              >
                <Sparkles className="w-full h-full" />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export function DonateSection() {
  const [selectedAmount, setSelectedAmount] = useState<string | null>(null);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [showDonationGuidelines, setShowDonationGuidelines] = useState(false);
  const [showCryptoAddresses, setShowCryptoAddresses] = useState(true);
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
                <Button variant="link" className="text-[hsl(var(--purple-500))] font-medium hover:text-[hsl(var(--purple-800))] p-0 h-auto transition-colors inline-flex items-center space-x-2" onClick={() => setShowDonationGuidelines(true)}>
                  <span>Donation guidelines</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Button>
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
                
                <div className="grid grid-cols-3 gap-3 mb-3">
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
                
                <div className="mb-6">
                  <div className="relative">
                    <span className="absolute inset-y-0 left-3 flex items-center text-gray-500 dark:text-gray-400 pointer-events-none">
                      $
                    </span>
                    <input 
                      type="number" 
                      min="1"
                      placeholder="Custom amount"
                      className={`w-full pl-8 pr-4 py-3 rounded-lg border ${
                        selectedAmount === "custom" 
                          ? "border-[hsl(var(--purple-500))] bg-purple-50 dark:bg-purple-900/30" 
                          : "border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                      } focus:outline-none focus:ring-2 focus:ring-[hsl(var(--purple-500))]`}
                      onChange={(e) => {
                        if (e.target.value) {
                          setSelectedAmount("custom");
                          setCustomAmount(e.target.value);
                        } else {
                          setSelectedAmount(null);
                          setCustomAmount("");
                        }
                      }}
                      value={selectedAmount === "custom" ? customAmount : ""}
                      onClick={() => {
                        if (customAmount) {
                          setSelectedAmount("custom");
                        }
                      }}
                    />
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-[hsl(var(--purple-500))] hover:bg-[hsl(var(--purple-800))] font-montserrat text-white"
                  asChild
                >
                  <a href="https://venmo.com/Ludwig-VonMesser" target="_blank" rel="noopener noreferrer">
                    {selectedAmount === "custom" 
                      ? `Donate $${customAmount} Now`
                      : selectedAmount 
                        ? `Donate $${selectedAmount} Now` 
                        : 'Donate Now'
                    }
                  </a>
                </Button>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center">
                  Prefer payment methods other than Venmo? Reach out and we can accommodate requests including cash or money order.
                </p>
              </motion.div>
            </div>
            
            {/* Cryptocurrency Donation Option */}
            <motion.div 
              className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 transform hover:-translate-y-1"
              whileHover={{ y: -4 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-playfair font-semibold text-xl text-[hsl(var(--purple-800))] dark:text-purple-300">Cryptocurrency Donation</h3>
                <button 
                  onClick={() => setShowCryptoAddresses(!showCryptoAddresses)}
                  className="h-6 w-6 rounded-full flex items-center justify-center hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
                >
                  {showCryptoAddresses ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="8" y1="12" x2="16" y2="12"></line>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="16"></line>
                      <line x1="8" y1="12" x2="16" y2="12"></line>
                    </svg>
                  )}
                </button>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We welcome cryptocurrency donations. You can contribute using Bitcoin (BTC), Ethereum (ETH), or Solana (SOL).
              </p>
              
              {showCryptoAddresses && (
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between bg-[hsl(var(--stone-50))] dark:bg-gray-800 rounded-lg p-3">
                    <div className="flex items-center space-x-3">
                      <span className="w-8 h-8 flex items-center justify-center bg-orange-100 dark:bg-orange-900/30 rounded-full">
                        <span className="text-orange-500 font-bold text-xs">₿</span>
                      </span>
                      <span className="font-medium text-sm text-gray-700 dark:text-gray-300">Bitcoin (BTC)</span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs"
                      onClick={() => {
                        navigator.clipboard.writeText("bc1qa4mr440wjekqqjmqpywstndk0yzumxeclxl7n2");
                        toast({
                          title: "Address Copied!",
                          description: "Bitcoin address copied to clipboard.",
                          variant: "default",
                        });
                      }}
                    >
                      Copy Address
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between bg-[hsl(var(--stone-50))] dark:bg-gray-800 rounded-lg p-3">
                    <div className="flex items-center space-x-3">
                      <span className="w-8 h-8 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 rounded-full">
                        <span className="text-blue-500 font-bold text-xs">Ξ</span>
                      </span>
                      <span className="font-medium text-sm text-gray-700 dark:text-gray-300">Ethereum (ETH)</span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs"
                      onClick={() => {
                        navigator.clipboard.writeText("bc1qa4mr440wjekqqjmqpywstndk0yzumxeclxl7n2");
                        toast({
                          title: "Address Copied!",
                          description: "Ethereum address copied to clipboard.",
                          variant: "default",
                        });
                      }}
                    >
                      Copy Address
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between bg-[hsl(var(--stone-50))] dark:bg-gray-800 rounded-lg p-3">
                    <div className="flex items-center space-x-3">
                      <span className="w-8 h-8 flex items-center justify-center bg-purple-100 dark:bg-purple-900/30 rounded-full">
                        <span className="text-purple-500 font-bold text-xs">◎</span>
                      </span>
                      <span className="font-medium text-sm text-gray-700 dark:text-gray-300">Solana (SOL)</span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs"
                      onClick={() => {
                        navigator.clipboard.writeText("81LDTAXT3BBZhvJfPeomAjRsLPJogvMVK6QwVcL3KeVa");
                        toast({
                          title: "Address Copied!",
                          description: "Solana address copied to clipboard.",
                          variant: "default",
                        });
                      }}
                    >
                      Copy Address
                    </Button>
                  </div>
                </div>
              )}
              
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Please contact us after making a crypto donation so we can properly acknowledge your contribution.
              </p>
            </motion.div>
            
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
              
              {/* Just the crystal with no text overlap */}
              <div className="mt-12 border-t border-purple-400/30 pt-8 flex flex-col items-center">
                <InteractiveCrystal />
                
                {/* All text below the diamond - properly centered */}
                <div className="mt-4 text-center w-full">
                  <div className="font-serif text-sm text-purple-200 tracking-wide">HEALING THROUGH VISUAL THERAPY</div>
                  <div className="text-purple-200 text-sm font-medium mt-2">Click for magic!</div>
                  
                  {/* Decorative quote with proper spacing */}
                  <div className="text-center mt-8 mb-6 max-w-xl mx-auto">
                    <div className="text-purple-200/80 italic text-lg">
                      "The beauty of crystals reminds us of the hidden magic in the world around us."
                    </div>
                    <div className="mt-6 flex justify-center space-x-8">
                      {/* Three mini crystal icons */}
                      <svg width="20" height="20" viewBox="0 0 50 50" fill="#a78bda" opacity="0.6">
                        <path d="M25 5L45 25L25 45L5 25L25 5Z" />
                      </svg>
                      <svg width="20" height="20" viewBox="0 0 50 50" fill="#a78bda" opacity="0.6">
                        <path d="M25 5L45 25L25 45L5 25L25 5Z" />
                      </svg>
                      <svg width="20" height="20" viewBox="0 0 50 50" fill="#a78bda" opacity="0.6">
                        <path d="M25 5L45 25L25 45L5 25L25 5Z" />
                      </svg>
                    </div>
                    <div className="text-purple-200/60 text-sm mt-6">
                      Support our mission to bring joy to children's healing journey
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Donation Guidelines Dialog */}
      <Dialog open={showDonationGuidelines} onOpenChange={setShowDonationGuidelines}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-[hsl(var(--purple-800))] dark:text-purple-300 font-playfair text-2xl">Crystal Donation Guidelines</DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-300 pt-2">
              Thank you for your interest in donating crystals to our program. Please review these guidelines before proceeding.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 my-2">
            <div className="bg-[hsl(var(--stone-50))] dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold text-[hsl(var(--purple-800))] dark:text-purple-300 mb-2 flex items-center gap-2">
                <Check className="h-5 w-5 text-[hsl(var(--green-500))]" />
                Pre-Approval Required
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                All crystal donations must be pre-approved by our team. Please contact us using the form to initiate the process and we'll provide detailed instructions.
              </p>
            </div>
            
            <div className="bg-[hsl(var(--stone-50))] dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold text-[hsl(var(--purple-800))] dark:text-purple-300 mb-2 flex items-center gap-2">
                <Check className="h-5 w-5 text-[hsl(var(--green-500))]" />
                Size Requirements
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                All donated crystals must be a minimum of 3 inches (7.5 cm) in size to ensure proper visibility and display value in hospital settings.
              </p>
            </div>
            
            <div className="bg-[hsl(var(--stone-50))] dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold text-[hsl(var(--purple-800))] dark:text-purple-300 mb-2 flex items-center gap-2">
                <Check className="h-5 w-5 text-[hsl(var(--green-500))]" />
                Cleanliness & Condition
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Crystals must be thoroughly cleaned and in excellent condition. They should be free from dirt, dust, and any residues that could affect their appearance or safety.
              </p>
            </div>
            
            <div className="bg-[hsl(var(--stone-50))] dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold text-[hsl(var(--purple-800))] dark:text-purple-300 mb-2 flex items-center gap-2">
                <Check className="h-5 w-5 text-[hsl(var(--green-500))]" />
                Packaging Requirements
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Crystals must be well-packaged for shipping to prevent damage. We recommend double-boxing with appropriate cushioning materials to ensure safe arrival.
              </p>
            </div>
            
            <div className="bg-[hsl(var(--stone-50))] dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold text-[hsl(var(--purple-800))] dark:text-purple-300 mb-2 flex items-center gap-2">
                <Check className="h-5 w-5 text-[hsl(var(--green-500))]" />
                Shipping Information
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Once your donation is approved, we will provide you with a shipping address and any additional instructions needed for delivery.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" className="bg-[hsl(var(--purple-500))] hover:bg-[hsl(var(--purple-800))]">
                I Understand
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
