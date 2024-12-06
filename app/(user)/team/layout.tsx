import Footer from "@/components/navigation/Footer";
import Navbar from "@/components/navigation/Navbar";

export default async function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-200">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
