import type { Metadata } from "next";
import { Be_Vietnam_Pro, Noto_Sans } from "next/font/google";
import "./globals.css";
import Image from "next/image";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});


export const metadata: Metadata = {
  metadataBase: new URL("https://shrijideveloper.in"),

  title: {
    default:
      "ShriJi Developers - ShriJi Enclave Township Morena",
    template: "%s | ShriJi Developers",
  },

  description:
    "ShriJi Developers offers premium residential plots with modern infrastructure, clear legal documentation, flexible payment plans, and nature-forward heritage living communities. Invest with confidence in secure and future-ready real estate.",

  keywords: [
    // Brand
    "ShriJi Developers",

    // Morena Real Estate
    "Plots in Morena",
    "Residential Plots in Morena",
    "Premium Plots in Morena",
    "Land for Sale in Morena",
    "Property in Morena",
    "Real Estate in Morena",
    "Township in Morena",
    "Gated Community in Morena",
    "Morena Property Dealer",
    "Morena Real Estate Developer",

    // Investment Keywords
    "Property Investment in Morena",
    "Best Property Investment in Morena",
    "Future Growth Area Morena",
    "Investment Plots in Morena",
    "Residential Land Investment",
    "Secure Property Investment",

    // Township Keywords
    "Residential Township Morena",
    "Premium Township Morena",
    "Integrated Township Morena",
    "Luxury Township Morena",
    "Township Project Morena",

    // Plot Keywords
    "Buy Plot in Morena",
    "Plot for Sale Morena",
    "Residential Plot Morena",
    "Approved Plots Morena",
    "Legal Plots Morena",
    "Affordable Plots Morena",
    "Premium Residential Plots",
    "Plots with Amenities",
    "Gated Plot Project",

    // Buyer Intent
    "Best Plots in Morena",
    "Top Real Estate Projects Morena",
    "Best Township in Morena",
    "Property Near Morena City",
    "Land Investment Opportunities Morena",

    // Trust Keywords
    "100 Percent Legal Property",
    "Verified Land Documents",
    "Registry Ready Plots",
    "Government Approved Layout",
    "Clear Title Property",

    // Lifestyle Keywords
    "Nature Living Community",
    "Modern Township Living",
    "Green Living Morena",
    "Heritage Living",
    "Family Friendly Township",
    "Premium Lifestyle Community",

    // Regional Keywords
    "Property Near Gwalior",
    "Plots Near Gwalior",
    "Township Near Gwalior",
    "Investment Property Near Gwalior",
    "Residential Land Near Gwalior"
  ],

  authors: [
    {
      name: "ShriJi Developer",
    },
  ],

  creator: "ShriJi Developer",
  publisher: "ShriJi Developer",

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "https://shrijideveloper.in",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://shrijideveloper.in",
    siteName: "ShriJi Developers",

    title:
      "ShriJi Developers - ShriJi Enclave Township Morena",

    description:
      "Own premium residential plots with modern amenities, transparent legal documentation, and flexible payment plans.",

    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ShriJi Developers Residential Projects",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "ShriJi Developers - ShriJi Enclave Township Morena",

    description:
      "Explore premium residential plots designed for modern and sustainable living.",

    images: ["/og-image.jpg"],
  },

  category: "Real Estate",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const realEstateSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "ShriJi Developers",
    url: "https://shrijideveloper.in",
    logo: "https://shrijideveloper.in/logo.png",
    image: "https://shrijideveloper.in/logo.png",

    description:
      "Premium residential plots with modern amenities, legal security, and flexible payment plans.",

    areaServed: {
      "@type": "Country",
      name: "India",
    },

    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },

    sameAs: [
      "https://www.facebook.com/profile.php?id=61590441991071",
      "https://www.instagram.com/shrijidevelopers_official",
    ],
  };

  const message = "Hello, I’m looking to inquire about your available plots. Please share a brochure or have a representative call me back at your earliest convenience."

  return (
    <html
      lang="hi"
      className={`${beVietnamPro.variable} ${notoSans.variable} scroll-smooth antialiased`}

    >
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

        {/* Theme */}
        <meta name="theme-color" content="#ffffff" />

        {/* Geo Tags */}
        <meta name="geo.region" content="IN" />
        <meta name="geo.country" content="India" />

        {/* Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(realEstateSchema),
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-on-surface selection:bg-secondary-container selection:text-on-secondary-container font-body-md">
        {children}

        
        <div className="fixed bottom-8 right-8 z-[100] font-noto-sans flex flex-col items-end gap-3 pointer-events-none">
          {/* instagram */}
          <a
            href={`https://www.instagram.com/shrijidevelopers_official/`}
            className="relative flex items-center justify-center sm:w-12 sm:h-12 w-8 h-8 text-[#ffffff] rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer pointer-events-auto"
            aria-label="Open Assistance Chat"
          >
            <span className="absolute inset-0 rounded-full bg-[#FF0A5F] animate-ping opacity-20"></span>
            <Image src={'https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg'} width={100} height={100} alt="instagram icon" />
          </a>

          {/* facebook */}
          <a
            href={`https://www.facebook.com/profile.php?id=61590441991071`}
            className="relative flex items-center justify-center sm:w-12 sm:h-12 w-8 h-8 bg-[#0866FF] text-[#ffffff] rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer pointer-events-auto"
            aria-label="Open Assistance Chat"
          >
            <span className="absolute inset-0 rounded-full bg-[#0866FF] animate-ping opacity-20"></span>
            <Image src={'https://upload.wikimedia.org/wikipedia/commons/b/b9/2023_Facebook_icon.svg'} width={100} height={100} alt="facebook icon" />
          </a>

          {/* whatsapp */}
          {/* The Action green WhatsApp Pill Button itself */}
          <a
            href={`https://wa.me/916262777411?text=${message}`}
            className="relative flex items-center justify-center sm:w-12 sm:h-12 w-8 h-8 bg-gray-100  text-[#ffffff] rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer pointer-events-auto"
            aria-label="Open Assistance Chat"
          >
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></span>
            <Image src={'https://upload.wikimedia.org/wikipedia/commons/4/4c/WhatsApp_Logo_green.svg'} width={100} height={100} alt="whatsapp icon" />
          </a>



        </div>
      </body>
    </html>
  );
}
