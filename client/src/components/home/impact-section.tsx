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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Testimonial 1 */}
          <motion.div 
            className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-md relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-purple-100 dark:bg-purple-900/50 rounded-bl-xl rounded-tr-xl flex items-center justify-center">
              <Quote className="h-6 w-6 text-purple-300 dark:text-purple-500" />
            </div>
            <div className="mb-6">
              <div className="flex items-center space-x-4 mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200" 
                  alt="Young patient Emma with her amethyst crystal" 
                  className="w-16 h-16 rounded-full object-cover" 
                />
                <div>
                  <h3 className="font-playfair font-semibold text-xl text-[hsl(var(--purple-800))] dark:text-purple-300">Emma's Story</h3>
                  <p className="text-[hsl(var(--green-500))] text-sm">St. Jude's Hospital, Memphis</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic mb-4">
                "Emma received an amethyst cluster during her third round of chemotherapy. She keeps it by her bedside and 
                loves how it catches the light in the morning. The nurses say she's been more engaged and positive since receiving it."
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                — Emma's mother, Sarah
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Circle className="h-2 w-2 fill-[hsl(var(--purple-500))] text-[hsl(var(--purple-500))]" />
              <span className="text-sm text-[hsl(var(--purple-500))] font-medium">8-year-old leukemia patient</span>
            </div>
          </motion.div>
          
          {/* Testimonial 2 */}
          <motion.div 
            className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-md relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-green-100 dark:bg-green-900/50 rounded-bl-xl rounded-tr-xl flex items-center justify-center">
              <Quote className="h-6 w-6 text-green-300 dark:text-green-500" />
            </div>
            <div className="mb-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                  <User className="h-6 w-6 text-green-300 dark:text-green-500" />
                </div>
                <div>
                  <h3 className="font-playfair font-semibold text-xl text-[hsl(var(--purple-800))] dark:text-purple-300">Jackson's Story</h3>
                  <p className="text-[hsl(var(--green-500))] text-sm">Boston Children's Hospital</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic mb-4">
                "My son received a clear quartz with rainbow inclusions that he calls his 'rainbow catcher.' On difficult days, 
                he holds it up to the window to make rainbows on the wall. It's been a small joy during a challenging time."
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                — Jackson's father, Michael
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Circle className="h-2 w-2 fill-[hsl(var(--green-500))] text-[hsl(var(--green-500))]" />
              <span className="text-sm text-[hsl(var(--green-500))] font-medium">10-year-old heart surgery patient</span>
            </div>
          </motion.div>
          
          {/* Testimonial 3 */}
          <motion.div 
            className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-md relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-pink-100 dark:bg-pink-900/50 rounded-bl-xl rounded-tr-xl flex items-center justify-center">
              <Quote className="h-6 w-6 text-pink-300 dark:text-pink-500" />
            </div>
            <div className="mb-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-pink-100 dark:bg-pink-900/50 flex items-center justify-center">
                  <User className="h-6 w-6 text-pink-300 dark:text-pink-500" />
                </div>
                <div>
                  <h3 className="font-playfair font-semibold text-xl text-[hsl(var(--purple-800))] dark:text-purple-300">Dr. Patel's Perspective</h3>
                  <p className="text-[hsl(var(--green-500))] text-sm">Children's National, Washington DC</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic mb-4">
                "The crystal program has transformed our oncology ward's atmosphere. These natural elements 
                bring a sense of wonder that counterbalances the clinical environment. We've seen measurable improvements 
                in patient mood and engagement."
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                — Dr. Maya Patel, Pediatric Oncologist
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Circle className="h-2 w-2 fill-[hsl(var(--pink-400))] text-[hsl(var(--pink-400))]" />
              <span className="text-sm text-[hsl(var(--pink-400))] font-medium">Program participant since 2019</span>
            </div>
          </motion.div>
          
          {/* Hospital Staff Perspective */}
          <motion.div 
            className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-md relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-purple-100 dark:bg-purple-900/50 rounded-bl-xl rounded-tr-xl flex items-center justify-center">
              <Quote className="h-6 w-6 text-purple-300 dark:text-purple-500" />
            </div>
            <div className="mb-6">
              <div className="flex items-center space-x-4 mb-6">
                <img 
                  src="https://pixabay.com/get/gda237806204622b86267f2c6328413f1d74cb16eb00bf738d2f52f6fcd251fde8e475b8dfdfd499bce8ebc557637546fc3329344d9244d269bd7d734f984c4b8_1280.jpg" 
                  alt="Hospital room with crystal display" 
                  className="w-16 h-16 rounded-full object-cover" 
                />
                <div>
                  <h3 className="font-playfair font-semibold text-xl text-[hsl(var(--purple-800))] dark:text-purple-300">Child Life Team</h3>
                  <p className="text-[hsl(var(--green-500))] text-sm">St. Jude's Hospital, Memphis</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic mb-4">
                "The crystal displays have become conversation starters and distraction tools during difficult procedures. 
                Children often become fascinated with the shapes and colors, which helps redirect their focus away from medical anxiety."
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                — Jenny Williams, Child Life Specialist
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Circle className="h-2 w-2 fill-[hsl(var(--purple-500))] text-[hsl(var(--purple-500))]" />
              <span className="text-sm text-[hsl(var(--purple-500))] font-medium">Integrated into therapy programs</span>
            </div>
          </motion.div>
        </div>
        
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
