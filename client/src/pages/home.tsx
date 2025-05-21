import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { HeroSection } from "@/components/home/hero-section";
import { MissionSection } from "@/components/home/mission-section";
import { AboutSection } from "@/components/home/about-section";
import { GallerySection } from "@/components/home/gallery-section";
import { ImpactSection } from "@/components/home/impact-section";
import { DonateSection } from "@/components/home/donate-section";
import { Helmet } from "react-helmet";

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Crystals for Kids | Healing Through Visual Therapy</title>
        <meta 
          name="description" 
          content="Crystals for Kids is a nonprofit organization that donates display crystals as visual therapy tools for children in hospitals, partnering with St. Jude's and other healthcare facilities."
        />
        <meta property="og:title" content="Crystals for Kids | Healing Through Visual Therapy" />
        <meta 
          property="og:description" 
          content="We bring the wonder and beauty of crystals to children facing medical challenges in hospitals across the country."
        />
        <meta property="og:type" content="website" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Open+Sans:wght@300;400;500;600&family=Montserrat:wght@500;600&display=swap" 
          rel="stylesheet"
        />
      </Helmet>
      <Navbar />
      <main>
        <HeroSection />
        <MissionSection />
        <AboutSection />
        <GallerySection />
        <ImpactSection />
        <DonateSection />
      </main>
      <Footer />
    </>
  );
}
