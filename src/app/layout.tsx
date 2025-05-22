// src/app/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import { SessionProvider } from "../utils/supabase/usercontext";
import { Toaster } from "@/components/ui/sonner";
import SplashCursor from "@/components/ui/splash-cursor";
import Particles from "@/components/ui/Particles";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HachathonHub - Federated Medical AI",
  description: "Privacy-preserving collaborative machine learning for healthcare",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SplashCursor />
        <div className="relative z-10">
          <SessionProvider>
            <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
              <Particles
                particleColors={['#ffffff', '#ffffff']}
                particleCount={200}
                particleSpread={10}
                speed={0.1}
                particleBaseSize={100}
                moveParticlesOnHover={true}
                alphaParticles={false}
                disableRotation={false}
                className="particles-background"
              />
              {children}
            </div>
          </SessionProvider>
        </div>
        <Toaster />
      </body>
    </html>
  );
}