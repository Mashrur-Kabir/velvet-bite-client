"use client";
import { motion } from "framer-motion";
import { ICategory } from "@/types";
import { ChevronRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface CategoryCardProps {
  category: ICategory;
  index: number;
}

export default function CategoryCard({ category, index }: CategoryCardProps) {
  // Get first letter for the unique background watermark
  const firstLetter = category.name.charAt(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="h-full"
    >
      <Link
        href={`/meals?categoryId=${category.id}`}
        className="group relative flex flex-col justify-between h-64 p-8 rounded-[2rem] border border-caramel/10 bg-[#2D1B16]/40 backdrop-blur-md overflow-hidden transition-all duration-500 hover:border-caramel/40 hover:bg-[#2D1B16]/80 shadow-xl"
      >
        {/* Unique Background Watermark */}
        <div className="absolute -right-4 -top-8 select-none pointer-events-none">
          <span className="text-[12rem] font-serif font-bold text-caramel/[0.03] group-hover:text-caramel/[0.06] transition-colors duration-700 leading-none">
            {firstLetter}
          </span>
        </div>

        {/* Top Section */}
        <div className="flex gap-3 items-start relative z-10">
          <div className="size-12 rounded-2xl border border-caramel/20 flex items-center justify-center text-caramel transition-all duration-500 group-hover:bg-caramel group-hover:text-[#794416] group-hover:rotate-[15deg]">
            <ArrowUpRight size={20} />
          </div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-cream font-bold group-hover:text-caramel transition-colors">
            {index + 1 < 10 ? `0${index + 1}` : index + 1}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="space-y-4 relative z-10">
          <div className="space-y-1">
            <h3 className="text-3xl font-serif font-bold text-cream tracking-tight transition-transform duration-500 group-hover:translate-x-1">
              {category.name}
            </h3>
            <div className="h-0.5 w-0 bg-caramel group-hover:w-12 transition-all duration-500 ease-out" />
          </div>

          <div className="flex items-center gap-2 text-primary opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
            <span className="text-[10px] uppercase font-black tracking-[0.2em]">
              Explore Menu
            </span>
            <ChevronRight size={14} />
          </div>
        </div>

        {/* Animated Velvet Gradient Ring */}
        <div className="absolute inset-0 border-[3px] border-transparent group-hover:border-caramel/10 rounded-[2rem] transition-all duration-700 pointer-events-none" />
      </Link>
    </motion.div>
  );
}
