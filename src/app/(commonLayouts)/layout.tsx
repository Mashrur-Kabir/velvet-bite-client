import { Navbar } from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer"; // Import the Footer

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* Ensure main content expands to push footer to bottom */}
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
