import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart, Droplet, Sun, Moon, Zap, Loader2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

// Crystal properties data with child-friendly descriptions and fun facts
const crystalProperties = [
  {
    id: "healing",
    name: "Gentle Healing",
    crystal: "Amethyst",
    color: "purple",
    icon: <Sparkles className="h-6 w-6" />,
    description: "Amethyst crystals are like little purple healers. They help bring peaceful feelings when you look at them.",
    funFact: "Ancient people believed amethyst could protect them from bad dreams!",
    promptDetails: "A purple amethyst crystal with natural facets and points. The crystal should have a deep violet color with translucent quality that allows light to pass through. Show the natural hexagonal crystal structure with pyramid-shaped terminations.",
    imageSrc: "https://www.crystalvaults.com/wp-content/uploads/2022/05/920b4e031b1adf2ceb4e01a5e2b7d1cb.jpg"
  },
  {
    id: "love",
    name: "Kindness & Love",
    crystal: "Rose Quartz",
    color: "pink",
    icon: <Heart className="h-6 w-6" />,
    description: "Rose quartz is a gentle pink crystal that reminds us to be kind to ourselves and others.",
    funFact: "Rose quartz is sometimes called the 'love stone' because of its pretty pink color!",
    promptDetails: "A rose quartz crystal specimen with a soft pink color. The crystal should have a gentle, opaque or translucent quality with a subtle, comforting glow. The surface should have a smooth, polished appearance typical of tumbled rose quartz.",
    imageSrc: "https://cdn.shopify.com/s/files/1/0073/3732/9111/files/rose_quartz_1.jpg"
  },
  {
    id: "clarity",
    name: "Clear Thoughts",
    crystal: "Clear Quartz",
    color: "blue",
    icon: <Droplet className="h-6 w-6" />,
    description: "Clear quartz is like a bright light for your thoughts, helping you think happy, clear thoughts.",
    funFact: "Clear quartz can create rainbows when sunlight shines through it!",
    promptDetails: "A clear quartz crystal point with excellent clarity. The crystal should be transparent and prismatic, showing its natural hexagonal structure with a pointed termination. It should have a glass-like appearance with internal refraction creating small rainbow effects where light hits it.",
    imageSrc: "https://cdn.shopify.com/s/files/1/1302/1049/products/10-Clear_Quartz_Crystal_1_1000x.jpg"
  },
  {
    id: "energy",
    name: "Happy Energy",
    crystal: "Citrine",
    color: "yellow",
    icon: <Sun className="h-6 w-6" />,
    description: "Citrine is a sunny crystal that brings happy, bright feelings just like a summer day.",
    funFact: "Citrine is one of the few crystals that never needs cleaning - it's always happy!",
    promptDetails: "A natural citrine crystal with a warm golden yellow color. The crystal should have a honey-like appearance with natural facets that reflect light. Show the crystal's transparent to translucent quality with a cheerful, sunny glow that captures its energetic properties.",
    imageSrc: "https://cdn.shopify.com/s/files/1/1302/1049/products/Natural_Citrine_Crystal_Point_3_1000x.jpg"
  },
  {
    id: "calm",
    name: "Peaceful Dreams",
    crystal: "Selenite",
    color: "gray",
    icon: <Moon className="h-6 w-6" />,
    description: "Selenite is a soft glowing crystal that helps bring peaceful sleep and calm dreams.",
    funFact: "Selenite is named after Selene, the Greek goddess of the moon!",
    promptDetails: "A selenite crystal wand or tower with a pearly white, luminous appearance. The crystal should have a fibrous structure with a silky, striated surface that gives it a moonlight glow. Show its typical elongated form with a gentle translucence that diffuses light beautifully.",
    imageSrc: "https://cdn.shopify.com/s/files/1/0662/3026/1446/files/Selenite_Chunk.jpg"
  },
  {
    id: "protection",
    name: "Brave Shield",
    crystal: "Fluorite",
    color: "green",
    icon: <Zap className="h-6 w-6" />,
    description: "Fluorite comes in many colors and helps you feel brave when things seem scary.",
    funFact: "Fluorite can glow in the dark under special lights - like magic!",
    promptDetails: "A fluorite crystal showing its characteristic cubic or octahedral structure with bands of green, purple, and blue colors. The crystal should demonstrate fluorite's natural color zoning with multiple colors in a single specimen. Show its glassy luster and transparent to translucent quality.",
    imageSrc: "https://cdn.shopify.com/s/files/1/1302/1049/products/Rainbow_Fluorite_with_Green_Flash_from_Mexico_2_1000x.jpg"
  }
];

export function CrystalEducationSection() {
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [generatedImages, setGeneratedImages] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState<Record<string, boolean>>({});
  
  // Function to generate custom crystal images
  const generateImage = async (property: typeof crystalProperties[0]) => {
    if (generatedImages[property.id] || isGenerating[property.id]) return;
    
    setIsGenerating(prev => ({ ...prev, [property.id]: true }));
    
    try {
      const response = await fetch('/api/generate-crystal-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: property.promptDetails,
          name: property.crystal
        })
      });
      
      const data = await response.json();
      
      if (data.imagePath) {
        setGeneratedImages(prev => ({ ...prev, [property.id]: data.imagePath }));
      }
    } catch (error) {
      console.error('Error generating crystal image:', error);
    } finally {
      setIsGenerating(prev => ({ ...prev, [property.id]: false }));
    }
  };
  
  // Find the currently selected property
  const activeProperty = crystalProperties.find(prop => prop.id === selectedProperty);
  
  // Generate image when a property is selected
  useEffect(() => {
    if (activeProperty && !generatedImages[activeProperty.id] && !isGenerating[activeProperty.id]) {
      generateImage(activeProperty);
    }
  }, [selectedProperty]);

  return (
    <section id="crystal-education" className="py-16 sm:py-20 bg-gradient-to-b from-white to-purple-50 dark:from-gray-900 dark:to-purple-950/20">
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
            Discover the gentle magic of crystals through our child-friendly crystal guide. 
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
        
        {/* Content Display Area */}
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
                    ${activeProperty?.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-500' : ''}
                    ${activeProperty?.color === 'pink' ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-500' : ''}
                    ${activeProperty?.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-500' : ''}
                    ${activeProperty?.color === 'yellow' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-500' : ''}
                    ${activeProperty?.color === 'gray' ? 'bg-gray-100 dark:bg-gray-900/30 text-gray-500' : ''}
                    ${activeProperty?.color === 'green' ? 'bg-green-100 dark:bg-green-900/30 text-green-500' : ''}
                  `}>
                    {activeProperty?.icon}
                  </div>
                  <div className="text-center sm:text-left mt-4 sm:mt-0">
                    <h3 className="font-playfair font-bold text-xl text-[hsl(var(--purple-800))] dark:text-purple-300">{activeProperty?.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 font-medium">{activeProperty?.crystal} Crystal</p>
                  </div>
                </div>
                
                {/* Crystal Image & Info Area */}
                <div className="flex flex-col sm:flex-row items-center mb-6">
                  <div className="w-full sm:w-1/2 mb-6 sm:mb-0 sm:pr-6">
                    <div className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center relative">
                      {/* Crystal Image */}
                      {activeProperty && isGenerating[activeProperty.id] ? (
                        <div className="flex flex-col items-center justify-center w-full h-full">
                          <Loader2 className="w-10 h-10 text-purple-500 animate-spin mb-3" />
                          <p className="text-sm text-gray-500 dark:text-gray-400">Creating custom {activeProperty.crystal} image...</p>
                        </div>
                      ) : (
                        <img 
                          src={activeProperty ? (generatedImages[activeProperty.id] || activeProperty.imageSrc) : ''}
                          alt={`${activeProperty?.crystal || 'Crystal'}`}
                          className="w-full h-full object-cover"
                        />
                      )}
                      
                      {/* Sparkles overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-50" />
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={`sparkle-${i}`}
                          className="absolute rounded-full bg-white"
                          style={{
                            width: 3 + Math.random() * 4,
                            height: 3 + Math.random() * 4,
                            top: `${10 + Math.random() * 80}%`,
                            left: `${10 + Math.random() * 80}%`,
                          }}
                          animate={{
                            opacity: [0, 0.8, 0],
                            scale: [0.8, 1.2, 0.8],
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: 1.5 + Math.random() * 2,
                            delay: Math.random() * 2,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="w-full sm:w-1/2">
                    <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base mb-4">
                      {activeProperty?.description}
                    </p>
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                      <h4 className="font-bold text-amber-700 dark:text-amber-300 text-sm mb-2">Fun Crystal Fact:</h4>
                      <p className="text-amber-800 dark:text-amber-200 text-sm">{activeProperty?.funFact}</p>
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
              <p className="text-gray-500 dark:text-gray-400 italic">Click on a crystal property above to learn more!</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}