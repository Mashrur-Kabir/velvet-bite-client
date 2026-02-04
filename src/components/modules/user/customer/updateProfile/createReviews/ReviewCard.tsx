"use client";

import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { Star, Send, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { createReviewAction } from "@/actions/customer.action";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ReviewCardProps {
  mealName: string;
  mealId: string;
}

export default function ReviewCard({ mealName, mealId }: ReviewCardProps) {
  const router = useRouter();
  const [hoveredStar, setHoveredStar] = useState(0);

  const form = useForm({
    defaultValues: { mealId: mealId, rating: 5, comment: "" },
    onSubmit: async ({ value }) => {
      const reviewPromise = createReviewAction(value);

      toast.promise(reviewPromise, {
        loading: "Syncing with Velvet Community...",
        success: (res) => {
          if (res.error) throw new Error(res.error.message);
          router.push("/dashboard/profile");
          router.refresh(); // Refresh to show the new review in the list
          return "Reflection successfully archived.";
        },
        error: (err) => err.message,
        style: {
          background: "oklch(0.45 0.08 55)",
          color: "oklch(0.92 0.03 65)",
          border: "1px solid oklch(0.35 0.03 45)",
          padding: "16px",
          fontFamily: "var(--font-serif)",
        },
      });
    },
  });

  return (
    <Card className="border-caramel/10 bg-[#2D1B16]/60 backdrop-blur-xl rounded-[3rem] overflow-hidden shadow-premium-dark">
      <CardContent className="p-12 space-y-10">
        <button
          onClick={() => router.back()}
          className="group flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-caramel/40 hover:text-caramel transition-all duration-500"
        >
          <div className="p-3 rounded-full border border-caramel/10 group-hover:border-cream/70 group-hover:-translate-x-1 transition-all">
            <ArrowLeft size={12} />
          </div>
          Return to Archives
        </button>

        <header className="text-center">
          <h2 className="text-3xl font-serif font-bold text-cream mb-2">
            Taste <span className="text-primary italic">Reflection</span>
          </h2>
          <p className="text-cream text-[10px] uppercase tracking-[0.3em] font-semibold cursor-pointer transition-all duration-500 hover:text-caramel hover:drop-shadow-[0_0_8px_rgba(192,133,82,0.6)]">
            Reviewing: {mealName}
          </p>
        </header>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-8"
        >
          <div className="flex justify-center gap-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(0)}
                onClick={() => form.setFieldValue("rating", star)}
              >
                <Star
                  size={32}
                  className={cn(
                    "transition-all duration-300",
                    (hoveredStar || form.state.values.rating) >= star
                      ? "fill-primary text-primary scale-110"
                      : "text-cream/20",
                  )}
                />
              </button>
            ))}
          </div>

          <form.Field name="comment">
            {(field) => (
              <div className="space-y-2">
                <Textarea
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder={`Describe your experience with ${mealName}...`}
                  className="bg-black/20 border-caramel/10 rounded-[2rem] min-h-[160px] p-6 focus:border-caramel/40 text-cream resize-none transition-all"
                />
              </div>
            )}
          </form.Field>

          <Button
            type="submit"
            className="w-full h-16 bg-primary hover:bg-caramel text-white text-lg font-bold rounded-2xl transition-all flex gap-3 group"
          >
            Submit Reflection
            <Send
              size={18}
              className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
            />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
