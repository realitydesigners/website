import Footer from "@/components/navigation/Footer";
import Navbar from "@/components/navigation/Navbar";

export default async function GlossaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-screen h-auto s">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
