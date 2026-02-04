"use client";

import { IMeal } from "@/types/moduleTypes/meal.type";
import { motion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function MealCard({ meal }: { meal: IMeal }) {
  const [imgSrc, setImgSrc] = useState(meal.imageUrl);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="h-full"
    >
      <Link
        href={`/meals/${meal.id}`}
        /* Added 'force-hardware-acceleration' classes to the parent container too */
        className="group flex flex-col h-full border border-caramel/10 rounded-[1.5rem] overflow-hidden bg-[#2D1B16]/40 backdrop-blur-md transition-all duration-500 hover:border-caramel/30 hover:shadow-[0_15px_30px_rgba(0,0,0,0.3)] isolation-isolate transform-gpu"
      >
        {/* Visual Anchor */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-[2.5rem]">
          <Image
            src={imgSrc}
            alt={meal.name}
            fill
            /* FIX: Added scale-101 as the base state. 
               This keeps the GPU layer "warm" and prevents the pixel-snapping jitter 
               when moving from 100% to 105%.
            */
            className="object-cover scale-101 transition-transform duration-700 cubic-bezier(0.33, 1, 0.68, 1) group-hover:scale-105 will-change-transform transform-gpu backface-hidden"
            onError={() => setImgSrc("/placeholder-meal.jpg")}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A0F0D]/80 via-transparent to-transparent opacity-60 pointer-events-none" />

          {/* Rating Badge */}
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-[#1A0F0D]/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-caramel/20 z-10">
            <Star className="size-3 fill-caramel text-caramel" />
            <span className="text-[10px] font-bold text-cream">
              {meal.avgRating}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col flex-1 p-5 space-y-2">
          <div className="space-y-0.5">
            <p className="text-[9px] uppercase tracking-[0.25em] font-serif text-caramel/60">
              {meal.category.name}
            </p>
            <h3 className="text-lg font-serif font-bold text-primary group-hover:text-cream transition-colors line-clamp-1">
              {meal.name}
            </h3>
          </div>

          <p className="text-xs text-cream/60 line-clamp-2 italic font-light leading-relaxed flex-1">
            {meal.description}
          </p>

          <div className="pt-3 flex justify-between items-center border-t border-caramel/5">
            <div className="flex flex-col">
              <span className="text-[8px] uppercase text-caramel/30 font-bold tracking-widest">
                Price
              </span>
              <span className="text-lg font-bold text-cream">
                ${meal.price.toFixed(2)}
              </span>
            </div>

            <div className="size-9 rounded-full bg-caramel/10 flex items-center justify-center text-caramel transition-all duration-300 group-hover:bg-caramel group-hover:text-brownie">
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
