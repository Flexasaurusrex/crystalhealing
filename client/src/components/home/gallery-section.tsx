import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

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
  return (
    <motion.div 
      className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: delay * 0.1, duration: 0.5 }}
    >
      <div className="h-48 sm:h-56 md:h-64 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105" 
          loading="lazy"
        />
      </div>
      <div className="p-4 sm:p-6">
        <h3 className="font-playfair font-semibold text-lg sm:text-xl text-[hsl(var(--purple-800))] dark:text-purple-300 mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4">
          {description}
        </p>
        <div className="flex justify-between items-center">
          <span className={`text-xs sm:text-sm text-[hsl(var(--${tagColor}))] font-medium`}>{tag}</span>
          <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{price}</span>
        </div>
      </div>
    </motion.div>
  );
}

export function GallerySection() {
  const crystals = [
    {
      image: "https://pixabay.com/get/gb3069699879036b9d50b872c8b8e334f354ea98c77b831f4e0c7168a5df5a7bc7087c4809e3d9b5836a683c7ad606c7abb43970bf42d2b1898007c116141293a_1280.jpg",
      title: "Amethyst Clusters",
      description: "These purple beauties are among our most popular donations, with their striking color and fascinating geometric crystal formations.",
      tag: "Most requested",
      tagColor: "green-500",
      price: "$75-150 per specimen",
      delay: 1
    },
    {
      image: "https://pixabay.com/get/g72eedb20bfeb136fd62ecce4230b59344d7548e69f8cbdc1f59b9743cf07299a6439184c78558ee1a2576895ff9c3fbd207119bfa6edc9984dcb7ab9fe904278_1280.jpg",
      title: "Clear Quartz Points",
      description: "These crystal points catch and reflect light beautifully, creating rainbow prisms that delight children of all ages.",
      tag: "Great for all ages",
      tagColor: "pink-400",
      price: "$50-100 per specimen",
      delay: 2
    },
    {
      image: "https://pixabay.com/get/g6cd1a1da32e23c13f1d96c8c8fb53c1d18cf20c6db5e7584a76ea62cae0b32290ecf1e2e9a65b6ece5c0b03b77c58f671ffabbb8ac68cf59cdef5c52b97d8a1c_1280.jpg",
      title: "Rose Quartz",
      description: "With their gentle pink color, these stones are particularly popular with younger children and create a calming visual experience.",
      tag: "Calming effect",
      tagColor: "purple-500",
      price: "$45-90 per specimen",
      delay: 3
    },
    {
      image: "https://pixabay.com/get/g2b05943b68c07bb1f534c21ab5ac5e07690dc6e0ed3fe4235dc95ba78bf57a5ab5611eb7216b27a961dd52f9d83db3c27ab023ec56056fe6ec07041d552a3c8a_1280.jpg",
      title: "Fluorite",
      description: "These multi-colored crystals feature bands of purple, green, and blue, making them particularly fascinating visual tools.",
      tag: "Color variety",
      tagColor: "green-500",
      price: "$60-120 per specimen",
      delay: 4
    },
    {
      image: "https://pixabay.com/get/gaf2dfd37b208207498f52f6fb9db7c1c9363a5d38cf1f695aee597dee8428602c556354b5d49c219daf1aea0731f48915f977dea4d263efa8437060482094528_1280.jpg",
      title: "Selenite",
      description: "These luminous white crystals have a gentle glow and fibrous texture that children find both calming and intriguing.",
      tag: "Gentle glow",
      tagColor: "pink-400",
      price: "$40-80 per specimen",
      delay: 5
    },
    {
      image: "https://pixabay.com/get/ga1dfd8e8022b4a62118291b166b0d728b52e305e8d8cd7fa3b8169cb59cbc0c93e5397ee13731c0aa2d4502a108eecacbcc9652b18d3fbb57a8a9abab2f35f16_1280.jpg",
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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
