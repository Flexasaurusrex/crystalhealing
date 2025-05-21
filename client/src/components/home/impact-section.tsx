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
        
        {/* Medical Case Study Section */}
        <motion.div 
          className="bg-white dark:bg-gray-900 rounded-2xl p-8 md:p-12 shadow-lg relative overflow-hidden mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.7 }}
        >
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-100 dark:bg-purple-900/30 rounded-full blur-3xl opacity-70"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-pink-100 dark:bg-pink-900/30 rounded-full blur-3xl opacity-70"></div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/2">
              <div className="inline-block bg-purple-100 dark:bg-purple-900/30 rounded-lg px-4 py-2 mb-6">
                <span className="text-[hsl(var(--purple-500))] font-semibold">Proposed Research Opportunity</span>
              </div>
              
              <h3 className="font-playfair font-bold text-2xl md:text-3xl text-[hsl(var(--purple-800))] dark:text-purple-300 mb-5">
                Visual Therapy: The Potential of Crystals in Pediatric Care
              </h3>
              
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  With your support, we can initiate a groundbreaking observational study examining the effects of crystalline formations as visual therapy tools in pediatric care units, focusing on how these natural wonders affect children's well-being.
                </p>
                
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-[hsl(var(--purple-500))] my-6">
                  <p className="font-medium text-[hsl(var(--purple-800))] dark:text-purple-300">Research Goals:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Measure changes in patient-reported feelings of calm when interacting with crystal displays</li>
                    <li>Track anxiety score variations using established pediatric assessment scales</li>
                    <li>Document observable changes in stress-related behaviors during medical procedures</li>
                    <li>Collect parent and caregiver feedback on mood and outlook improvements</li>
                  </ul>
                </div>
                
                <p>
                  Similar visual therapy studies have shown promising results, suggesting that natural elements like crystalline formations provide unique visual stimulation that can significantly reduce stress and anxiety in pediatric settings.
                </p>
                
                <div className="flex items-center mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <div className="w-12 h-12 rounded-full bg-[hsl(var(--purple-500))] flex items-center justify-center mr-4">
                    <Hospital className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[hsl(var(--purple-800))] dark:text-purple-300">Partner With Medical Professionals</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Help us collaborate with leading pediatric researchers and hospitals</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 relative">
              <div className="relative h-full rounded-xl overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20 p-6 flex flex-col justify-center">
                <div className="absolute top-0 right-0 h-40 w-40 bg-[hsl(var(--purple-500))] opacity-10 rounded-full -mr-10 -mt-10"></div>
                <div className="absolute bottom-0 left-0 h-40 w-40 bg-[hsl(var(--pink-400))] opacity-10 rounded-full -ml-10 -mb-10"></div>
                
                <h4 className="font-playfair font-bold text-xl text-[hsl(var(--purple-800))] dark:text-purple-300 mb-5 relative z-10">
                  Potential Areas of Impact
                </h4>
                
                <div className="space-y-6 relative z-10">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-[hsl(var(--purple-800))] dark:text-purple-300">Anxiety Management</span>
                      <span className="text-amber-500 font-semibold">To Be Measured</span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Investigating how crystal displays may help children manage stress during hospital stays</p>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-[hsl(var(--purple-800))] dark:text-purple-300">Mood Enhancement</span>
                      <span className="text-amber-500 font-semibold">To Be Studied</span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Exploring the potential for natural crystal displays to elevate emotional well-being</p>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-[hsl(var(--purple-800))] dark:text-purple-300">Procedural Comfort</span>
                      <span className="text-amber-500 font-semibold">To Be Assessed</span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Examining if crystals can serve as visual focal points during medical procedures</p>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-[hsl(var(--purple-800))] dark:text-purple-300">Healing Environment</span>
                      <span className="text-amber-500 font-semibold">To Be Evaluated</span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Analyzing how crystals contribute to creating calming, therapeutic spaces</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center mt-10 gap-3">
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-full px-5 py-2 flex items-center">
              <span className="text-[hsl(var(--purple-500))] font-medium">Research Potential</span>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-full px-5 py-2 flex items-center">
              <span className="text-[hsl(var(--green-500))] font-medium">Hospital Partnerships</span>
            </div>
            <div className="bg-pink-50 dark:bg-pink-900/20 rounded-full px-5 py-2 flex items-center">
              <span className="text-[hsl(var(--pink-400))] font-medium">Therapeutic Innovation</span>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-full px-5 py-2 flex items-center">
              <span className="text-blue-500 font-medium">Child-Centered Design</span>
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
            <h3 className="font-playfair font-bold text-2xl text-[hsl(var(--purple-800))] dark:text-purple-300 mb-6 text-center">Our Projected Impact</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-purple-100 dark:bg-purple-900/50 mx-auto flex items-center justify-center mb-4">
                  <Gem className="h-6 w-6 text-[hsl(var(--purple-500))]" />
                </div>
                <div className="font-playfair font-bold text-3xl text-[hsl(var(--purple-800))] dark:text-purple-300 mb-2">1,000+</div>
                <p className="text-gray-600 dark:text-gray-300">Crystals to Donate</p>
                <p className="text-xs text-[hsl(var(--green-500))] mt-2">Year 1 Goal</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/50 mx-auto flex items-center justify-center mb-4">
                  <User className="h-6 w-6 text-[hsl(var(--green-500))]" />
                </div>
                <div className="font-playfair font-bold text-3xl text-[hsl(var(--purple-800))] dark:text-purple-300 mb-2">500+</div>
                <p className="text-gray-600 dark:text-gray-300">Children to Reach</p>
                <p className="text-xs text-[hsl(var(--green-500))] mt-2">First Year Estimate</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-pink-100 dark:bg-pink-900/50 mx-auto flex items-center justify-center mb-4">
                  <Hospital className="h-6 w-6 text-[hsl(var(--pink-400))]" />
                </div>
                <div className="font-playfair font-bold text-3xl text-[hsl(var(--purple-800))] dark:text-purple-300 mb-2">10</div>
                <p className="text-gray-600 dark:text-gray-300">Target Hospital Partners</p>
                <p className="text-xs text-[hsl(var(--green-500))] mt-2">Initial Launch</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-purple-100 dark:bg-purple-900/50 mx-auto flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[hsl(var(--purple-500))]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="font-playfair font-bold text-3xl text-[hsl(var(--purple-800))] dark:text-purple-300 mb-2">$100K</div>
                <p className="text-gray-600 dark:text-gray-300">Fundraising Target</p>
                <p className="text-xs text-[hsl(var(--green-500))] mt-2">Launch Phase</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
