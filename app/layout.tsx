import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { NextProvider } from "./provider/nextuiproviders";
import { RDKitModule } from "@rdkit/rdkit";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Biolysis",
  description: "All in one AI platform for Chemist/Microbiologist",
};

declare global {
  interface Window {
      RDKits: RDKitModule
  }
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextProvider>
          {children}
        </NextProvider>
      </body>
    </html>
  );
}
