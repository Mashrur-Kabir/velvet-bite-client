import { getProviderOrdersAction } from "@/actions/provider.action";
import { cn } from "@/lib/utils";
import { Clock, Eye, ShoppingBag, ShieldAlert } from "lucide-react"; // Added ShieldAlert
import Link from "next/link";

export default async function MyOrdersPage() {
  const { data: orders } = await getProviderOrdersAction();

  const statusStyles: Record<string, string> = {
    // Amber: Signals a new, incoming request
    PLACED: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    // Teal: Represents active culinary craft
    PREPARING: "bg-teal-500/10 text-teal-500 border-teal-500/20",
    // Violet: The "Hero" color for a finished masterpiece
    READY: "bg-violet-500/10 text-violet-500 border-violet-500/20",
    // Emerald: Solid green for successful arrival
    DELIVERED: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    // Rose: Subtle red for a halted process
    CANCELLED: "bg-rose-500/10 text-rose-500 border-rose-500/20",
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12 py-16 px-6">
      <header className="space-y-2">
        <h1 className="text-5xl font-serif font-bold text-cream tracking-tight">
          Active <span className="text-primary italic">Orders</span>
        </h1>
        <p className="text-muted-foreground uppercase tracking-[0.4em] text-[10px] font-bold">
          Incoming orders to be responded to
        </p>
      </header>

      {/* --- CONDITIONAL RENDERING --- */}
      {orders && orders.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="group bg-card/40 border border-border/20 rounded-[2rem] p-6 flex flex-col md:flex-row justify-between items-center hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5"
            >
              <div className="flex items-center gap-6">
                <div className="size-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <ShoppingBag className="text-primary" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-cream">
                    Order #{order.id.slice(-6).toUpperCase()}
                  </h4>
                  <div className="flex items-center gap-3 text-[10px] uppercase font-bold tracking-widest mt-1">
                    <span
                      className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all duration-300",
                        statusStyles[order.status] ||
                          "bg-primary/10 text-primary border-primary/20",
                      )}
                    >
                      {order.status}
                    </span>
                    <span className="text-cream/20">|</span>
                    <span className="text-cream/40 flex items-center gap-1">
                      <Clock size={10} />{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-8 mt-6 md:mt-0">
                <div className="text-right">
                  <p className="text-[10px] text-cream/40 uppercase font-bold tracking-widest">
                    Amount
                  </p>
                  <p className="text-xl font-bold text-primary">
                    ${order.totalAmount.toFixed(2)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/provider-dashboard/my-orders/${order.id}`}
                    className="p-4 rounded-2xl bg-background/50 border border-border/20 text-cream/60 hover:text-primary hover:border-primary/40 transition-all"
                  >
                    <Eye size={18} />
                  </Link>
                  <Link
                    href={`/provider-dashboard/my-orders/update-order?orderId=${order.id}`}
                    className="px-4 pt-5 rounded-2xl bg-primary text-primary-foreground font-bold uppercase tracking-widest text-[10px] hover:bg-accent hover:text-cream transition-all"
                  >
                    Update Status
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* --- EMPTY STATE PLACEHOLDER --- */
        <div className="py-32 px-6 rounded-[3rem] border border-dashed border-border/40 flex flex-col items-center justify-center text-center bg-card/10 backdrop-blur-sm group transition-all duration-700 hover:bg-card/20 hover:border-primary/20">
          <div className="size-24 rounded-full bg-background/50 border border-border/20 flex items-center justify-center mb-8 shadow-2xl group-hover:scale-110 transition-transform duration-500">
            <ShieldAlert className="size-10 text-muted-foreground/20 group-hover:text-primary/40 transition-colors" />
          </div>
          <div className="space-y-3">
            <h3 className="text-2xl font-serif font-bold text-cream">
              The queue is quiet.
            </h3>
            <p className="text-muted-foreground max-w-sm mx-auto italic">
              No recent order have been called for your kitchen. Placed orders
              will be displayed here.
            </p>
          </div>
          <Link
            href="/provider-dashboard"
            className="mt-10 px-8 py-3 rounded-full border border-primary/20 text-[10px] font-bold uppercase tracking-[0.3em] text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-500"
          >
            Return to dashboard
          </Link>
        </div>
      )}
    </div>
  );
}
