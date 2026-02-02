import { providerService } from "@/services/providerServices/provider.service";
import UpdateOrderFormClient from "./UpdateOrderFormClient";

export default async function UpdateOrderFormServer({
  orderId,
}: {
  orderId: string;
}) {
  // Fetch order details to provide context in the update form
  const { data: order } = await providerService.getOrderById(orderId);

  if (!order) {
    return (
      <div className="text-center py-20">
        <p className="text-cream/40 italic">Order transmission not found.</p>
      </div>
    );
  }

  return <UpdateOrderFormClient order={order} />;
}
