import { publicService } from "@/services/publicServices/public.service";
import ReviewCard from "@/components/modules/user/customer/updateProfile/createReviews/ReviewCard";
import { Suspense } from "react";
import { notFound } from "next/navigation";

interface Props {
  searchParams: Promise<{ mealId: string }>;
}

export default async function CreateReviewPage({ searchParams }: Props) {
  const { mealId } = await searchParams;

  if (!mealId) return notFound();

  // Fetch meal data on the server where env.BACKEND_URL is accessible
  const { data: meal, error } = await publicService.getMealById(mealId);

  if (error || !meal) return notFound();

  return (
    <div className="max-w-2xl mx-auto py-20 px-4">
      <Suspense
        fallback={
          <div className="text-caramel animate-pulse font-serif italic">
            Synchronizing Kitchen Archives...
          </div>
        }
      >
        {/* Pass the meal name or the whole meal object as a prop */}
        <ReviewCard mealName={meal.name} mealId={mealId} />
      </Suspense>
    </div>
  );
}
