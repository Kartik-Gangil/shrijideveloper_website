import HomeClient from "./HomeClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://shrijideveloper.in"),

  title: {
    default:
      "Premium Residential Plots in Morena | ShriJi Developers",
    template: "%s | ShriJi Developers",
  },

  description:
    "Buy premium residential plots in Morena, Madhya Pradesh. Secure your future with legally verified properties, gated township amenities, flexible payment plans, and excellent connectivity. Explore investment opportunities with ShriJi Developers.",

  keywords: [
    // Brand
    "ShriJi Developers",

    // High Intent Morena Keywords
    "Plots in Morena",
    "Residential Plots in Morena",
    "Land for Sale in Morena",
    "Property in Morena",
    "Real Estate in Morena",
    "Township in Morena",

    // Investment Keywords
    "Property Investment Morena",
    "Investment Plots Morena",
    "Best Property Investment in Morena",
    "Real Estate Investment Morena",

    // Township Keywords
    "Residential Township Morena",
    "Premium Township Morena",
    "Gated Community Morena",
    "Integrated Township Morena",

    // Plot Keywords
    "Premium Residential Plots",
    "Approved Plots Morena",
    "Legal Plots Morena",
    "Registry Ready Plots",
    "Residential Land Morena",

    // Nearby Cities
    "Plots Near Gwalior",
    "Property Near Gwalior",
    "Township Near Gwalior",

    // Long Tail
    "Best Residential Plots in Morena",
    "Affordable Plots in Morena",
    "Buy Plot in Morena",
    "Premium Property Morena",
    "Township Project Morena",
  ],

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: "https://shrijideveloper.in",
  },

  openGraph: {
    title:
      "Premium Residential Plots in Morena | ShriJi Developers",

    description:
      "Invest in premium residential plots with legal security, township amenities, and excellent connectivity in Morena, Madhya Pradesh.",

    url: "https://shrijideveloper.in",

    siteName: "ShriJi Developers",

    locale: "en_IN",

    type: "website",

    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "ShriJi Developers Residential Township Morena",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Premium Residential Plots in Morena | ShriJi Developers",

    description:
      "Explore premium residential plots, township projects, and investment opportunities in Morena.",

    images: ["/logo.png"],
  },

  category: "Real Estate",

  other: {
    "geo.region": "IN-MP",
    "geo.placename": "Morena",
    "geo.position": "26.4934;77.9909",
    ICBM: "26.4934,77.9909",
  },
};

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",

    name: "ShriJi Developers",

    url: "https://shrijideveloper.in",

    description:
      "Premium residential plots and township developments in Morena, Madhya Pradesh.",

    areaServed: {
      "@type": "City",
      name: "Morena",
    },

    address: {
      "@type": "PostalAddress",
      addressLocality: "Morena",
      addressRegion: "Madhya Pradesh",
      addressCountry: "IN",
    },
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      <HomeClient />
    </>
  )
}