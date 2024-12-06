import Footer from "@/components/navigation/Footer";
import Navbar from "@/components/navigation/Navbar";

export default async function AgencyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-black">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
