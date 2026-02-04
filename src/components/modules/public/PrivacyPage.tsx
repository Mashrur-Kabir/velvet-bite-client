import Link from "next/link";
import LegalPage from "./LegalLayout";
import { ChevronLeft } from "lucide-react";

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Protocol" lastUpdated="February 04, 2026">
      <section className="space-y-6">
        <h2 className="text-cream font-serif">1. Data Encryption</h2>
        <p>
          Your culinary preferences and personal identity are protected under
          the
          <strong> Velvet Protocol</strong>. We encrypt all sensitive
          transmission data to ensure your “Taste Profile” remains exclusive to
          you.
        </p>

        <h2 className="text-cream font-serif">2. Information Collection</h2>
        <p>
          We collect data necessary for order orchestration, including delivery
          coordinates and interaction history with our Master Kitchens.
        </p>

        <h2 className="text-cream font-serif">3. Third-Party Access</h2>
        <p>
          We do not trade your data. Information is only shared with authorized
          Providers to fulfill your specific culinary investments.
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
