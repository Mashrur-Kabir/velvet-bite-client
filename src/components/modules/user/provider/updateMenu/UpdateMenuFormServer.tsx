import { publicService } from "@/services/publicServices/public.service";
import { providerService } from "@/services/providerServices/provider.service";
import UpdateMenuFormClient from "./UpdateMenuFormClient";

export default async function UpdateMenuFormServer({
  mealId,
}: {
  mealId: string;
}) {
  const [mealRes, categoriesRes] = await Promise.all([
    providerService.getMyMeals(),
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

  // Pass categories to the client
  return <UpdateMenuFormClient meal={meal} categories={categories} />;
}
