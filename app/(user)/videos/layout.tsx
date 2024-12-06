import Footer from "@/components/navigation/Footer";
import Navbar from "@/components/navigation/Navbar";
import { Suspense } from "react";

export default async function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-auto w-screen flex-col bg-gray-200">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
