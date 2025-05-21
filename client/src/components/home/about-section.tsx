import { motion } from "framer-motion";
import { Hospital, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-[hsl(var(--stone-50))] dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center md:space-x-12 mb-16">
          <motion.div 
            className="md:w-1/2 mb-10 md:mb-0"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&h=800" 
              alt="Healing hospital space with natural elements" 
              className="rounded-2xl shadow-xl w-full h-auto" 
            />
          </motion.div>
          
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-playfair font-bold text-3xl md:text-4xl text-[hsl(var(--purple-800))] dark:text-purple-300 mb-4">About Us</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[hsl(var(--purple-500))] to-[hsl(var(--pink-400))] mb-6"></div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Crystals for Kids was founded in 2018 by a group of crystal enthusiasts and healthcare professionals 
              who recognized the positive impact that beautiful natural specimens could have on the healing environment.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              What started as a small collection drive has grown into a nationwide network of donors, volunteers, 
              and partner hospitals committed to bringing moments of joy and wonder to children undergoing treatment.
            </p>
            
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm mb-8">
              <h3 className="font-playfair font-semibold text-xl text-[hsl(var(--purple-800))] dark:text-purple-300 mb-3">Our Partnerships</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We work closely with St. Jude Children's Research Hospital and other pediatric healthcare facilities across the country 
                to implement our crystal therapy programs.
              </p>
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex items-center space-x-2 bg-[hsl(var(--stone-50))] dark:bg-gray-800 px-4 py-2 rounded-lg">
                  <Hospital className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">St. Jude's</span>
                </div>
                <div className="flex items-center space-x-2 bg-[hsl(var(--stone-50))] dark:bg-gray-800 px-4 py-2 rounded-lg">
                  <Hospital className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">Children's National</span>
                </div>
                <div className="flex items-center space-x-2 bg-[hsl(var(--stone-50))] dark:bg-gray-800 px-4 py-2 rounded-lg">
                  <Hospital className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">Boston Children's</span>
                </div>
                <div className="flex items-center space-x-2 bg-[hsl(var(--stone-50))] dark:bg-gray-800 px-4 py-2 rounded-lg">
                  <span className="text-sm text-gray-600 dark:text-gray-300">+15 more</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button 
                className="bg-[hsl(var(--purple-500))] hover:bg-[hsl(var(--purple-800))] font-montserrat text-white px-6 py-2 rounded-full shadow-sm"
                asChild
              >
                <a href="#gallery">See Our Crystals</a>
              </Button>
              <a 
                href="#team" 
                className="font-montserrat text-[hsl(var(--purple-500))] font-medium hover:text-[hsl(var(--purple-800))] transition-colors inline-flex items-center space-x-2"
              >
                <span>Meet Our Team</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
        
        {/* Team Section */}
        <div id="team" className="mt-24">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-playfair font-bold text-3xl text-[hsl(var(--purple-800))] dark:text-purple-300 mb-4">Our Team</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[hsl(var(--purple-500))] to-[hsl(var(--pink-400))] mx-auto mb-6"></div>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our dedicated team combines expertise in mineralogy, child psychology, and healthcare
              to create meaningful experiences for children.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <div className="h-48 bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                <Users className="h-20 w-20 text-purple-200 dark:text-purple-700" />
              </div>
              <div className="p-6">
                <h3 className="font-playfair font-semibold text-xl text-[hsl(var(--purple-800))] dark:text-purple-300 mb-1">Sarah Johnson</h3>
                <p className="text-[hsl(var(--green-500))] font-montserrat text-sm font-medium mb-3">Executive Director</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Former pediatric nurse with 15 years experience and a lifelong passion for minerals and crystals.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="h-48 bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                <Users className="h-20 w-20 text-green-200 dark:text-green-700" />
              </div>
              <div className="p-6">
                <h3 className="font-playfair font-semibold text-xl text-[hsl(var(--purple-800))] dark:text-purple-300 mb-1">Michael Chen</h3>
                <p className="text-[hsl(var(--green-500))] font-montserrat text-sm font-medium mb-3">Hospital Liaison</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Child life specialist who coordinates with healthcare facilities to implement our programs.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="h-48 bg-pink-100 dark:bg-pink-900/50 flex items-center justify-center">
                <Users className="h-20 w-20 text-pink-200 dark:text-pink-700" />
              </div>
              <div className="p-6">
                <h3 className="font-playfair font-semibold text-xl text-[hsl(var(--purple-800))] dark:text-purple-300 mb-1">Elena Rodriguez</h3>
                <p className="text-[hsl(var(--green-500))] font-montserrat text-sm font-medium mb-3">Mineralogist</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Expert gemologist who ensures the quality and safety of all donated crystal specimens.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
