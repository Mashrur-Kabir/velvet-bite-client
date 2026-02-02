import { getMyOrdersAction } from "@/actions/customer.action";
import UpdateOrderFormClient from "./UpdateOrderFormClient";
import { Truck } from "lucide-react";

export default async function UpdateOrderFormServer() {
  const { data: orders } = await getMyOrdersAction();

  // Customers can only "update" (cancel) orders that are still in PLACED status
  const cancelableOrders = orders?.filter((o) => o.status === "PLACED") || [];

  return (
    <div className="space-y-6 border-2 border-cream/60 p-14 rounded-2xl">
      <div className="flex items-center gap-3 px-2">
        <Truck className="size-5 text-caramel" />
        <h2 className="font-serif text-2xl font-bold text-cream">Order:</h2>
      </div>

      {cancelableOrders.length > 0 ? (
        <div className="grid gap-4">
          {cancelableOrders.map((order) => (
            <UpdateOrderFormClient key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <p className="text-cream/20 italic text-sm px-2">
          No cancelable orders found.
        </p>
      )}
    </div>
  );
}
