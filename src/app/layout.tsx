import type { Metadata } from "next";
import { Outfit, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-cormorant" });

export const metadata: Metadata = {
  title: "The Blissful Station | Trusted Therapist in Lucknow",
  description: "Looking for a Psychologist in Lucknow? The Blissful Station provides expert, ethical clinical counseling in Lucknow for depression, anxiety, and more.",
  keywords: ["Therapist in Lucknow", "Psychologist in Lucknow", "Clinical Counseling in Lucknow", "Mental Healthcare Lucknow", "The Blissful Station"],
  openGraph: {
    title: "The Blissful Station | Trusted Therapist in Lucknow",
    description: "Expert, ethical clinical counseling in Lucknow. Dedicated to your mental wellbeing.",
    url: "https://theblissfulstation.in",
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
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className={`${outfit.variable} ${cormorant.variable} antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
