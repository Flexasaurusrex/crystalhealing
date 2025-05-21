import { Button } from "@/components/ui/button";
import { Hospital, Heart, Gem } from "lucide-react";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="pt-24 sm:pt-32 pb-16 sm:pb-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/20 opacity-70"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="flex flex-col md:flex-row items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="md:w-1/2 md:pr-8 mb-10 md:mb-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <h1 className="font-playfair font-bold text-4xl sm:text-5xl md:text-6xl leading-tight text-[hsl(var(--purple-900))] dark:text-purple-100 mb-6">
              Bringing Light<br /> 
              <span className="text-[hsl(var(--green-600))] dark:text-[hsl(var(--green-500))]">& Healing</span><br />
              Through Crystals
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-xl">
              We're fundraising to launch our initiative to donate display crystals as visual therapy tools 
              to children in hospitals, with the goal of bringing comfort and joy to young patients.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button 
                className="bg-[hsl(var(--purple-500))] hover:bg-[hsl(var(--purple-800))] font-montserrat text-white px-8 py-6 rounded-full shadow-sm"
                asChild
              >
                <a href="#donate">Donate Today</a>
              </Button>
              <Button 
                variant="outline" 
                className="border-2 border-[hsl(var(--green-500))] text-[hsl(var(--green-600))] dark:text-[hsl(var(--green-500))] font-montserrat px-8 py-6 rounded-full hover:bg-green-50 dark:hover:bg-green-950/30"
                asChild
              >
                <a href="#mission">Learn More</a>
              </Button>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <img 
              src="https://i.imgur.com/yLyaHtR.jpg"
              alt="Amethyst crystal display by hospital bedside" 
              className="rounded-2xl shadow-xl w-full h-auto object-cover transform md:translate-x-8" 
            />
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="mt-16 md:mt-24 flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="flex items-center space-x-4">
            <div className="bg-white dark:bg-gray-800 rounded-full p-3 shadow-sm">
              <Hospital className="h-6 w-6 text-gray-500 dark:text-gray-400" />
            </div>
            <span className="font-medium text-gray-600 dark:text-gray-300">Seeking Hospital Partnerships</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="bg-white dark:bg-gray-800 rounded-full p-3 shadow-sm">
              <Heart className="h-6 w-6 text-[hsl(var(--pink-400))]" />
            </div>
            <span className="font-medium text-gray-600 dark:text-gray-300">Launching in 2025</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="bg-white dark:bg-gray-800 rounded-full p-3 shadow-sm">
              <Gem className="h-6 w-6 text-[hsl(var(--purple-500))]" />
            </div>
            <span className="font-medium text-gray-600 dark:text-gray-300">Fundraising Stage</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
