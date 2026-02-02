import CustomerDashboard from "@/components/modules/user/customer/CustomerDashboard";
import { getMyOrdersAction } from "@/actions/customer.action";
import { customerService } from "@/services/customerServices/customer.service";
import { publicService } from "@/services/publicServices/public.service";
import { userService } from "@/services/userServices/user.service";

export default async function CustomerDashboardPage() {
  // Parallel Fetch: Fetching all required data simultaneously for speed
  const [sessionRes, ordersRes, reviewsRes, providersRes] = await Promise.all([
    userService.getSession(),
    getMyOrdersAction(),
    customerService.getMyReviews(),
    publicService.getProviders(),
  ]);

  return (
    <CustomerDashboard
      user={sessionRes.data?.user || null}
      orders={ordersRes.data || []}
      reviews={reviewsRes.data || []}
      providers={providersRes.data || []}
    />
  );
}
