import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Veldbrand Radio — Dis mos radio",
  description:
    "Luister regstreeks na Veldbrand Radio. Ontdek ons programme en bly deel van die Veldbrand-gemeenskap.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Veldbrand Radio",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0908",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="af" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="bg-veld-black text-veld-cream antialiased">
        {children}
      </body>
    </html>
  );
}