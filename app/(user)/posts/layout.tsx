import Footer from "@/components/navigation/Footer";
import Navbar from "@/components/navigation/Navbar";

export default async function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-auto w-screen">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
