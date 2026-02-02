import UpdateOrderFormServer from "@/components/modules/user/customer/updateProfile/updateOrder/UpdateOrderFormServer";
import { ArrowLeft, PackageX } from "lucide-react";
import Link from "next/link";

export default async function UpdateOrderPage() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-6 space-y-12">
      {/* 1. NAVIGATION: Return to the main cravings list */}
      <Link
        href="/dashboard/my-orders"
        className="group flex items-center gap-2 w-fit text-[10px] uppercase tracking-[0.3em] font-bold text-caramel/40 hover:text-caramel transition-colors"
      >
        <ArrowLeft
          size={14}
          className="group-hover:-translate-x-1 transition-transform"
        />
        Back to Cravings
      </Link>

      {/* 2. HEADER: Contextual information for the management hub */}
      <header className="space-y-3">
        <div className="flex items-center gap-3">
          <PackageX className="size-6 text-caramel" />
          <h1 className="text-4xl font-serif font-bold text-cream">
            Manage <span className="text-accent italic">Orders</span>
          </h1>
        </div>
        <p className="text-cream/40 text-[10px] uppercase tracking-[0.2em] font-bold">
          Delete active orders before they enter the preparation stage.
        </p>
      </header>

      {/* 3. PERFORMANCE: Calling the Server Component directly */}
      {/* This component handles fetching all PLACED orders and mapping them to client buttons */}
      <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <UpdateOrderFormServer />
      </section>

      {/* 4. FOOTER: Brand consistency */}
      <footer className="pt-12 border-caramel/5 flex justify-center">
        <p className="text-[9px] text-cream/10 uppercase tracking-[0.6em] font-bold">
          Velvet Kitchen Security Protocol v2.0
        </p>
      </footer>
    </div>
  );
}
