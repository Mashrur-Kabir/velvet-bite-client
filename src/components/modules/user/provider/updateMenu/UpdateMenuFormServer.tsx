import { publicService } from "@/services/publicServices/public.service";
import { providerService } from "@/services/providerServices/provider.service";
import UpdateMenuFormClient from "./UpdateMenuFormClient";

export default async function UpdateMenuFormServer({
  mealId,
}: {
  mealId: string;
}) {
  // Parallel fetch for meal details and categories
  const [mealRes, categoriesRes] = await Promise.all([
    providerService.getMyMeals(), // We'll filter from the list or add a getSingleMeal service
    publicService.getCategories(),
  ]);

  const meal = mealRes.data?.find((m) => m.id === mealId);
  const categories = categoriesRes.data || [];

  if (!meal) {
    return (
      <div className="text-center py-20">
        <p className="text-cream/40 italic">
          Recipe not found in the archives.
        </p>
      </div>
    );
  }

  return <UpdateMenuFormClient meal={meal} />;
}
