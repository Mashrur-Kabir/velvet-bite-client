import { IMealFilter } from "@/types/moduleTypes/meal.type";
import MealCard from "@/components/modules/public/MealCard";
import { publicService } from "@/services/publicServices/public.service";

interface Props {
  searchParams: Promise<IMealFilter>;
}

export default async function MealsPage({ searchParams }: Props) {
  const params = await searchParams;
  const { data: meals, error } = await publicService.getMeals(params, {
    revalidate: 10,
  });

  if (error)
    return (
      <div className="p-20 text-center text-caramel">
        Error loading kitchen: {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-[#1A0F0D] py-12">
      <div className="container mx-auto px-6">
        <header className="mb-12 space-y-2">
          <h1 className="text-5xl font-serif font-bold text-cream tracking-tight">
            Explore <span className="text-accent italic">Meals</span>
          </h1>
          <p className="text-cream/40 font-serif">
            Handcrafted delicacies from our master providers.
          </p>
        </header>

        {/* The Grid uses h-full and stretch to keep all MealCards aligned */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
          {meals?.map((meal) => (
            <MealCard key={meal.id} meal={meal} />
          ))}
        </div>
      </div>
    </div>
  );
}
