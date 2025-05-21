import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart, Droplet, Sun, Moon, Zap } from "lucide-react";

export function CrystalWhispersSection() {
  const [selectedProperty, setSelectedProperty] = useState(null);
  
  // Crystal properties data with child-friendly descriptions and fun facts
  const crystalProperties = [
    {
      id: "healing",
      name: "Gentle Healing",
      crystal: "Amethyst",
      color: "purple",
      icon: <Sparkles className="h-6 w-6" />,
      description: "Amethyst crystals are like little purple healers. They help bring peaceful feelings when you look at them.",
      funFact: "Ancient people believed amethyst could protect them from bad dreams!"
    },
    {
      id: "love",
      name: "Kindness & Love",
      crystal: "Rose Quartz",
      color: "pink",
      icon: <Heart className="h-6 w-6" />,
      description: "Rose quartz is a gentle pink crystal that reminds us to be kind to ourselves and others.",
      funFact: "Rose quartz is sometimes called the 'love stone' because of its pretty pink color!"
    },
    {
      id: "clarity",
      name: "Clear Thoughts",
      crystal: "Clear Quartz",
      color: "blue",
      icon: <Droplet className="h-6 w-6" />,
      description: "Clear quartz is like a bright light for your thoughts, helping you think happy, clear thoughts.",
      funFact: "Clear quartz can create rainbows when sunlight shines through it!"
    },
    {
      id: "energy",
      name: "Happy Energy",
      crystal: "Citrine",
      color: "yellow",
      icon: <Sun className="h-6 w-6" />,
      description: "Citrine is a sunny crystal that brings happy, bright feelings just like a summer day.",
      funFact: "Citrine is one of the few crystals that never needs cleaning - it's always happy!"
    },
    {
      id: "calm",
      name: "Peaceful Dreams",
      crystal: "Selenite",
      color: "gray",
      icon: <Moon className="h-6 w-6" />,
      description: "Selenite is a soft glowing crystal that helps bring peaceful sleep and calm dreams.",
      funFact: "Selenite is named after Selene, the Greek goddess of the moon!"
    },
    {
      id: "protection",
      name: "Brave Shield",
      crystal: "Fluorite",
      color: "green",
      icon: <Zap className="h-6 w-6" />,
      description: "Fluorite comes in many colors and helps you feel brave when things seem scary.",
      funFact: "Fluorite can glow in the dark under special lights - like magic!"
    }
  ];

  // Find the currently selected property
  const activeProperty = crystalProperties.find(prop => prop.id === selectedProperty);

  return (
    <section id="crystal-whispers" className="py-16 sm:py-20 bg-gradient-to-b from-white to-purple-50 dark:from-gray-900 dark:to-purple-950/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-playfair font-bold text-3xl md:text-4xl text-[hsl(var(--purple-800))] dark:text-purple-300 mb-3 sm:mb-4">Crystal Whispers</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[hsl(var(--purple-500))] to-[hsl(var(--pink-400))] mx-auto mb-4 sm:mb-6"></div>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-sm sm:text-base">
            Discover the gentle magic of crystals through our child-friendly animations. 
            Click on each crystal property to learn about the special qualities these natural wonders share with us.
          </p>
        </motion.div>
        
        {/* Crystal Properties Selection */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {crystalProperties.map((property) => (
            <motion.button
              key={property.id}
              className={`p-4 rounded-xl flex flex-col items-center justify-center transition-all
                ${selectedProperty === property.id 
                  ? "bg-purple-100 dark:bg-purple-900/30 ring-2 ring-purple-500" 
                  : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
              onClick={() => setSelectedProperty(property.id)}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 
                ${property.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-500' : ''}
                ${property.color === 'pink' ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-500' : ''}
                ${property.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-500' : ''}
                ${property.color === 'yellow' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-500' : ''}
                ${property.color === 'gray' ? 'bg-gray-100 dark:bg-gray-900/30 text-gray-500' : ''}
                ${property.color === 'green' ? 'bg-green-100 dark:bg-green-900/30 text-green-500' : ''}
              `}>
                {property.icon}
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{property.name}</span>
            </motion.button>
          ))}
        </div>
        
        {/* Animation Display Area */}
        <AnimatePresence mode="wait">
          {selectedProperty ? (
            <motion.div
              key={selectedProperty}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden max-w-3xl mx-auto"
            >
              <div className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row items-center mb-6">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mr-4 
                    ${activeProperty.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-500' : ''}
                    ${activeProperty.color === 'pink' ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-500' : ''}
                    ${activeProperty.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-500' : ''}
                    ${activeProperty.color === 'yellow' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-500' : ''}
                    ${activeProperty.color === 'gray' ? 'bg-gray-100 dark:bg-gray-900/30 text-gray-500' : ''}
                    ${activeProperty.color === 'green' ? 'bg-green-100 dark:bg-green-900/30 text-green-500' : ''}
                  `}>
                    {activeProperty.icon}
                  </div>
                  <div className="text-center sm:text-left mt-4 sm:mt-0">
                    <h3 className="font-playfair font-bold text-xl text-[hsl(var(--purple-800))] dark:text-purple-300">{activeProperty.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 font-medium">{activeProperty.crystal} Crystal</p>
                  </div>
                </div>
                
                {/* Crystal Animation Area */}
                <div className="flex flex-col sm:flex-row items-center mb-6">
                  <div className="w-full sm:w-1/2 mb-6 sm:mb-0 sm:pr-6">
                    <div className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center relative">
                      {/* Crystal Animation */}
                      {activeProperty.id === "healing" && <AmethystAnimation />}
                      {activeProperty.id === "love" && <RoseQuartzAnimation />}
                      {activeProperty.id === "clarity" && <ClearQuartzAnimation />}
                      {activeProperty.id === "energy" && <CitrineAnimation />}
                      {activeProperty.id === "calm" && <SeleniteAnimation />}
                      {activeProperty.id === "protection" && <FluoriteAnimation />}
                    </div>
                  </div>
                  <div className="w-full sm:w-1/2">
                    <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base mb-4">
                      {activeProperty.description}
                    </p>
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                      <h4 className="font-bold text-amber-700 dark:text-amber-300 text-sm mb-2">Fun Crystal Fact:</h4>
                      <p className="text-amber-800 dark:text-amber-200 text-sm">{activeProperty.funFact}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <button 
                    onClick={() => setSelectedProperty(null)} 
                    className="text-sm text-gray-500 hover:text-[hsl(var(--purple-500))] transition-colors"
                  >
                    ← See other crystal properties
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-8"
            >
              <p className="text-gray-500 dark:text-gray-400 italic">Click on a crystal property above to see its special animation!</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// Specific crystal animations
function AmethystAnimation() {
  return (
    <motion.div className="relative w-4/5 h-4/5">
      {/* Crystal base */}
      <motion.div 
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/5 h-2/5 bg-purple-400 rounded-b-lg opacity-80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 1 }}
      />
      
      {/* Crystal points */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bottom-[40%] bg-purple-500 rounded-t-lg"
          style={{
            left: `${30 + i * 10}%`,
            width: '8%',
            height: `${30 + Math.sin(i * 0.8) * 20}%`,
            transformOrigin: 'bottom'
          }}
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 0.9, scaleY: 1 }}
          transition={{ delay: i * 0.2, duration: 1 }}
        />
      ))}
      
      {/* Sparkle effects */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute rounded-full bg-white"
          style={{
            width: 4 + Math.random() * 6,
            height: 4 + Math.random() * 6,
            top: `${20 + Math.random() * 60}%`,
            left: `${20 + Math.random() * 60}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 1.5 + Math.random() * 2,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </motion.div>
  );
}

function RoseQuartzAnimation() {
  return (
    <motion.div className="relative w-4/5 h-4/5">
      {/* Rose quartz shape */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-pink-300 rounded-3xl opacity-80"
        initial={{ scale: 0, opacity: 0, borderRadius: "50%" }}
        animate={{ scale: 1, opacity: 0.8, borderRadius: "30%" }}
        transition={{ duration: 1.5 }}
      />
      
      {/* Heart pulses */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`heart-pulse-${i}`}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-pink-400 rounded-3xl"
          style={{
            width: '70%',
            height: '70%',
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.5, 0.1],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            delay: i * 1,
          }}
        />
      ))}
      
      {/* Gentle sparkles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`rose-sparkle-${i}`}
          className="absolute rounded-full bg-pink-200"
          style={{
            width: 3 + Math.random() * 4,
            height: 3 + Math.random() * 4,
            top: `${20 + Math.random() * 60}%`,
            left: `${20 + Math.random() * 60}%`,
          }}
          animate={{
            opacity: [0, 0.8, 0],
            y: [0, -10, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 2 + Math.random() * 2,
            delay: Math.random() * 3,
          }}
        />
      ))}
    </motion.div>
  );
}

function ClearQuartzAnimation() {
  return (
    <motion.div className="relative w-4/5 h-4/5">
      {/* Clear quartz */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/4 h-3/5 bg-white dark:bg-gray-200 opacity-70"
        style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
        initial={{ opacity: 0, rotateY: -90 }}
        animate={{ opacity: 0.7, rotateY: 0 }}
        transition={{ duration: 1 }}
      />
      
      {/* Rainbow reflections */}
      <motion.div className="absolute top-[30%] left-[45%] w-[4%] h-[4%] rounded-full bg-red-400"
        animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1.2, 0.5], x: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 3, delay: 0 }}
      />
      <motion.div className="absolute top-[38%] left-[48%] w-[4%] h-[4%] rounded-full bg-orange-400"
        animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1.2, 0.5], x: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 3, delay: 0.3 }}
      />
      <motion.div className="absolute top-[46%] left-[43%] w-[4%] h-[4%] rounded-full bg-yellow-400"
        animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1.2, 0.5], x: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 3, delay: 0.6 }}
      />
      <motion.div className="absolute top-[54%] left-[50%] w-[4%] h-[4%] rounded-full bg-green-400"
        animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1.2, 0.5], x: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3, delay: 0.9 }}
      />
      <motion.div className="absolute top-[62%] left-[45%] w-[4%] h-[4%] rounded-full bg-blue-400"
        animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1.2, 0.5], x: [0, 7, 0] }}
        transition={{ repeat: Infinity, duration: 3, delay: 1.2 }}
      />
      <motion.div className="absolute top-[70%] left-[48%] w-[4%] h-[4%] rounded-full bg-purple-400"
        animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1.2, 0.5], x: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 3, delay: 1.5 }}
      />
      
      {/* Light refractions */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.3, 0] }}
        transition={{ 
          repeat: Infinity,
          duration: 4,
        }}
      >
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-full h-px bg-white opacity-50" 
          style={{ boxShadow: "0 0 10px 2px rgba(255,255,255,0.8)" }} />
      </motion.div>
    </motion.div>
  );
}

function CitrineAnimation() {
  return (
    <motion.div className="relative w-4/5 h-4/5">
      {/* Citrine crystal */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/5 h-3/5 bg-yellow-300 rounded-lg opacity-80"
        style={{ clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.8, y: 0 }}
        transition={{ duration: 1 }}
      />
      
      {/* Sunshine rays */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`sun-ray-${i}`}
          className="absolute top-1/2 left-1/2 bg-yellow-200"
          style={{
            width: '2px',
            height: '15%',
            transformOrigin: 'bottom center',
            transform: `translate(-50%, -100%) rotate(${i * 30}deg)`,
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            height: ['15%', '25%', '15%'],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            delay: i * 0.1,
          }}
        />
      ))}
      
      {/* Energy particles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`energy-${i}`}
          className="absolute rounded-full bg-yellow-200"
          style={{
            width: 3 + Math.random() * 5,
            height: 3 + Math.random() * 5,
            top: '50%',
            left: '50%',
          }}
          animate={{
            x: [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100],
            y: [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100],
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 2 + Math.random() * 2,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </motion.div>
  );
}

function SeleniteAnimation() {
  return (
    <motion.div className="relative w-4/5 h-4/5">
      {/* Selenite crystal */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/4 h-4/5 bg-gray-100 dark:bg-gray-300 opacity-80 rounded-md"
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 0.8, scaleY: 1 }}
        transition={{ duration: 1.5 }}
      />
      
      {/* Soft glow effect */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 h-[85%] rounded-md"
        style={{ 
          background: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)",
        }}
        animate={{
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
        }}
      />
      
      {/* Gentle wave lines */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`wave-${i}`}
          className="absolute left-1/2 transform -translate-x-1/2 h-px bg-white opacity-70 w-2/3"
          style={{
            top: `${30 + (i * 10)}%`,
          }}
          animate={{
            opacity: [0.3, 0.7, 0.3],
            width: ['60%', '70%', '60%'],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            delay: i * 0.4,
          }}
        />
      ))}
      
      {/* Moon-like shimmer */}
      <motion.div
        className="absolute top-[10%] right-[35%] w-[8%] h-[8%] rounded-full bg-white opacity-70"
        animate={{
          opacity: [0.5, 0.9, 0.5],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
        }}
      />
    </motion.div>
  );
}

function FluoriteAnimation() {
  return (
    <motion.div className="relative w-4/5 h-4/5">
      {/* Fluorite crystal structure */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/5 h-3/5"
        style={{ 
          background: `conic-gradient(
            from 0deg,
            rgb(139, 92, 246) 0%,
            rgb(74, 222, 128) 25%,
            rgb(96, 165, 250) 50%,
            rgb(94, 234, 212) 75%,
            rgb(139, 92, 246) 100%
          )`,
          clipPath: "polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)",
        }}
        initial={{ opacity: 0, rotate: -180 }}
        animate={{ opacity: 0.8, rotate: 0 }}
        transition={{ duration: 1.5 }}
      />
      
      {/* Color bands */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-4 border-purple-400 opacity-70"
        style={{ 
          width: "48%",
          height: "48%",
          clipPath: "polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)",
        }}
        animate={{
          opacity: [0.4, 0.7, 0.4],
          rotate: [0, 15, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-4 border-green-400 opacity-70"
        style={{ 
          width: "36%",
          height: "36%",
          clipPath: "polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)",
        }}
        animate={{
          opacity: [0.4, 0.7, 0.4],
          rotate: [0, -15, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-4 border-blue-400 opacity-70"
        style={{ 
          width: "24%",
          height: "24%",
          clipPath: "polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)",
        }}
        animate={{
          opacity: [0.4, 0.7, 0.4],
          rotate: [0, 15, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-4 border-teal-300 opacity-70"
        style={{ 
          width: "12%",
          height: "12%",
          clipPath: "polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)",
        }}
        animate={{
          opacity: [0.4, 0.7, 0.4],
          rotate: [0, -15, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
        }}
      />
      
      {/* Protection shield effect */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 rounded-full border border-white opacity-30"
        animate={{
          scale: [0.8, 1.1, 0.8],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
        }}
      />
    </motion.div>
  );
}