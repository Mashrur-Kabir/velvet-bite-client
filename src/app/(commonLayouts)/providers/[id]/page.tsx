import { publicService } from "@/services/publicServices/public.service";
import MealCard from "@/components/modules/public/MealCard";
import {
  ChefHat,
  MapPin,
  Phone,
  Info,
  UtensilsCrossed,
  Calendar,
  ChevronLeft,
} from "lucide-react";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProviderDetailsPage({ params }: Props) {
  const { id } = await params;

  const [providerRes, mealsRes] = await Promise.all([
    publicService.getProviderById(id),
    publicService.getMeals({ providerId: id }),
  ]);

  if (providerRes.error || !providerRes.data) {
    return notFound();
  }

  const provider = providerRes.data;
  const providerMeals = mealsRes.data || [];

  return (
    <div className="min-h-screen bg-[#1A0F0D] pb-32 selection:bg-caramel/30">
      {/* 1. HERO SECTION */}
      <section className="relative h-[40vh] w-full flex items-center justify-center overflow-hidden bg-[#2D1B16]">
        {/* Ambient Textures */}
        <div className="absolute inset-0 bg-[url('/assets/textures/noise.png')] opacity-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1A0F0D]/40 to-[#1A0F0D] pointer-events-none" />
        {/* --- NAVIGATION: BACK BUTTON --- */}
        <div className="absolute top-10 left-10 z-30 animate-in fade-in slide-in-from-left-4 duration-1000">
          <Link
            href="/providers"
            className="inline-flex items-center gap-2 text-[12px] uppercase font-bold tracking-[0.3em] text-cream/60 transition-all duration-500 group hover:text-primary"
          >
            <ChevronLeft
              size={20}
              className="group-hover:-translate-x-1.5 transition-transform duration-500 ease-out"
            />
            <span className="relative">
              Return to providers
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary/40 transition-all duration-500 group-hover:w-full" />
            </span>
          </Link>
        </div>
        <div className="relative z-10 text-center space-y-4 px-6 mt-8">
          {/* Animated Chef Hat with CSS-only Hover Glow */}
          <div className="mx-auto size-20 rounded-[1.8rem] bg-caramel flex items-center justify-center text-brownie shadow-xl transition-all duration-700 hover:shadow-[0_0_40px_rgba(192,133,82,0.4)] hover:scale-110 hover:rotate-3 group cursor-pointer">
            <ChefHat className="size-10 transition-transform duration-500 group-hover:scale-110" />
          </div>

          <div className="space-y-6 text-center">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-cream tracking-tighter animate-velvet-title">
              {provider.name}
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-6 text-caramel/60 uppercase tracking-[0.3em] text-[9px] font-bold">
              {[
                { icon: <MapPin size={12} />, label: provider.address },
                { icon: <Phone size={12} />, label: provider.phone },
                {
                  icon: <Calendar size={12} />,
                  label: `Joined ${new Date(provider.createdAt).getFullYear()}`,
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="animate-metadata flex items-center gap-2 group/meta cursor-default"
                  style={{ animationDelay: `${0.6 + idx * 0.15}s` }}
                >
                  <span className="text-caramel transition-transform duration-300 group-hover/meta:scale-125">
                    {item.icon}
                  </span>
                  <span className="transition-colors duration-300 group-hover/meta:text-cream">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. CENTERED INFO STRIP */}
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto -mt-12 mb-16 relative z-20 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700 fill-mode-both">
          <div className="p-8 md:p-10 rounded-[2.5rem] bg-[#2D1B16]/80 border border-caramel/20 backdrop-blur-2xl text-center shadow-2xl transition-all duration-700 hover:border-caramel/40 hover:-translate-y-2 group">
            <div className="flex items-center justify-center gap-3 mb-4 opacity-40 transition-opacity duration-500 group-hover:opacity-100">
              <div className="h-px w-8 bg-caramel" />
              <Info className="size-4 text-caramel" />
              <span className="text-[10px] uppercase tracking-[0.4em] text-caramel font-bold">
                The Story
              </span>
              <div className="h-px w-8 bg-caramel" />
            </div>
            <p className="text-lg md:text-xl font-serif italic text-cream/80 leading-relaxed font-light transition-colors duration-500 group-hover:text-cream">
              ‟{provider.description}”
            </p>
          </div>
        </div>

        {/* 3. MENU SECTION */}
        <section className="max-w-6xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-caramel/10 pb-6 animate-in fade-in slide-in-from-left-4 duration-1000 delay-1000 fill-mode-both">
            <div className="space-y-1 group cursor-default">
              <h2 className="flex items-center gap-3 font-serif text-3xl font-bold text-cream">
                <UtensilsCrossed className="text-caramel size-6 transition-transform duration-500 group-hover:rotate-12" />
                Signature{" "}
                <span className="group-hover:text-primary transition-colors duration-500">
                  Menu
                </span>
              </h2>
              <p className="text-xs text-muted-foreground font-serif italic">
                Hand-crafted delights for the discerning palate.
              </p>
            </div>
            <Badge className="bg-caramel/10 text-caramel border-caramel/20 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-caramel/20 transition-colors duration-300">
              {providerMeals.length} Masterpieces
            </Badge>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-[1200ms] fill-mode-both">
            {providerMeals.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {providerMeals.map((meal) => (
                  <MealCard key={meal.id} meal={meal} />
                ))}
              </div>
            ) : (
              <div className="py-24 rounded-[2.5rem] border border-dashed border-caramel/10 flex flex-col items-center justify-center text-center bg-card/5 transition-all duration-700 hover:bg-card/10">
                <UtensilsCrossed className="size-10 text-caramel/20 mb-3 animate-pulse" />
                <p className="font-serif italic text-cream/30 text-lg">
                  The kitchen is currently refining its upcoming menu...
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center border transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        className,
      )}
    >
      {children}
    </div>
  );
}
