"use client";

import { IReview } from "@/types";
import { motion } from "framer-motion";
import { Star, Trash2, Eye, EyeOff, User, Utensils } from "lucide-react";
import { toast } from "sonner";
import {
  toggleReviewVisibilityAction,
  deleteReviewAction,
} from "@/actions/admin.action";
import { useState } from "react";

export default function ReviewCard({ review }: { review: IReview }) {
  const [isHiding, setIsHiding] = useState(false);

  const handleToggleVisibility = async () => {
    setIsHiding(true);
    const res = await toggleReviewVisibilityAction(review.id, !review.isHidden);

    const fontStyle = {
      fontFamily: "var(--font-serif)",
      letterSpacing: "-0.02em",
    };

    const toastBaseStyle = {
      background: "oklch(0.45 0.08 55)", // Shiny light chocolate
      color: "oklch(0.92 0.03 65)", // Cream text
      border: "1px solid oklch(0.35 0.03 45)",
      padding: "16px",
      ...fontStyle,
    };

    if (res.error) {
      toast.error(res.error.message, { style: toastBaseStyle });
    } else {
      toast.success(
        review.isHidden
          ? "Review manifested in menu"
          : "Review hidden from archives",
        {
          style: toastBaseStyle,
          // Caramel icon theme for success
        },
      );
    }
    setIsHiding(false);
  };

  const handleDelete = async () => {
    const toastBaseStyle = {
      background: "oklch(0.45 0.08 55)",
      color: "oklch(0.92 0.03 65)",
      border: "1px solid oklch(0.35 0.03 45)",
      padding: "16px",
      fontFamily: "var(--font-serif)",
    };

    // Replaced browser confirm with stylized Sonner toast
    toast("Purge Review?", {
      description:
        "This will permanently erase this feedback from the archives.",
      action: {
        label: "Purge",
        onClick: async () => {
          const res = await deleteReviewAction(review.id);
          if (res.error) {
            toast.error(res.error.message, { style: toastBaseStyle });
          } else {
            toast.success("Review purged successfully", {
              style: toastBaseStyle,
            });
          }
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => toast.dismiss(),
      },
      style: toastBaseStyle,
      actionButtonStyle: {
        background: "oklch(67.764% 0.11456 67.729)", // Caramel
        color: "oklch(0.2 0.05 45)",
        fontWeight: "bold",
        textTransform: "uppercase",
        fontSize: "10px",
        letterSpacing: "0.1em",
        borderRadius: "8px",
      },
      cancelButtonStyle: {
        background: "oklch(0.35 0.06 50)", // Deep Roast
        color: "oklch(0.92 0.03 65)",
        textTransform: "uppercase",
        fontSize: "10px",
        letterSpacing: "0.1em",
        borderRadius: "8px",
      },
    });
  };

  return (
    <motion.div
      layout
      className={`p-8 rounded-[2.5rem] border backdrop-blur-md transition-all duration-500 ${
        review.isHidden
          ? "bg-rose-500/5 border-rose-500/20 grayscale-[0.5]"
          : "bg-card/40 border-border/40"
      }`}
    >
      <div className="flex flex-col md:flex-row justify-between gap-8">
        {/* --- REVIEW CONTENT --- */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex gap-1 text-primary">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  fill={i < review.rating ? "currentColor" : "none"}
                  className={i < review.rating ? "opacity-100" : "opacity-20"}
                />
              ))}
            </div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-cream/20">
              {new Date(review.createdAt).toLocaleDateString()}
            </span>
          </div>

          <p className="text-xl font-serif italic text-cream leading-relaxed">
            “{review.comment}”
          </p>

          <div className="flex flex-wrap gap-6 pt-4 border-t border-white/5">
            <div className="flex items-center gap-2 text-xs text-cream/60">
              <User size={14} className="text-primary/60" />
              <span className="font-bold">{review.user?.name}</span>
              <span className="text-[10px] opacity-40">
                ({review.user?.email})
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-cream/60">
              <Utensils size={14} className="text-primary/60" />
              <span className="font-bold">{review.meal?.name}</span>
            </div>
          </div>
        </div>

        {/* --- MODERATION ACTIONS --- */}
        <div className="flex md:flex-col gap-3 justify-center items-center shrink-0 w-full md:w-28">
          {/* fixed width on md screens prevents layout jumps during text changes */}
          <button
            onClick={handleToggleVisibility}
            disabled={isHiding}
            className={`w-full h-12 rounded-2xl border transition-all duration-300 flex items-center justify-center gap-3 font-bold uppercase tracking-widest text-[10px] ${
              review.isHidden
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-white"
                : "bg-amber-500/10 border-amber-500/20 text-amber-500 hover:bg-amber-500 hover:text-white"
            }`}
          >
            {review.isHidden ? <Eye size={16} /> : <EyeOff size={16} />}
            <span>{review.isHidden ? "Public" : "Hide"}</span>
          </button>

          <button
            onClick={handleDelete}
            className="w-full h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 hover:bg-rose-500 hover:text-white transition-all duration-300 flex items-center justify-center"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
