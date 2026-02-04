"use client";

import { IMeal } from "@/types";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Star, ArrowUpRight, ChefHat } from "lucide-react";

export const TrendingMealCard = ({ meal }: { meal: IMeal }) => {
  // Optimized: Faster easing for high-end perceived performance
  const QUICK_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: QUICK_EASE,
      }}
      whileHover={{
        y: -10,
        transition: { type: "spring", stiffness: 400, damping: 25 },
      }}
      className="group relative bg-card/40 backdrop-blur-md border border-border/40 rounded-[2.5rem] overflow-hidden hover:border-primary/40 transition-colors duration-500 shadow-premium-dark"
    >
      {/* --- VISUAL ANCHOR: Added will-change to prevent zoom jitter --- */}
      <div className="relative h-64 w-full overflow-hidden rounded-t-[2.5rem]">
        <Image
          src={meal.imageUrl}
          alt={meal.name}
          fill
          priority={true}
          className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105 transform-gpu backface-hidden will-change-transform"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 pointer-events-none" />

        {/* Category Badge */}
        <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-black uppercase tracking-widest text-cream shadow-2xl">
          {meal.category?.name}
        </div>

        {/* Floating Rating */}
        <div className="absolute bottom-6 left-6 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary/90 text-white shadow-xl backdrop-blur-sm">
          <Star size={12} fill="currentColor" className="text-white" />
          <span className="text-xs font-black tracking-tight">
            {meal.avgRating || "New"}
          </span>
        </div>
      </div>

      {/* --- CONTENT ARCHITECTURE --- */}
      <div className="p-8 space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-start gap-4">
            <h3 className="text-2xl font-serif font-bold text-cream group-hover:text-primary transition-colors duration-500 line-clamp-1">
              {meal.name}
            </h3>
            <Link
              href={`/meals/${meal.id}`}
              className="size-11 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 group/icon"
            >
              <ArrowUpRight
                size={22}
                className="group-hover/icon:translate-x-0.5 group-hover/icon:-translate-y-0.5 transition-transform duration-300"
              />
            </Link>
          </div>

          <div className="flex items-center gap-2 text-cream/40 text-[10px] uppercase font-bold tracking-[0.2em]">
            <ChefHat size={12} className="text-primary/60" />
            <span>{meal.provider?.name}</span>
          </div>
        </div>

        <p className="text-sm text-cream/60 line-clamp-2 italic font-serif leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-500">
          “{meal.description}”
        </p>

        <div className="pt-6 border-t border-white/5 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[9px] uppercase font-black tracking-[0.3em] text-cream/30">
              Price
            </span>
            <span className="text-2xl font-bold text-primary font-serif tracking-tight">
              ${meal.price.toFixed(2)}
            </span>
          </div>

          <Link
            href={`/meals/${meal.id}`}
            className="px-6 py-3 rounded-xl bg-background/50 border border-border/40 text-cream/60 text-[10px] font-black uppercase tracking-[0.2em] hover:border-primary/40 hover:text-primary transition-all duration-500 shadow-sm"
          >
            Inspect Details
          </Link>
        </div>
      </div>

      {/* Softer Ambient Glow */}
      <div className="absolute -inset-2 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-3xl -z-10" />
    </motion.div>
  );
};
