import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { HeroSection } from "@/components/home/hero-section";
import { MissionSection } from "@/components/home/mission-section";
import { AboutSection } from "@/components/home/about-section";
import { GallerySection } from "@/components/home/gallery-section";
import { ImpactSection } from "@/components/home/impact-section";
import { DonateSection } from "@/components/home/donate-section";
import { CrystalEducationSection } from "@/components/home/crystal-education-section";
import { Helmet } from "react-helmet-async";

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Crystals for Kids | Visual Therapy for Pediatric Patients</title>
        
        {/* More detailed and keyword-rich page-specific description */}
        <meta 
          name="description" 
          content="Crystals for Kids donates beautiful crystal displays to children's hospitals nationwide. Our visual therapy program brings joy, comfort, and wonder to young patients through natural crystal specimens in partnership with St. Jude's."
        />
        
        {/* Structured data for better Google understanding */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "NonprofitOrganization",
              "name": "Crystals for Kids",
              "description": "Nonprofit organization providing crystal visual therapy to children in hospitals",
              "url": "https://crystalsforkids.org",
              "logo": "https://crystalsforkids.org/logo.png",
              "sameAs": [
                "https://facebook.com/crystalsforkids",
                "https://instagram.com/crystalsforkids",
                "https://twitter.com/crystalsforkids"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-555-123-4567",
                "contactType": "customer service",
                "email": "info@crystalsforkids.org"
              }
            }
          `}
        </script>
      </Helmet>
      <Navbar />
      <main>
        <HeroSection />
        <MissionSection />
        <AboutSection />
        <GallerySection />
        <CrystalEducationSection />
        <ImpactSection />
        <DonateSection />
      </main>
      <Footer />
    </>
  );
}
