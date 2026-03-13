import type { Metadata } from "next";
import { Space_Grotesk, Manrope } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Encrypt | Confidential Execution for Solana",
  description:
    "Encrypt brings confidential execution to Solana through RE-FHE and FHE-TLS, enabling private DeFi, sealed auctions, encrypted AI inference, and trustless data access without compromising speed or composability.",
  keywords: [
    "Encrypt",
    "FHE",
    "Fully Homomorphic Encryption",
    "Solana",
    "Confidential Execution",
    "RE-FHE",
    "FHE-TLS",
    "Private DeFi",
    "Web3 Privacy",
  ],
  openGraph: {
    title: "Encrypt | Confidential Execution for Solana",
    description:
      "Encrypt brings confidential execution to Solana through RE-FHE and FHE-TLS, enabling private DeFi, sealed auctions, encrypted AI inference, and trustless data access.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Encrypt | Confidential Execution for Solana",
    description:
      "Confidential execution for Solana. Private DeFi, sealed auctions, encrypted AI inference.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${manrope.variable} font-body antialiased`}
      >
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
