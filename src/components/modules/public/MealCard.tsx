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
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="h-full"
    >
      <Link
        href={`/meals/${meal.id}`}
        className="group flex flex-col h-full border border-caramel/10 rounded-[2rem] overflow-hidden bg-[#2D1B16]/40 backdrop-blur-md transition-all duration-500 hover:border-caramel/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
      >
        {/* Image Container with unique zoom effect */}
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={imgSrc}
            alt={meal.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            onError={() => setImgSrc("/placeholder-meal.jpg")}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A0F0D] via-transparent to-transparent opacity-60" />

          {/* Floating Rating Badge */}
          <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-[#1A0F0D]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-caramel/20">
            <Star className="size-3.5 fill-caramel text-caramel" />
            <span className="text-xs font-bold text-cream">
              {meal.avgRating}
            </span>
          </div>
        </div>

        {/* Card Body - flex-1 ensures the footer stays at the bottom */}
        <div className="flex flex-col flex-1 p-6 space-y-3">
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-[0.2em] font-serif">
              {meal.category.name}
            </p>
            <h3 className="text-xl font-serif font-bold text-primary group-hover:text-cream transition-colors">
              {meal.name}
            </h3>
          </div>

          <p className="text-sm text-cream/60 line-clamp-2 italic font-light leading-relaxed flex-1">
            {meal.description}
          </p>

          <div className="pt-4 flex justify-between items-center border-t border-caramel/5">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase text-caramel/40 font-bold">
                PRICE
              </span>
              <span className="text-xl font-bold text-cream">
                ${meal.price}
              </span>
            </div>

            <div className="size-10 rounded-full bg-caramel/10 flex items-center justify-center text-caramel transition-all duration-300 group-hover:bg-caramel group-hover:text-brownie">
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
