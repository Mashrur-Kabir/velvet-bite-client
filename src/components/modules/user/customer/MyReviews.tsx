"use client";

import { IReview } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Trash2, Quote } from "lucide-react";
import { deleteReviewAction } from "@/actions/customer.action";
import { toast } from "sonner";

export default function MyReviews({
  initialReviews,
}: {
  initialReviews: IReview[];
}) {
  if (initialReviews.length === 0) {
    return (
      <div className="py-24 text-center border border-dashed border-primary/10 rounded-[2.5rem] bg-[#2D1B16]/20 animate-in fade-in zoom-in-95 duration-700">
        <div className="flex flex-col items-center gap-4">
          <Quote className="size-12 text-primary/10 rotate-180" />
          <p className="text-cream/30 font-serif text-lg italic">
            Your taste journal is currently empty.
          </p>
          <p className="text-[10px] uppercase tracking-[0.3em] text-primary/20 font-bold">
            No reflections archived yet
          </p>
        </div>
      </div>
    );
  }

  const handleDelete = async (id: string) => {
    toast.promise(deleteReviewAction(id), {
      loading: "Removing reflection...",
      success: "Review erased from history.",
      error: (err) => err.message,
      style: {
        background: "#5E3023", // Brownie
        color: "#F3E9DC", // Cream
        border: "1px solid #C08552", // Caramel
        padding: "16px",
        // 2. Updated to light beige/caramel glow
        boxShadow: "0 0 15px rgba(192, 133, 82, 0.3)",
      },
    });
  };

  return (
    <div className="grid gap-6">
      <AnimatePresence mode="popLayout">
        {initialReviews.map((review) => (
          <motion.div
            key={review.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="p-8 bg-[#2D1B16]/40 border border-primary/10 rounded-[2.5rem] relative overflow-hidden group"
          >
            {/* FIX: added pointer-events-none so it doesn't block clicks/hovers */}
            <Quote className="absolute -right-4 -top-4 size-24 text-primary/5 rotate-12 pointer-events-none" />

            {/* Added relative z-10 to ensure content stays on the top layer */}
            <div className="relative z-10 flex justify-between items-start mb-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={
                      review.rating > i
                        ? "fill-primary text-primary"
                        : "text-primary/20"
                    }
                  />
                ))}
              </div>
              <button
                onClick={() => handleDelete(review.id)}
                className="
                    text-primary hover:text-rose-500 
                    transition-all duration-300 ease-out 
                    hover:bg-primary-foreground 
                    cursor-pointer 
                    hover:scale-125 active:scale-95 
                    p-1 rounded-lg 
                    /* ADD THESE TWO BELOW */
                    transform-gpu 
                    will-change-transform
                "
              >
                <Trash2 size={18} />
              </button>
            </div>

            <div className="relative z-10">
              <p className="text-cream/80 italic font-serif leading-relaxed mb-4">
                “{review.comment}”
              </p>
              <p className="text-[10px] uppercase tracking-widest text-primary/40 font-bold">
                Shared on {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
