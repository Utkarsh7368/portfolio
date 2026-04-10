import type { Metadata } from "next";
import { Space_Grotesk, Fira_Code, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  weight: ["300", "400", "500", "600", "700"],
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira",
  weight: ["400", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Utkarsh Gupta — Full Stack Developer & UI Engineer",
  description:
    "Portfolio of Utkarsh Gupta — a passionate full-stack developer crafting immersive web experiences with React, Next.js, and modern technologies.",
  keywords: [
    "Utkarsh Gupta",
    "Full Stack Developer",
    "React Developer",
    "Portfolio",
    "Web Developer India",
    "Next.js",
    "UI Engineer",
  ],
  authors: [{ name: "Utkarsh Gupta" }],
  creator: "Utkarsh Gupta",
  openGraph: {
    title: "Utkarsh Gupta — Full Stack Developer",
    description:
      "Crafting immersive digital experiences with code and creativity.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Utkarsh Gupta — Full Stack Developer",
    description:
      "Crafting immersive digital experiences with code and creativity.",
  },
};

import { SmoothScroll } from "@/components/ui/smooth-scroll";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${firaCode.variable} ${inter.variable} font-sans antialiased bg-black text-white overflow-x-hidden`}
        suppressHydrationWarning
      >
        <div className="relative min-h-screen">
          <SmoothScroll>{children}</SmoothScroll>
        </div>
      </body>
    </html>
  );
}
