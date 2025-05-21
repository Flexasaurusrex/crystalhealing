import { motion } from "framer-motion";
import { useState } from "react";
import { InPlaceImageEditor } from "@/components/admin/InPlaceImageEditor";

export function CrystalKitSection() {
  // Use the updated dark background image that matches our site theme
  const [kitImage, setKitImage] = useState("/uploads/crystal-kit-dark.png");
  
  return (
    <section className="py-20 bg-[hsl(var(--stone-50))] dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-playfair font-bold text-3xl md:text-4xl text-[hsl(var(--purple-800))] dark:text-purple-300 mb-4">What Comes in a Crystal Kit?</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[hsl(var(--purple-500))] to-[hsl(var(--pink-400))] mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our carefully curated crystal kits are designed to provide a captivating visual experience for children in hospital settings. 
            Each kit is thoughtfully packaged to create a sense of discovery and wonder.
          </p>
        </motion.div>
        
        <div className="flex flex-col lg:flex-row items-center gap-10 mt-12">
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="rounded-2xl shadow-xl overflow-hidden bg-white dark:bg-gray-900">
              <InPlaceImageEditor
                currentImageUrl={kitImage}
                altText="Amethyst crystal kit with educational card"
                className="w-full h-auto"
                onImageUpdated={(newUrl) => setKitImage(newUrl)}
              />
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="font-playfair font-bold text-2xl text-[hsl(var(--purple-800))] dark:text-purple-300 mb-6">
              Each Crystal Kit Includes:
            </h3>
            
            <ul className="space-y-6">
              <li className="flex items-start">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center mr-4">
                  <span className="text-[hsl(var(--purple-500))]">1</span>
                </span>
                <div>
                  <h4 className="font-playfair font-semibold text-lg text-[hsl(var(--purple-800))] dark:text-purple-300 mb-2">Premium Crystal Specimen</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    A high-quality, natural crystal like the amethyst shown, carefully selected for its visual appeal and safe handling properties.
                  </p>
                </div>
              </li>
              
              <li className="flex items-start">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center mr-4">
                  <span className="text-[hsl(var(--purple-500))]">2</span>
                </span>
                <div>
                  <h4 className="font-playfair font-semibold text-lg text-[hsl(var(--purple-800))] dark:text-purple-300 mb-2">Educational Card</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Child-friendly information about the crystal's properties, formation, and visual characteristics, 
                    designed to inspire curiosity and provide educational value.
                  </p>
                </div>
              </li>
              
              <li className="flex items-start">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center mr-4">
                  <span className="text-[hsl(var(--purple-500))]">3</span>
                </span>
                <div>
                  <h4 className="font-playfair font-semibold text-lg text-[hsl(var(--purple-800))] dark:text-purple-300 mb-2">Eco-Friendly Packaging</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Sustainable packaging with natural paper filling ensures the crystal is protected 
                    during transport while minimizing environmental impact.
                  </p>
                </div>
              </li>
              
              <li className="flex items-start">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center mr-4">
                  <span className="text-[hsl(var(--purple-500))]">4</span>
                </span>
                <div>
                  <h4 className="font-playfair font-semibold text-lg text-[hsl(var(--purple-800))] dark:text-purple-300 mb-2">Display Recommendations</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Suggestions for safe display within a hospital room setting to maximize the visual therapy 
                    benefits and create an optimal healing environment.
                  </p>
                </div>
              </li>
            </ul>
            
            <div className="mt-8 p-5 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-purple-100 dark:border-purple-900/30">
              <h4 className="font-playfair font-semibold text-lg text-[hsl(var(--purple-500))] mb-2">Did You Know?</h4>
              <p className="text-gray-600 dark:text-gray-300">
                As shown on our educational card, 70% of children reported feeling more cheerful after viewing natural crystals like amethyst. 
                The purple color of amethyst comes from iron impurities and irradiation, forming over millions of years underground!
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}