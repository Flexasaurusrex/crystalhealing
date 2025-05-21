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
              Crystals for Kids was founded by a group of crystal enthusiasts and healthcare advocates 
              who recognize the potential positive impact that beautiful natural specimens could have in a healing environment.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              We're currently in our startup phase, raising funds and building connections to launch our initiative 
              that aims to bring moments of joy and wonder to children undergoing medical treatment.
            </p>
            
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm mb-8">
              <h3 className="font-playfair font-semibold text-xl text-[hsl(var(--purple-800))] dark:text-purple-300 mb-3">Potential Partners</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We're seeking to build relationships with children's hospitals and pediatric healthcare facilities 
                to bring our crystal therapy program to life once we launch.
              </p>
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex items-center space-x-2 bg-[hsl(var(--stone-50))] dark:bg-gray-800 px-4 py-2 rounded-lg">
                  <Hospital className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">Children's Hospitals</span>
                </div>
                <div className="flex items-center space-x-2 bg-[hsl(var(--stone-50))] dark:bg-gray-800 px-4 py-2 rounded-lg">
                  <Hospital className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">Pediatric Wards</span>
                </div>
                <div className="flex items-center space-x-2 bg-[hsl(var(--stone-50))] dark:bg-gray-800 px-4 py-2 rounded-lg">
                  <Hospital className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">Healthcare Providers</span>
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
        
        {/* Vision Section */}
        <div id="team" className="mt-24">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-playfair font-bold text-3xl text-[hsl(var(--purple-800))] dark:text-purple-300 mb-4">Our Vision</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[hsl(var(--purple-500))] to-[hsl(var(--pink-400))] mx-auto mb-6"></div>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Once launched, we plan to build a dedicated team combining expertise in mineralogy, child psychology, and healthcare
              to create meaningful experiences for children.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
                <h3 className="font-playfair font-semibold text-xl text-[hsl(var(--purple-800))] dark:text-purple-300 mb-1">Program Design</h3>
                <p className="text-[hsl(var(--green-500))] font-montserrat text-sm font-medium mb-3">Future Initiative</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Creating a thoughtful program that brings the wonder of crystals to pediatric care settings with appropriate training and procedures.
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
                <h3 className="font-playfair font-semibold text-xl text-[hsl(var(--purple-800))] dark:text-purple-300 mb-1">Hospital Partnerships</h3>
                <p className="text-[hsl(var(--green-500))] font-montserrat text-sm font-medium mb-3">Upcoming Goal</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Developing relationships with healthcare facilities to implement crystal therapy in appropriate settings.
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
                <h3 className="font-playfair font-semibold text-xl text-[hsl(var(--purple-800))] dark:text-purple-300 mb-1">Crystal Selection</h3>
                <p className="text-[hsl(var(--green-500))] font-montserrat text-sm font-medium mb-3">Quality Assurance</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Ensuring all crystal specimens meet safety standards and are selected for maximum visual impact and therapeutic potential.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className="h-48 bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-indigo-200 dark:text-indigo-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
              </div>
              <div className="p-6">
                <h3 className="font-playfair font-semibold text-xl text-[hsl(var(--purple-800))] dark:text-purple-300 mb-1">Educational Resources</h3>
                <p className="text-[hsl(var(--green-500))] font-montserrat text-sm font-medium mb-3">Knowledge Development</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Creating materials to educate caregivers and children about the properties of crystals and their role in creating calming environments.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
