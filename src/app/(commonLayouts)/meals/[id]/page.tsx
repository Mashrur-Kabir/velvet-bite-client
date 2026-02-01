import { publicService } from "@/services/publicServices/public.service";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Star, ChefHat, ArrowRight } from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function MealDetailsPage({ params }: Props) {
  const { id } = await params;
  const { data: meal, error } = await publicService.getMealById(id);

  if (error || !meal) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-[#1A0F0D] pt-32 pb-20">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row gap-16 items-center">
        {/* 1. IMAGE CONTAINER: Entrance with soft focus scale */}
        <div className="animate-velvet-title relative h-[450px] md:h-[600px] w-full lg:w-1/2 rounded-[3rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-caramel/10">
          <Image
            src={meal.imageUrl}
            alt={meal.name}
            fill
            priority
            className="object-cover transition-transform duration-[2s] hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A0F0D]/60 via-transparent to-transparent" />

          {/* Rating Overlay */}
          <div
            className="absolute bottom-8 left-8 bg-[#2D1B16]/80 backdrop-blur-md px-6 py-3 rounded-full border border-caramel/20 flex items-center gap-2 animate-metadata"
            style={{ animationDelay: "0.8s" }}
          >
            <Star className="size-4 fill-caramel text-caramel" />
            <span className="text-cream font-bold">{meal.avgRating}</span>
            <span className="text-cream/40 text-xs ml-1 font-medium">
              ({meal.totalReviews} Reviews)
            </span>
          </div>
        </div>

        {/* 2. CONTENT AREA: Staggered sequential entrance */}
        <div className="flex-1 space-y-10 max-w-2xl">
          <div className="space-y-6">
            <div className="space-y-3">
              <span
                className="animate-metadata inline-block text-caramel font-serif uppercase tracking-[0.4em] text-xs font-bold"
                style={{ animationDelay: "0.4s" }}
              >
                {meal.category.name}
              </span>
              <h1 className="animate-velvet-title text-6xl md:text-7xl font-serif font-bold text-cream tracking-tighter leading-[0.95]">
                {meal.name}
              </h1>
            </div>

            <p
              className="animate-metadata text-xl text-cream/60 font-serif italic leading-relaxed"
              style={{ animationDelay: "0.6s" }}
            >
              ‟{meal.description}”
            </p>
          </div>

          {/* Pricing & Provider Block */}
          <div
            className="animate-metadata flex flex-wrap items-center gap-8 pt-4"
            style={{ animationDelay: "0.8s" }}
          >
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-caramel/40 font-bold mb-1">
                Investment
              </span>
              <span className="text-4xl font-bold text-cream font-serif">
                ${meal.price}
              </span>
            </div>
            <div className="h-12 w-px bg-caramel/10 hidden md:block" />
            <div className="flex items-center gap-4 bg-[#2D1B16]/40 p-5 rounded-[2rem] border border-caramel/10 flex-1 md:flex-none">
              <div className="size-12 rounded-2xl bg-caramel/10 flex items-center justify-center text-caramel">
                <ChefHat className="size-6" />
              </div>
              <div>
                <p className="text-[10px] uppercase text-caramel/40 font-bold">
                  The Kitchen
                </p>
                <p className="font-bold text-cream group-hover:text-caramel transition-colors">
                  {meal.provider.name}
                </p>
              </div>
            </div>
          </div>

          {/* 3. ORDER BUTTON: Wide and heavy with "V" branding glow */}
          <div
            className="animate-metadata pt-6"
            style={{ animationDelay: "1s" }}
          >
            <button
              className="
                group relative w-full bg-cream py-6 rounded-full font-serif font-bold text-xl text-muted 
                shadow-[0_20px_40px_rgba(192,133,82,0.2)] 
                transition-all duration-500 ease-out
                hover:text-primary-foreground hover:scale-[1.02] hover:shadow-[0_25px_50px_rgba(192,133,82,0.3)] 
                overflow-hidden
                /* ADD THESE FIXES BELOW */
                transform-gpu
                will-change-transform
                antialiased
              "
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                Place Your Order{" "}
                <ArrowRight className="size-6 transition-transform group-hover:translate-x-2" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
