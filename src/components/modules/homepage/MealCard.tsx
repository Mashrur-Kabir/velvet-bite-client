"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, ShoppingCart, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface MealProps {
  id: string;
  name: string;
  price: number;
  category: string;
  provider: string;
  rating: number;
  image: string;
  prepTime: string;
}

export function MealCard({ meal }: { meal: MealProps }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group overflow-hidden rounded-3xl bg-card border border-border shadow-sm hover:shadow-xl transition-all"
    >
      {/* Image Container */}
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={meal.image}
          alt={meal.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4">
          <Badge className="bg-background/80 text-foreground backdrop-blur-md border-none">
            {meal.category}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-primary flex items-center gap-1 uppercase tracking-widest">
            <Clock className="size-3" /> {meal.prepTime}
          </span>
          <div className="flex items-center gap-1 text-sm font-bold text-brownie dark:text-cream">
            <Star className="size-4 fill-yellow-500 text-yellow-500" />{" "}
            {meal.rating}
          </div>
        </div>

        <h3 className="text-xl font-serif font-bold text-brownie dark:text-cream mb-1 line-clamp-1">
          {meal.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">by {meal.provider}</p>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-2xl font-bold text-brownie dark:text-cream">
            ${meal.price.toFixed(2)}
          </span>
          <Button
            size="icon"
            className="rounded-full bg-primary hover:bg-caramel text-white active:scale-90 transition-all shadow-lg shadow-primary/20"
          >
            <ShoppingCart className="size-5" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
