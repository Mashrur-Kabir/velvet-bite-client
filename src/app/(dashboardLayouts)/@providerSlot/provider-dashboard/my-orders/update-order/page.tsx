import UpdateIncomingOrderFormServer from "@/components/modules/user/provider/updateOrder/UpdateIncomingOrderFormServer";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

// Next.js 15+ searchParams are asynchronous
export default async function UpdateOrderPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId: string }>;
}) {
  const { orderId } = await searchParams;

  return (
    <div className="max-w-4xl mx-auto py-16 px-6 space-y-12">
      <header className="space-y-4">
        <Link
          href="/provider-dashboard/my-orders"
          className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-[0.2em] text-primary/60 hover:text-primary transition-colors"
        >
          <ChevronLeft size={14} /> Back to orders
        </Link>
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-cream tracking-tight">
            Update <span className="text-primary italic">Protocol</span>
          </h1>
          <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold opacity-60">
            Adjust the operational status of this culinary transmission.
          </p>
        </div>
      </header>

      {/* 2. Calling the Server Component here solves the blank page issue */}
      <UpdateIncomingOrderFormServer orderId={orderId} />
    </div>
  );
}
