import { getMyMealsAction } from "@/actions/provider.action";
import MyMeals from "@/components/modules/user/provider/MyMeals";
import { UtensilsCrossed, Plus } from "lucide-react";
import Link from "next/link";

export default async function MyMenuPage() {
  const { data: meals } = await getMyMealsAction();

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-20 px-6">
      <header className="flex flex-col md:flex-row justify-between items-end gap-6 mt-16">
        <div className="space-y-2">
          <h1 className="text-5xl font-serif font-bold text-cream tracking-tighter">
            Culinary <span className="text-primary italic">Portfolio</span>
          </h1>
          <p className="text-muted-foreground uppercase tracking-[0.4em] text-[10px] font-bold">
            Manage Your Registered Menu
          </p>
        </div>
        <Link
          href="/provider-dashboard/create-menu"
          className="px-8 h-14 rounded-full bg-primary text-primary-foreground font-bold flex items-center gap-3 hover:bg-accent hover:text-white hover:font-bold transition-all shadow-xl shadow-primary/10 uppercase tracking-widest text-xs"
        >
          <Plus size={18} /> New Creation
        </Link>
      </header>

      {meals && meals.length > 0 ? (
        <MyMeals meals={meals} />
      ) : (
        <div className="h-[400px] border border-dashed border-border/60 rounded-[3rem] flex flex-col items-center justify-center bg-card/10">
          <UtensilsCrossed
            size={48}
            className="text-muted-foreground/20 mb-4"
          />
          <p className="font-serif italic text-xl text-cream/40">
            Your archive is currently vacant.
          </p>
        </div>
      )}
    </div>
  );
}
