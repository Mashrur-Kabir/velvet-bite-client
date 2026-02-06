import { IMealFilter } from "@/types/moduleTypes/meal.type";
import MealCard from "@/components/modules/public/MealCard";
import { publicService } from "@/services/publicServices/public.service";
import { ChevronLeft, Utensils, Filter } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface Props {
  searchParams: Promise<IMealFilter>;
}

export default async function MealsPage({ searchParams }: Props) {
  const params = await searchParams;

  // 1. Resolve Categories first (Fast/Cached: 0-5ms)
  const categoriesRes = await publicService.getCategories({ revalidate: 3600 });
  const categories = categoriesRes.data || [];

  // 2. Logistical Mapping: Swap Name for ID before the main fetch
  const effectiveParams = { ...params };
  if (params.category) {
    const matchedCategory = categories.find(
      (c) => c.name.toLowerCase() === params.category?.toLowerCase(),
    );
    if (matchedCategory) {
      effectiveParams.categoryId = matchedCategory.id;
      // We remove the string 'category' so the backend doesn't get confused
      delete effectiveParams.category;
    }
  }

  // 3. Main Fetch: Now we only call this ONCE with the correct ID
  const mealsRes = await publicService.getMeals(effectiveParams, {
    cache: "no-store",
  });

  const meals = mealsRes.data || [];
  const error = mealsRes.error;

  if (error)
    return (
      <div className="p-20 text-center text-primary font-serif italic">
        The archives are currently unreachable: {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-[#1A0F0D] pt-5 pb-20">
      <div className="container mx-auto px-6">
        {/* --- NAVIGATION: BACK BUTTON --- */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 mb-12 text-[10px] uppercase font-bold tracking-[0.4em] text-cream/30 hover:text-primary transition-all duration-500 group"
        >
          <ChevronLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Return to home
        </Link>

        {/* --- HEADER SECTION --- */}
        <header className="mb-10 space-y-4 max-w-3xl">
          <div className="flex items-center gap-3 text-primary uppercase tracking-[0.3em] font-bold text-[10px]">
            <Utensils size={14} />
            <span>Masterpiece Collection</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-cream tracking-tight leading-tight">
            {params.category ? (
              <>
                <span className="text-primary italic">{params.category}</span>{" "}
                Archives
              </>
            ) : (
              "Explore All Masterpieces"
            )}
          </h1>
          <p className="text-cream/40 font-serif italic text-lg border-l border-primary/20 pl-6 py-2">
            Handcrafted delicacies orchestrated by our master providers.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* --- ASIDE: TAXONOMY FILTER --- */}
          <aside className="lg:col-span-3 space-y-8">
            <div className="p-8 bg-[#2D1B16]/30 backdrop-blur-xl border border-cream/5 rounded-[2.5rem] sticky top-32">
              <div className="flex items-center gap-2 mb-8 text-cream">
                <Filter size={16} className="text-primary" />
                <h3 className="font-bold tracking-widest uppercase text-[10px]">
                  Filter Taxonomy
                </h3>
              </div>

              <div className="flex flex-wrap lg:flex-col gap-3">
                <Link href="/meals">
                  <Badge
                    className={`w-full justify-center px-6 py-3 rounded-full border border-primary/10 text-[10px] uppercase tracking-widest font-bold transition-all duration-500 ${
                      !params.category
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                        : "bg-transparent text-cream/40 hover:text-primary hover:border-primary/40"
                    }`}
                  >
                    All Flavors
                  </Badge>
                </Link>
                {categories.map((cat) => (
                  <Link key={cat.id} href={`/meals?category=${cat.name}`}>
                    <Badge
                      className={`w-full justify-center px-6 py-3 rounded-full border border-primary/10 text-[10px] uppercase tracking-widest font-bold transition-all duration-500 ${
                        params.category === cat.name
                          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                          : "bg-transparent text-cream/40 hover:text-primary hover:border-primary/40"
                      }`}
                    >
                      {cat.name}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          {/* --- MAIN: MEALS GRID --- */}
          <main className="lg:col-span-9">
            {meals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                {meals.map((meal) => (
                  <MealCard key={meal.id} meal={meal} />
                ))}
              </div>
            ) : (
              <div className="py-40 text-center border border-dashed border-cream/10 rounded-[3rem] bg-black/10">
                <Utensils className="size-12 text-cream/5 mx-auto mb-6" />
                <p className="text-cream/20 italic font-serif text-xl">
                  No culinary records found for the {params.category} category.
                </p>
                <Link
                  href="/meals"
                  className="text-primary text-[10px] uppercase tracking-widest font-bold mt-4 inline-block hover:underline"
                >
                  View all archives
                </Link>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
