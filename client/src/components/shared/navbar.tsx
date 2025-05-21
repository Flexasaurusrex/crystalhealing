import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Gem, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [, navigate] = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/95 dark:bg-gray-900/95 shadow-sm" : "bg-transparent"}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-2">
            <Gem className="text-[hsl(var(--purple-500))] h-8 w-8" />
            <div>
              <h1 className="font-playfair font-bold text-xl sm:text-2xl text-[hsl(var(--purple-800))] dark:text-[hsl(var(--purple-500))]">
                Crystals for Kids
              </h1>
              <p className="text-xs text-[hsl(var(--green-500))] font-montserrat tracking-wider">
                HEALING THROUGH VISUAL THERAPY
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => {
                navigate('/#mission');
                const element = document.getElementById('mission');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="font-montserrat text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-[hsl(var(--purple-500))] dark:hover:text-[hsl(var(--purple-500))] transition-colors"
            >
              Our Mission
            </button>
            <button 
              onClick={() => {
                navigate('/#about');
                const element = document.getElementById('about');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="font-montserrat text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-[hsl(var(--purple-500))] dark:hover:text-[hsl(var(--purple-500))] transition-colors"
            >
              About Us
            </button>
            <button 
              onClick={() => {
                navigate('/#gallery');
                const element = document.getElementById('gallery');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="font-montserrat text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-[hsl(var(--purple-500))] dark:hover:text-[hsl(var(--purple-500))] transition-colors"
            >
              Crystal Gallery
            </button>
            <button 
              onClick={() => {
                navigate('/#impact');
                const element = document.getElementById('impact');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="font-montserrat text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-[hsl(var(--purple-500))] dark:hover:text-[hsl(var(--purple-500))] transition-colors"
            >
              Impact Stories
            </button>
            <button 
              onClick={() => {
                navigate('/#donate');
                const element = document.getElementById('donate');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="font-montserrat text-sm font-medium px-5 py-2 bg-[hsl(var(--purple-500))] text-white rounded-full hover:bg-[hsl(var(--purple-800))] transition-colors"
            >
              Donate
            </button>
            <ThemeToggle />
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden space-x-4">
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMenu} 
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? (
                <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-gray-900 shadow-md pb-4"
          >
            <div className="container mx-auto px-4 flex flex-col space-y-3">
              <button
                className="font-montserrat text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-[hsl(var(--purple-500))] dark:hover:text-[hsl(var(--purple-500))] py-2 transition-colors w-full text-left"
                onClick={() => {
                  setIsOpen(false);
                  navigate('/#mission');
                  const element = document.getElementById('mission');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Our Mission
              </button>
              <button
                className="font-montserrat text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-[hsl(var(--purple-500))] dark:hover:text-[hsl(var(--purple-500))] py-2 transition-colors w-full text-left"
                onClick={() => {
                  setIsOpen(false);
                  navigate('/#about');
                  const element = document.getElementById('about');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                About Us
              </button>
              <button
                className="font-montserrat text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-[hsl(var(--purple-500))] dark:hover:text-[hsl(var(--purple-500))] py-2 transition-colors w-full text-left"
                onClick={() => {
                  setIsOpen(false);
                  navigate('/#gallery');
                  const element = document.getElementById('gallery');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Crystal Gallery
              </button>
              <button
                className="font-montserrat text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-[hsl(var(--purple-500))] dark:hover:text-[hsl(var(--purple-500))] py-2 transition-colors w-full text-left"
                onClick={() => {
                  setIsOpen(false);
                  navigate('/#impact');
                  const element = document.getElementById('impact');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Impact Stories
              </button>
              <button
                className="font-montserrat text-sm font-medium px-5 py-2 bg-[hsl(var(--purple-500))] text-white rounded-full inline-block text-center hover:bg-[hsl(var(--purple-800))] transition-colors w-full"
                onClick={() => {
                  setIsOpen(false);
                  navigate('/#donate');
                  const element = document.getElementById('donate');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Donate
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
