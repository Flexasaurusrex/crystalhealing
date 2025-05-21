import { createRoot } from "react-dom/client";
import { Helmet, HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <Helmet>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
      <title>Crystals for Kids | Healing Through Visual Therapy</title>
      <meta name="description" content="Crystals for Kids is a nonprofit organization dedicated to bringing the therapeutic visual beauty of crystals to children in hospitals." />
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Open+Sans:wght@300;400;500;600&family=Montserrat:wght@500;600&display=swap" rel="stylesheet" />
    </Helmet>
    <App />
  </HelmetProvider>
);
