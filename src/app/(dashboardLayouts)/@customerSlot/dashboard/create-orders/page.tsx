import CreateOrderFormServer from "@/components/modules/user/customer/createOrder/CreateOrderFormServer";
import { customerService } from "@/services/customerServices/customer.service";
import { publicService } from "@/services/publicServices/public.service";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, ReceiptText } from "lucide-react";

export default async function CreateOrdersPage() {
  // 1. Parallel Data Fetching: Retrieve all necessary context for the order form
  const [providersRes, mealsRes, ordersRes] = await Promise.all([
    publicService.getProviders(),
    publicService.getMeals({ limit: 100 }), // Get all meals to populate the selector
    customerService.getMyOrders(),
  ]);

  const providers = providersRes.data || [];
  const allMeals = mealsRes.data || [];
  const orders = ordersRes.data || [];

  return (
    <div className="max-w-5xl mx-auto space-y-16 pb-20">
      {/* 2. Order Creation Module */}
      <CreateOrderFormServer providers={providers} allMeals={allMeals} />

      {/* 3. Recent Activity Section: Minimalist Ledger */}
      <div
        className="animate-metadata space-y-8"
        style={{ animationDelay: "0.8s" }}
      >
        <div className="flex items-center justify-between border-b border-caramel/10 pb-6">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-caramel/10 flex items-center justify-center text-caramel">
              <ReceiptText size={20} />
            </div>
            <h2 className="text-2xl font-serif font-bold text-cream">
              Recent <span className="text-caramel italic">Records</span>
            </h2>
          </div>
        </div>

        <div className="space-y-4">
          {orders.length > 0 ? (
            orders.slice(0, 5).map((order, idx) => (
              <div
                key={order.id}
                className="group relative p-6 bg-[#2D1B16]/20 border border-caramel/5 rounded-[2rem] flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-500 hover:border-caramel/30 hover:bg-[#2D1B16]/40 overflow-hidden"
              >
                {/* Visual Accent */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-caramel/0 group-hover:bg-caramel transition-all duration-500" />

                <div className="flex items-start gap-5">
                  <div className="size-12 rounded-2xl bg-black/20 flex flex-col items-center justify-center text-caramel border border-caramel/5">
                    <Clock size={18} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] text-caramel/60 font-mono tracking-tighter">
                      REF_ID: {order.id.split("-")[0].toUpperCase()}
                    </p>
                    <div className="flex items-center gap-2 text-cream font-medium italic">
                      <MapPin size={12} className="text-caramel/40" />
                      <span className="truncate max-w-[200px] md:max-w-md">
                        {order.deliveryAddress}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 self-end md:self-auto">
                  <div className="text-right">
                    <p className="text-[10px] uppercase text-caramel/40 font-bold">
                      Total
                    </p>
                    <p className="text-cream font-bold">${order.totalAmount}</p>
                  </div>
                  <Badge className="bg-caramel/10 text-caramel border border-caramel/20 uppercase text-[10px] px-4 py-1.5 rounded-full tracking-widest font-bold">
                    {order.status}
                  </Badge>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 rounded-[2rem] border border-dashed border-caramel/10 flex flex-col items-center justify-center text-center bg-black/5">
              <ReceiptText className="size-12 text-caramel/10 mb-4" />
              <p className="text-muted-foreground italic text-sm">
                Nothing here...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
