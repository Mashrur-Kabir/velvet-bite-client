import Link from "next/link";
import LegalPage from "./LegalLayout";
import { ChevronLeft } from "lucide-react";

export default function CookiesPage() {
  return (
    <LegalPage title="Cookie Architecture" lastUpdated="February 04, 2026">
      <section className="space-y-6">
        <h2 className="text-cream font-serif">1. Taste Memory</h2>
        <p>
          We use //“Taste Memory//” (essential cookies) to keep your session
          active and preserve your kitchen selections as you navigate the menus
          and orders.
        </p>

        <h2 className="text-cream font-serif">2. Performance Tracking</h2>
        <p>
          Subtle analytical cookies help us understand which culinary categories
          are trending, allowing us to refine the platform&apos;s velvet
          experience.
        </p>

        <h2 className="text-cream font-serif">3. User Control</h2>
        <p>
          You may disable cookies in your browser settings, though this may
          degrade the smoothness of the Velvet Bite interface.
        </p>
      </section>
      <Link
        href="/"
        className="inline-flex items-center gap-2 my-12 text-[12px] uppercase font-bold tracking-[0.3em] text-cream/40 hover:text-cream transition-all duration-300 group animate-metadata"
      >
        <ChevronLeft
          size={20}
          className="group-hover:-translate-x-1 transition-transform"
        />
        Return Home
      </Link>
    </LegalPage>
  );
}
