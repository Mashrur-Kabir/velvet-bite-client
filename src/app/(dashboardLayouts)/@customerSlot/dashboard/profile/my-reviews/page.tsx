import MyReviews from "@/components/modules/user/customer/MyReviews";
import { customerService } from "@/services/customerServices/customer.service";
import { ArrowLeft } from "lucide-react"; // Import for the icon
import Link from "next/link";

export default async function MyReviewsPage() {
  const { data: reviews } = await customerService.getMyReviews();

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 space-y-10">
      {/* --- ADD THE BACK BUTTON HERE --- */}
      <Link
        href="/dashboard/profile"
        className="group flex items-center gap-2 w-fit text-[10px] uppercase tracking-[0.3em] font-bold text-caramel/40 hover:text-caramel transition-colors duration-500"
      >
        <div className="p-2 rounded-full border border-cream group-hover:border-primary transition-all">
          <ArrowLeft
            size={14}
            className="group-hover:-translate-x-1 transition-transform"
          />
        </div>
        Back to Archives
      </Link>

      <div className="space-y-2">
        <h1 className="text-4xl font-serif font-bold text-cream">
          My <span className="text-caramel italic">Reflections</span>
        </h1>
        <p className="text-cream/20 text-xs uppercase tracking-widest">
          Historical Transmission Log
        </p>
      </div>

      <MyReviews initialReviews={reviews || []} />
    </div>
  );
}
