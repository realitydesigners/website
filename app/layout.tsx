import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { russo, oxanium, outfit, kodemono } from "./fonts";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import "./global.css";

export const metadata: Metadata = {
  title: "Reality Designers",
  description:
    "Reality Designers is a collective of artists, designers, and engineers who are building the next generation of immersive experiences.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${kodemono.variable}  ${outfit.variable}  ${russo.variable}  ${oxanium.variable}  `}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="bg-black">
        <Navbar />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
