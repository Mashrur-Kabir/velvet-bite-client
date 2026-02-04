import {
  getMyProviderAction,
  getProviderOrdersAction,
} from "@/actions/provider.action";
import CreateProviderFormServer from "@/components/modules/user/provider/createProvider/CreateProviderFormServer";
import {
  ChefHat,
  UtensilsCrossed,
  TrendingUp,
  ShoppingBag,
  DollarSign,
  ArrowRight,
  Activity,
  BarChart3,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ProviderCardDashboard from "@/components/modules/user/provider/ProviderCardDashboard";
import Link from "next/link";
import { format } from "date-fns";

export default async function ProviderDashboardPage() {
  // 1. Parallel Data Acquisition
  const [providerRes, ordersRes] = await Promise.all([
    getMyProviderAction(),
    getProviderOrdersAction(),
  ]);

  const provider = providerRes.data;
  const orders = ordersRes.data || [];

  // Onboarding Flow: If no provider profile exists
  if (!provider) {
    return (
      <div className="max-w-4xl mx-auto pb-24 pt-5 px-6 min-h-[80vh] flex flex-col justify-center">
        <header className="text-center space-y-6 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="size-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto border border-primary/20 shadow-2xl shadow-primary/5">
            <ChefHat className="text-primary size-10" />
          </div>
          <div className="space-y-2">
            <h1 className="text-5xl font-serif font-bold text-cream tracking-tight">
              Establish Your{" "}
              <span className="text-primary italic">Kitchen</span>
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto text-lg">
              Launch your professional culinary presence and start serving the
              community.
            </p>
          </div>
        </header>
        <CreateProviderFormServer />
      </div>
    );
  }

  // 2. Dynamic Metric Calculation
  const activeOrders = orders.filter(
    (o) =>
      o.status === "PLACED" || o.status === "PREPARING" || o.status === "READY",
  );

  const totalRevenue = orders
    .filter((o) => o.status === "DELIVERED")
    .reduce((acc, curr) => acc + curr.totalAmount, 0);

  const stats = [
    {
      label: "Active Orders",
      value: activeOrders.length.toString(),
      icon: ShoppingBag,
      color: "text-amber-500",
    },
    {
      label: "Total Revenue",
      value: `$${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      icon: DollarSign,
      color: "text-emerald-500",
    },
    {
      label: "Kitchen Status",
      value: provider.isActive ? "Online" : "Paused",
      icon: TrendingUp,
      color: provider.isActive ? "text-primary" : "text-rose-500",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-20 px-6">
      {/* --- HERO SECTION --- */}
      <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8 mt-16 p-10 rounded-[3.5rem] bg-gradient-to-br from-card/80 to-background border border-border/50 relative overflow-hidden shadow-premium-dark">
        <div className="relative z-10 space-y-4">
          <div className="space-y-1">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-cream tracking-tighter">
              Kitchen <span className="text-primary italic">Command</span>
            </h1>
            <p className="text-muted-foreground uppercase tracking-[0.4em] text-[10px] font-bold opacity-70">
              Provider oversight for {provider.name}
            </p>
          </div>

          {/* Quick Availability Status */}
          <div className="flex items-center gap-3">
            <div
              className={`size-2 rounded-full animate-pulse ${provider.isActive ? "bg-emerald-500" : "bg-rose-500"}`}
            />
            <span className="text-[10px] uppercase font-bold tracking-widest text-cream/40">
              Order Protocol:{" "}
              {provider.isActive ? "Accepting Incoming" : "Kitchen Paused"}
            </span>
          </div>
        </div>

        <div className="w-full xl:w-auto relative z-10">
          <ProviderCardDashboard provider={provider} />
        </div>

        <ChefHat className="absolute -right-12 -bottom-12 size-64 text-primary/5 -rotate-12 pointer-events-none" />
      </header>

      {/* --- QUICK STATS RIBBON --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <Card
            key={i}
            className="bg-card border-border/40 hover:border-primary/30 transition-all duration-500 group rounded-[2.5rem] overflow-hidden"
          >
            <CardContent className="p-8 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
                  {stat.label}
                </p>
                <h3 className="text-3xl font-bold text-cream group-hover:text-primary transition-colors leading-none">
                  {stat.value}
                </h3>
              </div>
              <div
                className={`p-4 rounded-2xl bg-background/50 border border-border/20 ${stat.color} shadow-inner`}
              >
                <stat.icon size={24} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* --- MAIN OPERATIONS GRID --- */}
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Operation Center */}
        <div className="lg:col-span-8 space-y-8">
          <section className="space-y-6">
            <div className="flex items-center justify-between px-4">
              <div className="flex items-center gap-3">
                <Activity size={20} className="text-primary" />
                <h2 className="font-serif text-2xl font-bold text-cream">
                  Order Queue:
                </h2>
              </div>
              <Link
                href="/provider-dashboard/my-orders"
                className="text-[10px] uppercase font-bold tracking-[0.2em] text-primary/60 hover:text-primary transition-colors flex items-center gap-2"
              >
                Manage All <ArrowRight size={12} />
              </Link>
            </div>

            {activeOrders.length > 0 ? (
              <div className="space-y-4">
                {activeOrders.slice(0, 4).map((order) => (
                  <div
                    key={order.id}
                    className="p-6 bg-card/40 border border-border/20 rounded-[2.2rem] flex justify-between items-center group hover:border-primary/40 transition-all duration-500 backdrop-blur-lg"
                  >
                    <div className="flex items-center gap-6">
                      <div className="size-14 rounded-2xl bg-background/50 flex items-center justify-center border border-border/10 shadow-lg">
                        <ShoppingBag className="text-primary/60" size={20} />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <p className="text-xs font-bold text-cream uppercase tracking-widest">
                            Order #{order.id.slice(-6).toUpperCase()}
                          </p>
                          <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-500 text-[8px] font-black uppercase tracking-tighter border border-amber-500/20">
                            {order.status}
                          </span>
                        </div>
                        <p className="text-[10px] text-muted-foreground italic">
                          {format(new Date(order.createdAt), "hh:mm a")} •{" "}
                          {order.deliveryAddress.split(",")[0]}
                        </p>
                      </div>
                    </div>
                    <Link
                      href={`/provider-dashboard/my-orders/update-order?orderId=${order.id}`}
                      className="size-12 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary/40 group-hover:text-primary group-hover:bg-primary/10 group-hover:border-primary/20 transition-all active:scale-90"
                    >
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="min-h-[400px] rounded-[3.5rem] border border-dashed border-border/60 bg-card/20 flex flex-col items-center justify-center text-center p-12 group hover:bg-card/30 transition-all duration-700">
                <UtensilsCrossed className="size-10 text-muted-foreground/20 mb-6 group-hover:scale-110 transition-transform" />
                <p className="font-serif italic text-xl text-cream/30 max-w-xs leading-relaxed">
                  Your kitchen is currently quiet. Re-sync your menu to start
                  receiving orders.
                </p>
              </div>
            )}
          </section>
        </div>

        {/* Right: Sidebar Insights */}
        <aside className="lg:col-span-4 space-y-8">
          <section className="space-y-6">
            <div className="flex items-center gap-3 px-4">
              <BarChart3 size={20} className="text-primary" />
              <h2 className="font-serif text-2xl font-bold text-cream">
                Insights:
              </h2>
            </div>

            <Card className="bg-card/40 border-border/40 rounded-[2.5rem] p-8 space-y-8 backdrop-blur-md">
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/5 pb-6">
                  <span className="text-[10px] uppercase font-bold text-cream/40 tracking-widest">
                    Gross Sales
                  </span>
                  <span className="text-xl font-bold text-emerald-500">
                    ${totalRevenue.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center border-b border-white/5 pb-6">
                  <span className="text-[10px] uppercase font-bold text-cream/40 tracking-widest">
                    Order Count
                  </span>
                  <span className="text-xl font-bold text-cream">
                    {orders.length}
                  </span>
                </div>

                <div className="flex justify-between items-center border-b border-white/5 pb-6">
                  <span className="text-[10px] uppercase font-bold text-cream/40 tracking-widest">
                    Avg. Order
                  </span>
                  <span className="text-xl font-bold text-primary">
                    $
                    {orders.length > 0
                      ? (totalRevenue / orders.length).toFixed(2)
                      : "0.00"}
                  </span>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-background/40 border border-border/20 transition-all duration-500 ease-out hover:scale-[1.03] hover:border-cream will-change-transform [backface-visibility:hidden] [transform:translateZ(0)]">
                <p className="text-[12px] text-cream/80 italic text-center leading-relaxed cursor-pointer antialiased">
                  Metrics are synchronized in real-time as your kitchen
                  processes orders.
                </p>
              </div>
            </Card>
          </section>
        </aside>
      </main>
    </div>
  );
}
