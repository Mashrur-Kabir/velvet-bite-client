import MyOrdersComponent from "@/components/modules/user/customer/MyOrders";
import { getMyOrdersAction } from "@/actions/customer.action";
import { publicService } from "@/services/publicServices/public.service";

export default async function OrderPage() {
  // Parallel fetch: Orders and Providers
  const [ordersRes, providersRes] = await Promise.all([
    getMyOrdersAction(),
    publicService.getProviders(),
  ]);

  return (
    <div>
      <MyOrdersComponent
        initialOrders={ordersRes.data || []}
        providers={providersRes.data || []}
      />
      {ordersRes.error && (
        <p className="text-destructive text-center mt-4">
          {ordersRes.error.message}
        </p>
      )}
    </div>
  );
}
