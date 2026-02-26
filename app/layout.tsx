import type { Metadata } from "next";
import { 
  Geist, 
  Geist_Mono, 
  Space_Mono, 
  Bungee_Shade, 
  Rubik_Glitch, 
  Special_Elite, 
  Permanent_Marker, 
  Rock_Salt 
} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  variable: "--font-space-mono",
  subsets: ["latin"],
});

const bungeeShade = Bungee_Shade({
  weight: '400',
  variable: "--font-bungee-shade",
  subsets: ["latin"],
});

const rubikGlitch = Rubik_Glitch({
  weight: '400',
  variable: "--font-rubik-glitch",
  subsets: ["latin"],
});

const specialElite = Special_Elite({
  weight: '400',
  variable: "--font-special-elite",
  subsets: ["latin"],
});

const permanentMarker = Permanent_Marker({
  weight: '400',
  variable: "--font-permanent-marker",
  subsets: ["latin"],
});

const rockSalt = Rock_Salt({
  weight: '400',
  variable: "--font-rock-salt",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TastePrint - Your Sonic Manifesto",
  description: "Transform your Spotify listening history into a visceral, DIY zine of your musical DNA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          ${spaceMono.variable} 
          ${bungeeShade.variable} 
          ${rubikGlitch.variable} 
          ${specialElite.variable} 
          ${permanentMarker.variable} 
          ${rockSalt.variable} 
          antialiased
        `}
      >
        {children}
      </body>
    </html>
  );
}
