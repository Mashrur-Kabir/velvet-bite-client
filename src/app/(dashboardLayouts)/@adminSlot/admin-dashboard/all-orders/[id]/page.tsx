import { getAdminOrderByIdAction } from "@/actions/admin.action";
import OrderCard from "@/components/modules/user/admin/orders/OrderCard";
import { ChevronLeft, LayoutList } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: order } = await getAdminOrderByIdAction(id);

  if (!order) {
    return notFound();
  }

  return (
    <div className="max-w-6xl mx-auto py-16 px-6 space-y-12">
      <header className="space-y-4">
        <Link
          href="/admin-dashboard/all-orders"
          className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-[0.2em] text-primary/60 hover:text-primary transition-colors"
        >
          <ChevronLeft size={14} /> Back to Orders
        </Link>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <LayoutList className="text-primary size-8" />
            <h1 className="text-5xl font-serif font-bold text-cream tracking-tight">
              Order <span className="text-primary italic">Forensics</span>
            </h1>
          </div>
          <p className="text-muted-foreground text-[10px] uppercase tracking-[0.4em] font-bold opacity-60">
            Single order tracking
          </p>
        </div>
      </header>

      {/* Forensic Detail Component */}
      <OrderCard order={order} />
    </div>
  );
}
