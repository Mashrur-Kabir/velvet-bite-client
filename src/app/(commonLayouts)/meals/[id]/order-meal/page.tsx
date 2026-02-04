import { publicService } from "@/services/publicServices/public.service";
import OrderSelectedMeal from "@/components/modules/user/customer/createOrder/OrderSelectedMeal";
import { notFound } from "next/navigation";
import { ChevronLeft, ShoppingBag } from "lucide-react";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function OrderMealPage({ params }: Props) {
  const { id } = await params;

  // 1. Fetch the specific meal details server-side
  const { data: meal, error } = await publicService.getMealById(id);

  if (error || !meal) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-[#1A0F0D] pt-20 pb-28">
      <div className="container mx-auto px-6 space-y-12">
        {/* --- NAVIGATION: BACK BUTTON --- */}
        <Link
          href={`/meals/${id}`}
          className="inline-flex items-center gap-2 mb-12 text-[12px] uppercase font-bold tracking-[0.3em] text-cream/40 hover:text-cream transition-all duration-300 group animate-metadata"
        >
          <ChevronLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Return to meal
        </Link>

        <header className="space-y-2">
          <div className="flex items-center gap-3">
            <ShoppingBag className="text-primary size-8" />
            <h1 className="text-5xl font-serif font-bold text-cream tracking-tight">
              Order <span className="text-primary italic">here</span>
            </h1>
          </div>
          <p className="text-muted-foreground uppercase tracking-[0.4em] text-[10px] font-bold opacity-60">
            Listen to your cravings
          </p>
        </header>

        {/* 2. Pass the meal data to the client component where the action lives */}
        <OrderSelectedMeal meal={meal} />
      </div>
    </div>
  );
}
