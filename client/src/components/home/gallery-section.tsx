import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { InPlaceImageEditor } from "@/components/admin/InPlaceImageEditor";

interface CrystalCardProps {
  image: string;
  title: string;
  description: string;
  tag: string;
  tagColor: string;
  price: string;
  delay: number;
}

function CrystalCard({ image, title, description, tag, tagColor, price, delay }: CrystalCardProps) {
  const [crystalImage, setCrystalImage] = useState(image);

  return (
    <motion.div 
      className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: delay * 0.1, duration: 0.5 }}
    >
      <div className="w-full h-[280px] overflow-hidden bg-gray-100 dark:bg-gray-800">
        <InPlaceImageEditor
          currentImageUrl={crystalImage}
          altText={title}
          className="w-full h-full object-contain"
          onImageUpdated={(newUrl) => setCrystalImage(newUrl)}
        />
      </div>
      <div className="p-5 md:p-6 flex flex-col flex-grow">
        <h3 className="font-playfair font-semibold text-lg md:text-xl text-[hsl(var(--purple-800))] dark:text-purple-300 mb-2 md:mb-3">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 md:mb-6 flex-1">
          {description}
        </p>
        <div className="flex justify-between items-center border-t border-gray-100 dark:border-gray-800 pt-3 md:pt-4">
          <span className={`text-sm text-[hsl(var(--${tagColor}))] font-medium`}>{tag}</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">{price}</span>
        </div>
      </div>
    </motion.div>
  );
}

export function GallerySection() {
  const crystals = [
    {
      image: "/uploads/image-1747850142811-50648891.png",
      title: "Amethyst Clusters",
      description: "These purple beauties are among our most popular donations, with their striking color and fascinating geometric crystal formations.",
      tag: "Most requested",
      tagColor: "green-500",
      price: "$75-150 per specimen",
      delay: 1
    },
    {
      image: "/uploads/image-1747850443498-996657443.png",
      title: "Clear Quartz Points",
      description: "These crystal points catch and reflect light beautifully, creating rainbow prisms that delight children of all ages.",
      tag: "Great for all ages",
      tagColor: "pink-400",
      price: "$50-100 per specimen",
      delay: 2
    },
    {
      image: "/uploads/image-1747849325361-238788183.jpeg",
      title: "Rose Quartz",
      description: "With their gentle pink color, these stones are particularly popular with younger children and create a calming visual experience.",
      tag: "Calming effect",
      tagColor: "purple-500",
      price: "$45-90 per specimen",
      delay: 3
    },
    {
      image: "/uploads/image-1747849839811-417506369.png",
      title: "Fluorite",
      description: "These multi-colored crystals feature bands of purple, green, and blue, making them particularly fascinating visual tools.",
      tag: "Color variety",
      tagColor: "green-500",
      price: "$60-120 per specimen",
      delay: 4
    },
    {
      image: "/uploads/image-1747850244264-747089433.png",
      title: "Selenite",
      description: "These luminous white crystals have a gentle glow and fibrous texture that children find both calming and intriguing.",
      tag: "Gentle glow",
      tagColor: "pink-400",
      price: "$40-80 per specimen",
      delay: 5
    },
    {
      image: "/uploads/image-1747850360003-848574926.png",
      title: "Citrine",
      description: "With their sunny yellow color, these crystals bring a bright energy to any room and are especially popular in long-term care settings.",
      tag: "Brightens spaces",
      tagColor: "purple-500",
      price: "$55-110 per specimen",
      delay: 6
    }
  ];

  return (
    <section id="gallery" className="py-16 sm:py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-playfair font-bold text-3xl md:text-4xl text-[hsl(var(--purple-800))] dark:text-purple-300 mb-3 sm:mb-4">Crystal Gallery</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[hsl(var(--purple-500))] to-[hsl(var(--pink-400))] mx-auto mb-4 sm:mb-6"></div>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-sm sm:text-base">
            Each crystal we provide is carefully selected for its visual appeal, safety, and 
            ability to captivate a child's imagination. These are examples of the specimens we donate.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 auto-rows-fr">
          {crystals.map((crystal, index) => (
            <CrystalCard key={index} {...crystal} />
          ))}
        </div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <Button 
            className="bg-[hsl(var(--purple-500))] hover:bg-[hsl(var(--purple-800))] font-montserrat text-white px-8 py-6 rounded-full shadow-sm"
            asChild
          >
            <a href="#donate">Donate to Our Crystal Fund</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
