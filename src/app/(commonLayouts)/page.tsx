"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  ArrowRight,
  Flame,
  Crown,
  Leaf,
  Soup,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MealCard } from "@/components/modules/homepage/MealCard";
import { cn } from "@/lib/utils";

// Mock Data for "Trending Now" Section
const TRENDING_MEALS = [
  {
    id: "1",
    name: "Velvet Truffle Pasta",
    price: 18.5,
    category: "Italian",
    provider: "The Italian Bistro",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856",
    prepTime: "20-25 min",
  },
  {
    id: "2",
    name: "Golden Caramel Glaze Donut",
    price: 4.25,
    category: "Bakery",
    provider: "Velvet Sweets",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307",
    prepTime: "5-10 min",
  },
  {
    id: "3",
    name: "Roasted Coffee Bean Bowl",
    price: 12.0,
    category: "Healthy",
    provider: "Coffee House",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772",
    prepTime: "15-20 min",
  },
];

const CATEGORIES = [
  {
    name: "Trending",
    icon: <Flame className="size-6" />,
    color: "text-orange-500",
  },
  {
    name: "Popular",
    icon: <Crown className="size-6" />,
    color: "text-yellow-500",
  },
  {
    name: "Healthy",
    icon: <Leaf className="size-6" />,
    color: "text-green-500",
  },
  {
    name: "Cuisines",
    icon: <Soup className="size-6" />,
    color: "text-primary",
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative flex min-h-[90vh] items-center justify-center px-6 py-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/images/home/homeWallpaper.png"
            alt="Velvet Bite Background"
            fill
            priority
            className="object-cover brightness-[0.35]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-background" />
        </div>

        <div className="container relative z-10 mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <h1 className="mb-6 text-6xl font-extrabold tracking-tight text-[#F3E9DC] md:text-8xl">
              Savor the{" "}
              <span className="text-primary font-serif italic">Velvet</span> in
              Every Bite
            </h1>
            <p className="mb-10 text-lg text-[#F3E9DC]/80 md:text-2xl font-sans font-medium">
              Discover local favorites and order delicious meals directly to
              your doorstep.
            </p>

            <div className="mx-auto flex w-full max-w-2xl items-center gap-2 rounded-full bg-white/10 p-2 backdrop-blur-xl border border-white/20 shadow-2xl transition-all focus-within:bg-white/15">
              <div className="flex flex-1 items-center px-4">
                <Search className="mr-2 size-5 text-[#F3E9DC]/60" />
                <Input
                  type="text"
                  placeholder="Search for meals or restaurants..."
                  className="border-none bg-transparent text-[#F3E9DC] placeholder:text-[#F3E9DC]/60 focus-visible:ring-0 text-lg"
                />
              </div>
              <Button
                asChild
                className="rounded-full bg-primary px-10 py-6 text-lg font-bold hover:bg-caramel transition-all active:scale-95 shadow-lg"
              >
                <Link href="/meals">Explore</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="relative z-20 bg-background">
        {/* 2. QUICK CATEGORIES SECTION */}
        <section className="container mx-auto -mt-16 px-6 pb-20">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={`/meals?category=${cat.name.toLowerCase()}`}
                  className="group relative flex h-40 flex-col items-center justify-center gap-4 overflow-hidden rounded-3xl bg-card border border-border transition-all hover:border-primary/40 hover:shadow-2xl active:scale-95"
                >
                  <div
                    className={cn(
                      "rounded-2xl bg-muted p-4 transition-transform group-hover:scale-110 group-hover:rotate-6",
                      cat.color,
                    )}
                  >
                    {cat.icon}
                  </div>
                  <span className="font-serif text-lg font-bold text-foreground">
                    {cat.name}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 3. TRENDING MEALS SECTION */}
        <section className="container mx-auto px-6 py-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-4xl md:text-5xl font-serif font-bold text-brownie dark:text-cream"
              >
                Trending Now
              </motion.h2>
              <p className="text-muted-foreground text-lg mt-2">
                The most ordered bites this week.
              </p>
            </div>
            <Button
              asChild
              variant="ghost"
              className="text-primary font-bold hover:text-caramel group"
            >
              <Link href="/meals" className="flex items-center">
                Browse All Meals{" "}
                <ChevronRight className="ml-1 size-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {TRENDING_MEALS.map((meal) => (
              <MealCard key={meal.id} meal={meal} />
            ))}
          </div>
        </section>

        {/* 4. CTA CONVERSION SECTION */}
        <section className="container mx-auto px-6 py-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="rounded-[3rem] bg-brownie p-12 md:p-20 text-cream shadow-2xl text-center relative overflow-hidden"
          >
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <div className="absolute top-0 left-0 w-64 h-64 bg-cream rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            </div>

            <h2 className="relative z-10 mb-6 text-4xl font-bold md:text-6xl font-serif">
              Join the <span className="text-primary italic">Velvet</span>{" "}
              Community
            </h2>
            <p className="relative z-10 mb-12 text-cream/70 text-lg md:text-xl max-w-2xl mx-auto">
              Whether you are a foodie looking for the next bite or a provider
              ready to share your menu, we have a place for you.
            </p>
            <div className="relative z-10 flex flex-wrap justify-center gap-6">
              <Button
                asChild
                size="lg"
                className="bg-primary text-white hover:bg-caramel rounded-full px-12 py-7 text-lg font-bold shadow-xl shadow-primary/20"
              >
                <Link href="/register">Start Ordering</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-cream/20 text-cream hover:bg-cream/10 rounded-full px-12 py-7 text-lg font-bold"
              >
                <Link href="/register?role=provider">Become a Provider</Link>
              </Button>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
