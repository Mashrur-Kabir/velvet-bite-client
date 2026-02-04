import Link from "next/link";
import LegalPage from "./LegalLayout";
import { ChevronLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" lastUpdated="February 04, 2026">
      <section className="space-y-6">
        <h2 className="text-cream font-serif">1. Menu Pricing</h2>
        <p>
          By placing an order, you agree to the “Pricing” listed. All
          transactions are final once your orders reach the preparation stage.
        </p>

        <h2 className="text-cream font-serif">2. Delivery Logistics</h2>
        <p>
          Users must provide precise “Drop Point” locations. Failure to provide
          accurate address may result in order cancellation without refund under
          our Velvet Protocol.
        </p>

        <h2 className="text-cream font-serif">3. Provider Conduct</h2>
        <p>
          Our Master Kitchens are independent artisans. While we audit for
          quality, the provider is responsible for the artisanal integrity of
          the specific meal.
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
