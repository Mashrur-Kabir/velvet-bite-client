import { getMyProviderAction } from "@/actions/provider.action";
import CreateProviderFormServer from "@/components/modules/user/provider/createProvider/CreateProviderFormServer";
import ProviderProfileCard from "@/components/modules/user/provider/ProviderProfileCard";
import {
  ChefHat,
  UtensilsCrossed,
  TrendingUp,
  ShoppingBag,
  DollarSign,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default async function ProviderDashboardPage() {
  const { data: provider } = await getMyProviderAction();

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

  // Active Provider Dashboard Layout
  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-20 px-6">
      {/* --- HERO SECTION --- */}
      <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8 mt-16 p-10 rounded-[3rem] bg-gradient-to-br from-card/80 to-background border border-border/50 relative overflow-hidden shadow-premium-dark">
        <div className="relative z-10 space-y-2">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-cream tracking-tighter">
            Kitchen <span className="text-primary italic">Command</span>
          </h1>
          <p className="text-muted-foreground uppercase tracking-[0.4em] text-[10px] font-bold opacity-70">
            Strategic Oversight for {provider.name}
          </p>
        </div>

        {/* Profile Card integrated as a floating element */}
        <div className="w-full xl:w-auto">
          <ProviderProfileCard provider={provider} />
        </div>

        {/* Ambient Background Element */}
        <ChefHat className="absolute -right-12 -bottom-12 size-64 text-primary/5 -rotate-12 pointer-events-none" />
      </header>

      {/* --- QUICK STATS RIBBON --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            label: "Active Orders",
            value: "0",
            icon: ShoppingBag,
            color: "text-amber-500",
          },
          {
            label: "Total Revenue",
            value: "$0.00",
            icon: DollarSign,
            color: "text-emerald-500",
          },
          {
            label: "Kitchen Rating",
            value: "New",
            icon: TrendingUp,
            color: "text-primary",
          },
        ].map((stat, i) => (
          <Card
            key={i}
            className="bg-card border-border/40 hover:border-primary/30 transition-all duration-500 group rounded-[2rem] overflow-hidden"
          >
            <CardContent className="p-6 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
                  {stat.label}
                </p>
                <h3 className="text-3xl font-bold text-cream group-hover:text-primary transition-colors">
                  {stat.value}
                </h3>
              </div>
              <div
                className={`p-4 rounded-2xl bg-background/50 border border-border/20 ${stat.color}`}
              >
                <stat.icon size={24} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* --- MAIN OPERATIONS GRID --- */}
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Operation Center: Left 8 Columns */}
        <div className="lg:col-span-8 space-y-8">
          <section className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <h2 className="font-serif text-2xl font-bold text-cream">
                Transmission Queue
              </h2>
              <div className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] text-primary font-bold tracking-widest uppercase animate-pulse">
                Live
              </div>
            </div>

            <div className="min-h-[400px] rounded-[3rem] border border-dashed border-border/60 bg-card/20 flex flex-col items-center justify-center text-center p-12 group hover:border-primary/30 transition-colors duration-700">
              <div className="size-20 rounded-full bg-background/50 border border-border/40 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <UtensilsCrossed className="size-8 text-muted-foreground/30" />
              </div>
              <p className="font-serif italic text-xl text-cream/40 max-w-xs leading-relaxed">
                Your kitchen is quiet. Sync your menu to start receiving orders.
              </p>
            </div>
          </section>
        </div>

        {/* Action Sidebar: Right 4 Columns */}
        <aside className="lg:col-span-4 space-y-8">
          <section className="space-y-6">
            <h2 className="font-serif text-2xl font-bold text-cream px-2">
              Insights
            </h2>
            <Card className="bg-card/40 border-border/40 rounded-[2.5rem] p-8">
              <p className="text-sm text-muted-foreground italic text-center py-10 leading-relaxed border border-dashed border-border/40 rounded-3xl">
                Operational insights will manifest as you process your first
                culinary transmissions.
              </p>
            </Card>
          </section>
        </aside>
      </main>
    </div>
  );
}
