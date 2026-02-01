import { publicService } from "@/services/publicServices/public.service";
import MealCard from "@/components/modules/public/MealCard";
import {
  ChefHat,
  MapPin,
  Phone,
  Info,
  UtensilsCrossed,
  Calendar,
} from "lucide-react";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";

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
    <div className="min-h-screen bg-[#1A0F0D] pb-32">
      {/* 1. HERO SECTION: Simplified and Bold */}
      <section className="relative h-[50vh] w-full flex items-center justify-center overflow-hidden bg-[#2D1B16]">
        <div className="absolute inset-0 bg-[url('/assets/textures/noise.png')] opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1A0F0D]/40 to-[#1A0F0D]" />

        <div className="relative z-10 text-center space-y-6 px-6">
          <div className="mx-auto size-24 rounded-[2rem] bg-caramel flex items-center justify-center text-brownie shadow-[0_20px_50px_rgba(192,133,82,0.2)] transition-shadow duration-300 ease-in-out hover:shadow-[0_0_50px_rgba(192,133,82,0.6)]">
            <ChefHat className="size-12" />
          </div>
          <div className="space-y-20 text-center">
            {/* 1. THE TITLE: Smooth Blur-to-Focus Entrance */}
            <h1 className="text-5xl md:text-8xl font-serif font-bold text-cream tracking-tighter animate-velvet-title">
              {provider.name}
            </h1>

            {/* 2. THE METADATA: Staggered sequential rise using CSS Delays */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-caramel/60 uppercase tracking-[0.3em] text-[10px] font-bold">
              {[
                { icon: <MapPin size={14} />, label: provider.address },
                { icon: <Phone size={14} />, label: provider.phone },
                {
                  icon: <Calendar size={14} />,
                  label: `Joined ${new Date(provider.createdAt).getFullYear()}`,
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="animate-metadata flex items-center gap-2"
                  style={{ animationDelay: `${0.6 + idx * 0.15}s` }} // Sequential delay in CSS
                >
                  <span className="text-caramel">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>

            {/* 3. THE DIVIDER: Minimalist expansion */}
            <div
              className="h-px bg-gradient-to-r from-transparent via-caramel/30 to-transparent mx-auto animate-in fade-in zoom-in duration-1000 fill-mode-both"
              style={{ animationDelay: "1.2s", width: "100px" }}
            />
          </div>
        </div>
      </section>

      {/* 2. CENTERED INFO STRIP: Replacing the Sidebar */}
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto -mt-16 mb-20 relative z-20">
          <div className="p-10 md:p-12 rounded-[3rem] bg-[#2D1B16]/80 border border-caramel/20 backdrop-blur-2xl shadow-3xl text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-12 bg-caramel/20" />
              <Info className="size-5 text-caramel" />
              <span className="text-xs uppercase tracking-[0.4em] text-caramel font-bold">
                The Story
              </span>
              <div className="h-px w-12 bg-caramel/20" />
            </div>
            <p className="text-xl md:text-2xl font-serif italic text-cream/80 leading-relaxed font-light">
              ‟{provider.description}”
            </p>
          </div>
        </div>

        {/* 3. MENU SECTION: Full Width Grid */}
        <section className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-caramel/10 pb-8">
            <div className="space-y-1">
              <h2 className="flex items-center gap-4 font-serif text-4xl font-bold text-cream">
                <UtensilsCrossed className="text-caramel size-8" /> Signature
                Menu
              </h2>
              <p className="text-muted-foreground font-serif italic">
                Hand-crafted delights for the discerning palate.
              </p>
            </div>
            <Badge className="bg-caramel/10 text-caramel border-caramel/20 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest">
              {providerMeals.length} Masterpieces
            </Badge>
          </div>

          {providerMeals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {providerMeals.map((meal) => (
                <MealCard key={meal.id} meal={meal} />
              ))}
            </div>
          ) : (
            <div className="py-32 rounded-[3rem] border border-dashed border-caramel/10 flex flex-col items-center justify-center text-center bg-card/10">
              <UtensilsCrossed className="size-12 text-caramel/20 mb-4" />
              <p className="font-serif italic text-cream/30 text-xl">
                The kitchen is currently refining its upcoming menu...
              </p>
            </div>
          )}
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
        "inline-flex items-center border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        className,
      )}
    >
      {children}
    </div>
  );
}
