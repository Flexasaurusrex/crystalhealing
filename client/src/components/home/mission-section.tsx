import { motion } from "framer-motion";
import { Sparkles, Baby, Heart, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { InPlaceImageEditor } from "@/components/admin/InPlaceImageEditor";

export function MissionSection() {
  const [missionImage, setMissionImage] = useState("https://images.pexels.com/photos/1573236/pexels-photo-1573236.jpeg?auto=compress&cs=tinysrgb&w=1000&h=800&dpr=1");
  return (
    <section id="mission" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-playfair font-bold text-3xl md:text-4xl text-[hsl(var(--purple-800))] dark:text-purple-300 mb-4">Our Mission</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[hsl(var(--purple-500))] to-[hsl(var(--pink-400))] mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We believe in the power of natural beauty to inspire hope and healing. Our mission is to develop a program that brings 
            the therapeutic visual elements of crystals to children facing medical challenges.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div 
            className="bg-[hsl(var(--stone-50))] dark:bg-gray-800 rounded-xl p-6 shadow-sm gradient-border pl-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/50 rounded-lg flex items-center justify-center mb-6">
              <Sparkles className="h-6 w-6 text-[hsl(var(--purple-500))]" />
            </div>
            <h3 className="font-playfair font-semibold text-xl text-[hsl(var(--purple-800))] dark:text-purple-300 mb-3">Visual Therapy</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Our crystal displays provide visual stimulation and can create a sense of wonder and beauty in 
              healthcare environments that can often feel clinical and sterile.
            </p>
          </motion.div>
          
          <motion.div 
            className="bg-[hsl(var(--stone-50))] dark:bg-gray-800 rounded-xl p-6 shadow-sm gradient-border pl-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/50 rounded-lg flex items-center justify-center mb-6">
              <Baby className="h-6 w-6 text-[hsl(var(--green-500))]" />
            </div>
            <h3 className="font-playfair font-semibold text-xl text-[hsl(var(--purple-800))] dark:text-purple-300 mb-3">Child-Centered Care</h3>
            <p className="text-gray-600 dark:text-gray-300">
              We work directly with healthcare providers to ensure our crystal programs integrate with existing 
              treatment protocols and enhance the healing environment.
            </p>
          </motion.div>
          
          <motion.div 
            className="bg-[hsl(var(--stone-50))] dark:bg-gray-800 rounded-xl p-6 shadow-sm gradient-border pl-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="w-16 h-16 bg-pink-100 dark:bg-pink-900/50 rounded-lg flex items-center justify-center mb-6">
              <Heart className="h-6 w-6 text-[hsl(var(--pink-400))]" />
            </div>
            <h3 className="font-playfair font-semibold text-xl text-[hsl(var(--purple-800))] dark:text-purple-300 mb-3">Community Support</h3>
            <p className="text-gray-600 dark:text-gray-300">
              We build a bridge between the crystal community and pediatric healthcare facilities, creating a 
              network of ongoing support for children in need.
            </p>
          </motion.div>
          
          <motion.div 
            className="bg-[hsl(var(--stone-50))] dark:bg-gray-800 rounded-xl p-6 shadow-sm gradient-border pl-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-playfair font-semibold text-xl text-[hsl(var(--purple-800))] dark:text-purple-300 mb-3">Sustainable Practices</h3>
            <p className="text-gray-600 dark:text-gray-300">
              We are committed to ethical sourcing of crystals and environmentally responsible practices in all aspects of our program development.
            </p>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-40 h-40 bg-purple-100/50 dark:bg-purple-900/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-pink-100/50 dark:bg-pink-900/20 rounded-full blur-3xl"></div>
          
          <div className="flex flex-col lg:flex-row relative z-10">
            <div className="lg:w-1/2 order-2 lg:order-1 p-8 md:p-12 flex items-center">
              <div>
                <div className="inline-block bg-purple-100 dark:bg-purple-900/30 rounded-lg px-4 py-1 mb-4">
                  <span className="text-[hsl(var(--purple-500))] font-medium text-sm">Our Holistic Vision</span>
                </div>
                <h3 className="font-playfair font-bold text-2xl md:text-3xl text-[hsl(var(--purple-800))] dark:text-purple-300 mb-5">A Compassionate Approach</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Our program is designed with input from child life specialists, healthcare professionals, and the children themselves. 
                  We take a holistic approach that considers the total environment of a child's healing journey.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mr-3">
                      <CheckCircle2 className="h-4 w-4 text-[hsl(var(--green-500))]" />
                    </div>
                    <div>
                      <span className="font-medium text-[hsl(var(--purple-800))] dark:text-purple-300">Customized selections</span>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Crystal kits tailored to a child's age and interests</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mr-3">
                      <CheckCircle2 className="h-4 w-4 text-[hsl(var(--green-500))]" />
                    </div>
                    <div>
                      <span className="font-medium text-[hsl(var(--purple-800))] dark:text-purple-300">Educational materials</span>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Resources that inspire curiosity and wonder</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mr-3">
                      <CheckCircle2 className="h-4 w-4 text-[hsl(var(--green-500))]" />
                    </div>
                    <div>
                      <span className="font-medium text-[hsl(var(--purple-800))] dark:text-purple-300">Follow-up programs</span>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Ongoing support to maintain engagement</p>
                    </div>
                  </li>
                </ul>
                <a href="#about" className="font-montserrat inline-flex items-center space-x-2 text-white bg-[hsl(var(--purple-500))] hover:bg-[hsl(var(--purple-600))] px-5 py-2 rounded-full shadow-sm transition-colors">
                  <span>Learn about our partnerships</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="lg:w-1/2 order-1 lg:order-2">
              <div className="relative h-full min-h-[300px] md:min-h-[400px] overflow-hidden">
                <InPlaceImageEditor
                  currentImageUrl={missionImage}
                  altText="Healthcare professional showing crystal to young patient"
                  className="w-full h-full object-cover"
                  onImageUpdated={(newUrl) => setMissionImage(newUrl)}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-transparent opacity-20"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
