"use client";

import { IReview } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import ReviewCard from "./updateReview/ReviewCard";
import { Search, Filter, MessageSquareX } from "lucide-react"; // Added MessageSquareX
import { useState, useMemo } from "react";

export default function ReviewList({ reviews }: { reviews: IReview[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredReviews = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return reviews; // Return original array immediately if empty
    return reviews.filter(
      (r) =>
        r.comment.toLowerCase().includes(term) ||
        r.user?.name.toLowerCase().includes(term) ||
        r.meal?.name.toLowerCase().includes(term),
    );
  }, [searchTerm, reviews]);

  return (
    <div className="space-y-10">
      {/* --- MODERATION FILTERS --- */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card/20 p-4 rounded-[2rem] border border-border/10 backdrop-blur-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-primary/40" />
          <input
            type="text"
            placeholder="Search by user, meal or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-12 bg-background/50 border-none rounded-xl pl-12 pr-4 text-xs text-cream placeholder:text-cream/20 focus:ring-1 focus:ring-primary/30 transition-all outline-none"
          />
        </div>
        <div className="px-4 py-2 rounded-xl bg-primary/5 border border-primary/10 text-[10px] text-primary/60 font-bold uppercase tracking-widest flex items-center gap-2">
          <Filter size={12} /> Live Stream
        </div>
      </div>

      {/* --- REVIEW GRID: STABLE CONTAINER --- */}
      <div className="min-h-[400px]">
        {" "}
        {/* Fixed height prevents layout jumps */}
        <motion.div initial="show" animate="show" className="space-y-6">
          <AnimatePresence mode="popLayout" initial={false}>
            {filteredReviews.length > 0 ? (
              filteredReviews.map((review) => (
                <motion.div
                  key={review.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <ReviewCard review={review} />
                </motion.div>
              ))
            ) : (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="py-32 text-center border border-dashed border-border/40 rounded-[3rem] bg-card/5 flex flex-col items-center justify-center gap-4"
              >
                <MessageSquareX className="size-10 text-cream/10" />
                <p className="font-serif italic text-cream/30 text-lg">
                  No culinary feedback matches your current search.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
