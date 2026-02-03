import { getAllReviewsAction } from "@/actions/admin.action";
import ReviewList from "@/components/modules/user/admin/AllReview";
import { MessageSquare, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function AllReviewsPage() {
  const { data: reviews } = await getAllReviewsAction();

  return (
    <div className="max-w-6xl mx-auto py-16 px-6 space-y-12">
      <header className="space-y-4">
        <Link
          href="/admin-dashboard/manage-users"
          className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-[0.2em] text-primary/60 hover:text-primary transition-colors"
        >
          <ChevronLeft size={14} /> Return to users
        </Link>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <MessageSquare className="text-primary size-8" />
            <h1 className="text-5xl font-serif font-bold text-cream tracking-tight">
              Global <span className="text-primary italic">Audit</span>
            </h1>
          </div>
          <p className="text-muted-foreground text-[10px] uppercase tracking-[0.4em] font-bold opacity-60">
            Platform-wide culinary oversight and moderation
          </p>
        </div>
      </header>

      {/* Invoke the styled list with all reviews */}
      <ReviewList reviews={reviews || []} />
    </div>
  );
}
