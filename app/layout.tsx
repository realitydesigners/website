import { space } from "@/fonts";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
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
    <html lang="en" className={`${space.className}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="bg-black">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
