import { getAllOrdersAction } from "@/actions/admin.action";
import AllOrdersClientWrapper from "@/components/modules/user/admin/orders/AllOrdersClientWrapper";
import { LayoutList } from "lucide-react";

export default async function AllOrdersPage() {
  // 1. Fetch data on the server for zero-latency rendering
  const { data } = await getAllOrdersAction();

  // 2. Perform sorting on the server to reduce client-side processing
  const orders = data
    ? [...data].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
    : [];

  return (
    <div className="max-w-7xl mx-auto py-16 px-6 space-y-12">
      <header className="space-y-2">
        <div className="flex items-center gap-3">
          <LayoutList className="text-primary size-8" />
          <h1 className="text-5xl font-serif font-bold text-cream tracking-tight">
            Velvet <span className="text-primary italic">Orders</span>
          </h1>
        </div>
        <p className="text-muted-foreground uppercase tracking-[0.4em] text-[10px] font-bold opacity-60">
          Platform-wide logistics orchestration
        </p>
      </header>

      {/* 3. Pass the pre-sorted data to a client wrapper for animations */}
      <AllOrdersClientWrapper orders={orders} />
    </div>
  );
}
