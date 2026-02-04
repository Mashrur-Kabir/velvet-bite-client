import { publicService } from "@/services/publicServices/public.service";
import { userService } from "@/services/userServices/user.service"; // Adjust based on your actual path
import Image from "next/image";
import { notFound } from "next/navigation";
import { Star, ChefHat, ArrowRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Roles } from "@/constants/userRoles";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function MealDetailsPage({ params }: Props) {
  const { id } = await params;

  // 1. Parallel Data & Session Orchestration
  const [mealRes, sessionRes] = await Promise.all([
    publicService.getMealById(id),
    userService.getSession(),
  ]);

  const { data: meal, error } = mealRes;
  const user = sessionRes.data?.user;

  if (error || !meal) {
    return notFound();
  }

  // 2. Logic for Order Gateway Visibility
  const isAdminOrProvider =
    user?.role === Roles.admin || user?.role === Roles.provider;
  const showOrderButton = !isAdminOrProvider;

  // 3. Logic for Redirect Target
  const targetUrl = user ? `/meals/${id}/order-meal` : "/login";

  return (
    <div className="min-h-screen bg-[#1A0F0D] pt-20 pb-28">
      <div className="container mx-auto px-6 relative">
        {/* --- NAVIGATION: BACK BUTTON --- */}
        <Link
          href="/meals"
          className="inline-flex items-center gap-2 mb-12 text-[12px] uppercase font-bold tracking-[0.3em] text-cream/40 hover:text-cream transition-all duration-300 group animate-metadata"
        >
          <ChevronLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Return to meals
        </Link>

        {/* --- MAIN LAYOUT WRAPPER --- */}
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* 1. IMAGE CONTAINER */}
          <div className="animate-velvet-title relative h-[500px] lg:h-[700px] w-full lg:w-1/2 rounded-[3rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-caramel/10 sticky top-32">
            <Image
              src={meal.imageUrl}
              alt={meal.name}
              fill
              priority
              className="object-cover transition-transform duration-[2s] hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A0F0D]/60 via-transparent to-transparent" />

            <div
              className="absolute bottom-8 left-8 bg-[#2D1B16]/80 backdrop-blur-md px-6 py-3 rounded-full border border-caramel/20 flex items-center gap-2 animate-metadata"
              style={{ animationDelay: "0.8s" }}
            >
              <Star className="size-4 text-cream hover:fill-cream" />
              <span className="text-cream font-bold">{meal.avgRating}</span>
              <span className="text-cream text-xs ml-1 font-medium cursor-pointer">
                ({meal.totalReviews} Reviews)
              </span>
            </div>
          </div>

          {/* 2. CONTENT AREA */}
          <div className="flex-1 space-y-12 py-4">
            <div className="space-y-6">
              <div className="space-y-3">
                <span
                  className="animate-metadata inline-block text-caramel font-serif uppercase tracking-[0.4em] text-xs font-bold"
                  style={{ animationDelay: "0.4s" }}
                >
                  {meal.category.name}
                </span>
                <h1 className="animate-velvet-title text-6xl md:text-8xl font-serif font-bold text-cream tracking-tighter leading-[0.9]">
                  {meal.name}
                </h1>
              </div>

              <p
                className="animate-metadata text-2xl text-cream/60 font-serif italic leading-relaxed"
                style={{ animationDelay: "0.6s" }}
              >
                ‟{meal.description}”
              </p>
            </div>

            {/* Pricing & Provider Block */}
            <div
              className="animate-metadata flex flex-wrap items-center gap-10 pt-4"
              style={{ animationDelay: "0.8s" }}
            >
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-caramel/40 font-bold mb-1">
                  Price
                </span>
                <span className="text-5xl font-bold text-cream font-serif">
                  ${meal.price}
                </span>
              </div>
              <div className="h-16 w-px bg-caramel/10 hidden md:block" />
              <div className="flex items-center gap-5 bg-[#2D1B16]/40 p-6 rounded-[2.5rem] border border-caramel/10">
                <div className="size-14 rounded-2xl bg-caramel/10 flex items-center justify-center text-caramel">
                  <ChefHat className="size-7" />
                </div>
                <div>
                  <p className="text-[10px] uppercase text-caramel/40 font-bold tracking-widest">
                    The Kitchen
                  </p>
                  <p className="text-xl font-bold text-cream group-hover:text-caramel transition-colors">
                    {meal.provider.name}
                  </p>
                </div>
              </div>
            </div>

            {/* 3. DYNAMIC ORDER GATEWAY */}
            {showOrderButton && (
              <div
                className="animate-metadata pt-10"
                style={{ animationDelay: "1s" }}
              >
                <Link href={targetUrl} className="block w-full">
                  <button className="group relative w-full bg-cream py-8 rounded-full font-serif font-bold text-2xl text-[#1A0F0D] shadow-[0_20px_40px_rgba(192,133,82,0.2)] transition-all duration-500 ease-out hover:bg-primary-foreground hover:text-white hover:scale-[1.02] hover:shadow-[0_25px_50px_rgba(192,133,82,0.3)] overflow-hidden transform-gpu will-change-transform antialiased">
                    <span className="relative z-10 flex items-center justify-center gap-4">
                      {user ? "Place Your Order" : "Login to Order"}
                      <ArrowRight className="size-7 transition-transform group-hover:translate-x-3" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
