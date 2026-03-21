import type { Metadata } from "next";
import { Outfit, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppWidget } from "@/components/WhatsAppWidget";
import { GoogleAnalytics } from '@next/third-parties/google';
import { CanonicalTag } from "@/components/CanonicalTag";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-cormorant" });

export const metadata: Metadata = {
  title: "The Blissful Station | Trusted Therapist in Lucknow",
  description: "Looking for a Psychologist in Lucknow? The Blissful Station provides expert, ethical clinical counseling in Lucknow for depression, anxiety, and more.",
  keywords: ["Therapist in Lucknow", "Psychologist in Lucknow", "Clinical Counseling in Lucknow", "Mental Healthcare Lucknow", "The Blissful Station"],
  icons: {
    icon: '/assets/iconLogo.jpeg',
    apple: '/assets/iconLogo.jpeg',
  },
  openGraph: {
    title: "The Blissful Station | Trusted Therapist in Lucknow",
    description: "Expert, ethical clinical counseling in Lucknow. Dedicated to your mental wellbeing.",
    url: "https://theblissfulstation.com",
    siteName: "The Blissful Station",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Blissful Station | Trusted Therapist in Lucknow",
    description: "Expert, ethical clinical counseling in Lucknow for depression, anxiety, and more.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <CanonicalTag />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalBusiness",
              "name": "The Blissful Station",
              "image": "https://theblissfulstation.com/assets/logo.webp",
              "@id": "https://theblissfulstation.com",
              "url": "https://theblissfulstation.com",
              "telephone": "+919793743769",
              "priceRange": "$$",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Vikalp Khand, Jheel Road, Kathauta Jheel, Gomti Nagar",
                "addressLocality": "Lucknow",
                "postalCode": "226010",
                "addressRegion": "UP",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 26.8667,
                "longitude": 80.9333
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday"
                ],
                "opens": "10:00",
                "closes": "20:00"
              },
              "sameAs": [
                "https://www.instagram.com/theblissfulstation/"
              ]
            }),
          }}
        />
      </head>
      <body className={`${outfit.variable} ${cormorant.variable} antialiased`}>
        <Navbar />
        {children}
        <Footer />
        <WhatsAppWidget />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ""} />
      </body>
    </html>
  );
}
