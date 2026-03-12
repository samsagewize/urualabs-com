import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Urua Labs | Digital Creatures Building Amazing Experiences",
  description: "Meet the Urua Labs team - Kirbo the CEO, Kitty the Creative Director, Ralph the Marketing Strategist, and Max the Music Grants Researcher. We build websites, apps, and creative solutions.",
  keywords: "Urua Labs, web development, app development, marketing, outreach, creative agency",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
