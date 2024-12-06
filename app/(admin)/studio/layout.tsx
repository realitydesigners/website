export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="absolute z-[10000] h-full w-screen">{children}</div>;
}
