import Navbar from "@/components/navigation/Navbar";

export default async function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="black min-h-screen w-screen">
      <Navbar />
      {children}
    </div>
  );
}
