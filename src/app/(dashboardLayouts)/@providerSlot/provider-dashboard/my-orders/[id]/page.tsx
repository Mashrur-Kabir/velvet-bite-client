import { getOrderByIdAction } from "@/actions/provider.action";
import OrderCard from "@/components/modules/user/provider/OrderCard";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: order } = await getOrderByIdAction(id);

  if (!order)
    return (
      <div className="text-center py-20 text-cream/20 italic">
        Order not found.
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto py-16 space-y-8">
      <Link
        href="/provider-dashboard/my-orders"
        className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-primary/60 hover:text-primary transition-colors"
      >
        <ArrowLeft size={14} /> Back to Orders
      </Link>
      <OrderCard order={order} />
    </div>
  );
}
