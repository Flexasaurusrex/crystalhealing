import { createRoot } from "react-dom/client";
import { Helmet, HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <Helmet>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
      <title>Crystals for Kids | Healing Through Visual Therapy for Children in Hospitals</title>
      <meta name="description" content="Crystals for Kids partners with St. Jude's and hospitals nationwide to provide therapeutic crystal displays that bring joy, wonder, and healing to pediatric patients." />
      <meta name="keywords" content="crystal therapy, children's hospitals, pediatric healing, St. Jude's partner, nonprofit, crystal donations, visual therapy" />
      <meta name="author" content="Crystals for Kids Organization" />
      <meta name="robots" content="index, follow" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://crystalsforkids.org/" />
      <meta property="og:title" content="Crystals for Kids | Visual Therapy for Children in Hospitals" />
      <meta property="og:description" content="We donate display crystals to bring joy, wonder, and healing to children in hospitals through visual therapy." />
      <meta property="og:image" content="https://pixabay.com/get/g8e53d07f711507ed92ccd4270ee63895e2803d2dbae85727afba3928e159b0ac40cfc52822db9f34acc91675a78fba66e84eb5ae6fba81709fe51096c5a97230_1280.jpg" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://crystalsforkids.org/" />
      <meta property="twitter:title" content="Crystals for Kids | Visual Therapy for Children" />
      <meta property="twitter:description" content="Bringing healing beauty and joy to pediatric patients through crystal displays in partnership with hospitals nationwide." />
      <meta property="twitter:image" content="https://pixabay.com/get/g8e53d07f711507ed92ccd4270ee63895e2803d2dbae85727afba3928e159b0ac40cfc52822db9f34acc91675a78fba66e84eb5ae6fba81709fe51096c5a97230_1280.jpg" />
      
      {/* Canonical Link */}
      <link rel="canonical" href="https://crystalsforkids.org/" />
      
      {/* Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Open+Sans:wght@300;400;500;600&family=Montserrat:wght@500;600&display=swap" rel="stylesheet" />
    </Helmet>
    <App />
  </HelmetProvider>
);
