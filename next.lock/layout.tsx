import Footer from "@/components/navigation/Footer";
import Navbar from "@/components/navigation/Navbar";

export default async function LibraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-screen h-screen bg-gray-200">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
