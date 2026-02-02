import ReviewCard from "@/components/modules/user/customer/updateProfile/createReviews/ReviewCard";
import { Suspense } from "react";

export default function CreateReviewPage() {
  return (
    <div className="max-w-2xl mx-auto py-20 px-4">
      <Suspense
        fallback={
          <div className="text-caramel animate-pulse">
            Loading Kitchen Interface...
          </div>
        }
      >
        <ReviewCard />
      </Suspense>
    </div>
  );
}
