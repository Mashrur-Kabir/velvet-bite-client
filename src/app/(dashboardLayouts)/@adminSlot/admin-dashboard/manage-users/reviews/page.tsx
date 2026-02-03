import { getAllReviewsAction } from "@/actions/admin.action";
import ReviewCard from "@/components/modules/user/admin/updateReview/ReviewCard";
import { MessageSquare, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function ReviewModerationPage({
  searchParams,
}: {
  searchParams: Promise<{ userId?: string }>;
}) {
  const { userId } = await searchParams;
  const { data: allReviews } = await getAllReviewsAction();

  // If a userId is provided (from the UserCard), we filter to that user's audit
  const filteredReviews = userId
    ? allReviews?.filter((r) => r.userId === userId)
    : allReviews;

  return (
    <div className="max-w-5xl mx-auto py-16 px-6 space-y-12">
      <header className="space-y-4">
        <Link
          href="/admin-dashboard/manage-users"
          className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-[0.2em] text-primary/60 hover:text-primary transition-colors"
        >
          <ChevronLeft size={14} /> Back to users
        </Link>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <MessageSquare className="text-primary size-8" />
            <h1 className="text-5xl font-serif font-bold text-cream tracking-tight">
              Culinary <span className="text-primary italic">Audit</span>
            </h1>
          </div>
          <p className="text-muted-foreground text-[10px] uppercase tracking-[0.4em] font-bold opacity-60">
            Moderating platform-wide culinary reviews
          </p>
        </div>
      </header>

      <div className="space-y-6">
        {filteredReviews && filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))
        ) : (
          <div className="py-24 text-center border border-dashed border-border/40 rounded-[3rem] bg-card/10">
            <p className="font-serif italic text-cream/40">
              No culinary reviews found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
