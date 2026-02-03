"use client";

import { IMeal } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { Edit3, Trash2, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
// Import the handlers
import {
  handleDeleteTrigger,
  toggleAvailability,
} from "@/handlers/providerHandlers/MyMealToasts";

export default function MyMeals({ meals }: { meals: IMeal[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      <AnimatePresence mode="popLayout">
        {meals.map((meal, index) => (
          <motion.div
            key={meal.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
            transition={{
              delay: index * 0.05,
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className="group relative bg-card border border-border/40 rounded-[2.5rem] overflow-hidden hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5"
          >
            {/* Image Overlay */}
            <div className="relative h-56 w-full overflow-hidden">
              <Image
                src={meal.imageUrl}
                alt={meal.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />

              {/* Availability Toggle */}
              <button
                onClick={() => toggleAvailability(meal)}
                className={`absolute top-4 right-4 p-3 rounded-2xl backdrop-blur-md border border-white/10 transition-all active:scale-90 ${
                  meal.isAvailable
                    ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/20"
                    : "bg-rose-500/20 text-cream border-rose-500/20"
                }`}
              >
                {meal.isAvailable ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>

            <div className="p-8 space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-serif font-bold text-cream group-hover:text-primary transition-colors truncate pr-2">
                  {meal.name}
                </h3>
                <p className="text-xl font-bold text-primary shrink-0">
                  ${meal.price.toFixed(2)}
                </p>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2 italic min-h-[40px]">
                {meal.description}
              </p>

              {/* Controls */}
              <div className="flex gap-4 pt-4 border-t border-border/20">
                <Link
                  href={`/provider-dashboard/my-menu/update-menu?mealId=${meal.id}`}
                  className="flex-1 h-12 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center gap-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-bold text-xs uppercase tracking-widest"
                >
                  <Edit3 size={14} /> Update
                </Link>
                <button
                  onClick={() => handleDeleteTrigger(meal.id)}
                  className="h-12 w-12 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all duration-300 active:scale-95"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
