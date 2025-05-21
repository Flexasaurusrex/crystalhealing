import { Gem, MapPin, Phone, Mail } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[hsl(var(--purple-900))] text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Gem className="h-6 w-6 text-[hsl(var(--pink-400))]" />
              <h3 className="font-playfair font-bold text-xl text-white">Crystals for Kids</h3>
            </div>
            <p className="text-purple-200 mb-6">
              A 501(c)(3) nonprofit organization dedicated to bringing the healing beauty of 
              crystals to children in hospitals across the country.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-purple-300 hover:text-white transition-colors" aria-label="Facebook">
                <FaFacebookF className="text-lg" />
              </a>
              <a href="#" className="text-purple-300 hover:text-white transition-colors" aria-label="Instagram">
                <FaInstagram className="text-lg" />
              </a>
              <a href="#" className="text-purple-300 hover:text-white transition-colors" aria-label="Twitter">
                <FaTwitter className="text-lg" />
              </a>
              <a href="#" className="text-purple-300 hover:text-white transition-colors" aria-label="LinkedIn">
                <FaLinkedinIn className="text-lg" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-montserrat font-medium text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#mission" className="text-purple-200 hover:text-white transition-colors">
                  Our Mission
                </a>
              </li>
              <li>
                <a href="#about" className="text-purple-200 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#gallery" className="text-purple-200 hover:text-white transition-colors">
                  Crystal Gallery
                </a>
              </li>
              <li>
                <a href="#impact" className="text-purple-200 hover:text-white transition-colors">
                  Impact Stories
                </a>
              </li>
              <li>
                <a href="#donate" className="text-purple-200 hover:text-white transition-colors">
                  Donate
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-montserrat font-medium text-white mb-6">Resources</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-purple-200 hover:text-white transition-colors">
                  Crystal Care Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-purple-200 hover:text-white transition-colors">
                  Partner Hospitals
                </a>
              </li>
              <li>
                <a href="#" className="text-purple-200 hover:text-white transition-colors">
                  Newsletter Archive
                </a>
              </li>
              <li>
                <a href="#" className="text-purple-200 hover:text-white transition-colors">
                  Annual Reports
                </a>
              </li>
              <li>
                <a href="#" className="text-purple-200 hover:text-white transition-colors">
                  Press Resources
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-montserrat font-medium text-white mb-6">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 mt-1 text-[hsl(var(--pink-400))]" />
                <span className="text-purple-200">123 Healing Way, Memphis, TN 38105</span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="h-5 w-5 mt-1 text-[hsl(var(--pink-400))]" />
                <span className="text-purple-200">(555) 123-4567</span>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="h-5 w-5 mt-1 text-[hsl(var(--pink-400))]" />
                <span className="text-purple-200">info@crystalsforkids.org</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-purple-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-purple-300 text-sm mb-4 md:mb-0">
              &copy; {currentYear} Crystals for Kids. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-purple-300 text-sm hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-purple-300 text-sm hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-purple-300 text-sm hover:text-white transition-colors">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
