import { motion } from "framer-motion";
import { Quote, User, Gem, Heart, Hospital, Circle } from "lucide-react";

export function ImpactSection() {
  return (
    <section id="impact" className="py-20 bg-purple-50 dark:bg-purple-950/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-playfair font-bold text-3xl md:text-4xl text-[hsl(var(--purple-800))] dark:text-purple-300 mb-4">Impact Stories</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[hsl(var(--purple-500))] to-[hsl(var(--pink-400))] mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            See how our crystal donations have made a difference in the lives of children 
            undergoing medical treatment around the country.
          </p>
        </motion.div>
        
        <motion.div 
          className="bg-white dark:bg-gray-900 rounded-2xl p-12 shadow-lg relative overflow-hidden mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.7 }}
        >
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-100 dark:bg-purple-900/30 rounded-full blur-3xl opacity-70"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-pink-100 dark:bg-pink-900/30 rounded-full blur-3xl opacity-70"></div>
          
          <Quote className="h-16 w-16 text-purple-200 dark:text-purple-800 mx-auto mb-8" />
          
          <h3 className="font-playfair font-bold text-2xl md:text-3xl text-center text-[hsl(var(--purple-800))] dark:text-purple-300 mb-6">
            Impact Stories Coming Soon
          </h3>
          
          <p className="text-gray-600 dark:text-gray-300 text-center max-w-3xl mx-auto text-lg mb-8">
            Once our program launches, we'll share real stories from children, families, and healthcare providers about how 
            our crystal donations have made a positive impact on their healing journey.
          </p>
          
          <div className="flex justify-center space-x-4">
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-full px-6 py-2 flex items-center">
              <span className="text-[hsl(var(--purple-500))] font-medium">Children's Stories</span>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-full px-6 py-2 flex items-center">
              <span className="text-[hsl(var(--green-500))] font-medium">Healthcare Feedback</span>
            </div>
            <div className="bg-pink-50 dark:bg-pink-900/20 rounded-full px-6 py-2 flex items-center">
              <span className="text-[hsl(var(--pink-400))] font-medium">Family Testimonials</span>
            </div>
          </div>
        </motion.div>
        
        {/* Impact Metrics */}
        <motion.div 
          className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="p-8 md:p-12">
            <h3 className="font-playfair font-bold text-2xl text-[hsl(var(--purple-800))] dark:text-purple-300 mb-6 text-center">Our Impact by the Numbers</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-purple-100 dark:bg-purple-900/50 mx-auto flex items-center justify-center mb-4">
                  <Gem className="h-6 w-6 text-[hsl(var(--purple-500))]" />
                </div>
                <div className="font-playfair font-bold text-3xl text-[hsl(var(--purple-800))] dark:text-purple-300 mb-2">1,250+</div>
                <p className="text-gray-600 dark:text-gray-300">Crystals Donated</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/50 mx-auto flex items-center justify-center mb-4">
                  <User className="h-6 w-6 text-[hsl(var(--green-500))]" />
                </div>
                <div className="font-playfair font-bold text-3xl text-[hsl(var(--purple-800))] dark:text-purple-300 mb-2">850+</div>
                <p className="text-gray-600 dark:text-gray-300">Children Supported</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-pink-100 dark:bg-pink-900/50 mx-auto flex items-center justify-center mb-4">
                  <Hospital className="h-6 w-6 text-[hsl(var(--pink-400))]" />
                </div>
                <div className="font-playfair font-bold text-3xl text-[hsl(var(--purple-800))] dark:text-purple-300 mb-2">28</div>
                <p className="text-gray-600 dark:text-gray-300">Partner Hospitals</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-purple-100 dark:bg-purple-900/50 mx-auto flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[hsl(var(--purple-500))]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="font-playfair font-bold text-3xl text-[hsl(var(--purple-800))] dark:text-purple-300 mb-2">$175K</div>
                <p className="text-gray-600 dark:text-gray-300">Value Donated</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
