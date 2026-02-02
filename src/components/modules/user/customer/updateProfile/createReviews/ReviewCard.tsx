"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { Star, Send, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { createReviewAction } from "@/actions/customer.action";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function ReviewCard() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const mealId = searchParams.get("mealId");
  const [hoveredStar, setHoveredStar] = useState(0);

  const form = useForm({
    defaultValues: { mealId: mealId || "", rating: 5, comment: "" },
    onSubmit: async ({ value }) => {
      // Use a variable to hold the action call
      const reviewPromise = createReviewAction(value);

      toast.promise(reviewPromise, {
        loading: "Syncing with Velvet Community...",
        success: (res) => {
          // HANDLE ACTION-LEVEL ERRORS
          // If the action returned an error object from the service
          if (res.error) {
            throw new Error(res.error.message);
          }

          router.push("/dashboard/profile");
          return (
            <div className="flex flex-col">
              <span className="font-bold">Done!</span>
              <span className="text-xs opacity-70">Your review was shared</span>
            </div>
          );
        },
        error: (err) => err.message || "Failed to submit reflection",
        style: {
          background: "#5E3023",
          color: "#F3E9DC",
          border: "1px solid #C08552",
          padding: "16px",
          boxShadow: "0 0 15px rgba(192, 133, 82, 0.3)",
        },
      });
    },
  });

  return (
    <Card className="border-caramel/10 bg-[#2D1B16]/60 backdrop-blur-xl rounded-[3rem] overflow-hidden">
      <CardContent className="p-12 space-y-10">
        <button
          onClick={() => router.back()}
          className="group flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-caramel/40 hover:text-caramel transition-all duration-500 ease-out"
        >
          <div className="p-3 rounded-full border border-caramel/10 group-hover:border-cream/70 group-hover:-translate-x-1 transition-all duration-500">
            <ArrowLeft size={12} />
          </div>
          Return to Archives
        </button>
        <header className="text-center">
          <h2 className="text-3xl font-serif font-bold text-cream mb-2">
            Taste <span className="text-caramel italic">Reflection</span>
          </h2>
          <p className="text-cream/40 text-xs uppercase tracking-widest font-bold">
            Authorized User Transmission
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
                    "transition-all",
                    (hoveredStar || form.state.values.rating) >= star
                      ? "fill-cream text-cream scale-110"
                      : "text-cream/20",
                  )}
                />
              </button>
            ))}
          </div>

          <form.Field name="comment">
            {(field) => (
              <Textarea
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Describe the aromatic depth..."
                className="bg-black/20 border-caramel/10 rounded-[2rem] min-h-[160px] p-6 focus:border-caramel/40 text-cream resize-none"
              />
            )}
          </form.Field>

          <Button
            type="submit"
            className="w-full h-16 bg-cream hover:bg-accent text-primary-foreground hover:text-white text-lg font-bold rounded-2xl transition-all flex gap-3"
          >
            Submit <Send size={18} />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
