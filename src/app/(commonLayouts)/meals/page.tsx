import { customerService } from "@/services/customerServices/customer.service";
import { IMealFilter } from "@/types/meal.type";
import Link from "next/link";
import Image from "next/image";

interface Props {
  searchParams: Promise<IMealFilter>;
}

export default async function MealsPage({ searchParams }: Props) {
  const params = await searchParams;

  // Fetch data with ISR (revalidate every 10 seconds)
  const { data: meals, error } = await customerService.getMeals(params, {
    revalidate: 10,
  });

  if (error) return <div className="p-10 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-brownie">Explore Meals</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {meals?.map((meal) => (
          <Link key={meal.id} href={`/meals/${meal.id}`} className="group">
            <div className="border border-caramel/20 rounded-2xl overflow-hidden bg-card hover:shadow-lg transition-all">
              <div className="relative h-48 w-full">
                <Image
                  src={meal.imageUrl}
                  alt={meal.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-brownie">{meal.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {meal.description}
                </p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-lg font-bold text-amber-700">
                    ${meal.price}
                  </span>
                  <span className="text-sm bg-primary/10 px-2 py-1 rounded text-primary">
                    ⭐ {meal.avgRating}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
