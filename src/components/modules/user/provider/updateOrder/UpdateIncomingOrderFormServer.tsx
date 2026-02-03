import { providerService } from "@/services/providerServices/provider.service";
import UpdateIncomingOrderFormClient from "./UpdateIncomingOrderFormClient";

export default async function UpdateIncomingOrderFormServer({
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

  return <UpdateIncomingOrderFormClient order={order} />;
}
