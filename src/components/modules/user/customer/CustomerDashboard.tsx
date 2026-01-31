"use client";

import { motion } from "framer-motion";
import {
  ShoppingBag,
  Clock,
  Star,
  ArrowRight,
  Utensils,
  Heart,
  Soup,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function CustomerDashboard() {
  const { data: session } = authClient.useSession();
  const userName = session?.user?.name || "Guest";

  const quickStats = [
    {
      title: "Active Orders",
      value: "2",
      icon: ShoppingBag,
      color: "text-amber-600",
    },
    {
      title: "Total Spent",
      value: "$128.50",
      icon: Clock,
      color: "text-brownie",
    },
    { title: "Reviews Left", value: "8", icon: Star, color: "text-yellow-600" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-8 max-w-7xl mx-auto"
    >
      {/* --- WELCOME HERO --- */}
      <motion.section variants={itemVariants}>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-brownie p-8 md:p-12 text-cream shadow-velvet">
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Bon Appétit, {userName}!
            </h1>
            <p className="text-cream/80 text-lg mb-8 max-w-lg leading-relaxed">
              Ready for your next culinary adventure? Explore fresh flavors from
              the best kitchens in the community.
            </p>
            <div className="flex flex-wrap gap-4">
              {/* 1. THE "BROWSE MENU" LAUNCHER: Unique Scale + Icon Slide */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button
                  asChild
                  className="group relative bg-amber-700 hover:bg-amber-900 text-white hover:text-amber-400 font-bold rounded-full px-12 py-6 transition-all duration-300 shadow-lg hover:shadow-amber-900/40 overflow-hidden"
                >
                  <Link
                    href="/meals"
                    className="flex items-center justify-center"
                  >
                    {/* INITIAL TEXT & ARROW: Fades and slides right on hover */}
                    <motion.div className="flex items-center gap-2 transition-all duration-500 ease-in-out group-hover:translate-x-12 group-hover:opacity-0">
                      <span>Browse Menu</span>
                      <ArrowRight className="size-5" />
                    </motion.div>

                    {/* LUCIDE ICON: Arrives from left to center with glow effect */}
                    <div className="absolute inset-0 flex items-center justify-center translate-x-[-100%] opacity-0 transition-all duration-700 ease-in-out group-hover:translate-x-0 group-hover:opacity-100">
                      <Soup className="size-5 text-amber-400 transition-all duration-700 [filter:url(#velvet-glow)]" />
                    </div>
                  </Link>
                </Button>
              </motion.div>

              {/* 2. THE "TRACK ORDER" SCANNER: Glass Morphism + Glow Border */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button
                  asChild
                  variant="outline"
                  className={cn(
                    "relative rounded-full px-8 py-6 border-cream/20 text-cream overflow-hidden transition-all duration-500",
                    "hover:border-amber-400 hover:bg-transparent group",
                  )}
                >
                  <Link href="/dashboard/orders">
                    {/* Unique Background Scanner Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cream/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

                    <span className="relative z-10 flex items-center gap-2">
                      Track Last Order
                      <div className="size-1.5 rounded-full bg-amber-400 group-hover:animate-ping" />
                    </span>
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
          <Utensils className="absolute -right-16 -bottom-16 size-80 text-cream/5 -rotate-12" />
        </div>
      </motion.section>

      {/* --- STATS GRID --- */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {quickStats.map((stat) => (
          <Card
            key={stat.title}
            className="border-none shadow-premium-dark rounded-3xl bg-card/50 backdrop-blur-sm overflow-hidden group hover:scale-[1.02] transition-transform duration-300"
          >
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-[0.2em] mb-1">
                  {stat.title}
                </p>
                <h3 className="text-3xl font-bold text-brownie dark:text-cream">
                  {stat.value}
                </h3>
              </div>
              <div
                className={cn(
                  "p-4 rounded-2xl bg-muted/50 transition-colors group-hover:bg-primary/10",
                  stat.color,
                )}
              >
                <stat.icon className="size-6" />
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* --- RECENT ACTIVITY & FAVORITES --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Active Order Preview */}
        <motion.section variants={itemVariants}>
          <Card className="rounded-[2.5rem] border-border/50 bg-card p-8 h-full">
            <h4 className="text-xl font-serif font-bold mb-6 text-brownie dark:text-cream flex items-center gap-2">
              <ShoppingBag className="size-5 text-caramel" /> Current Cravings
            </h4>
            <div className="space-y-6">
              {/* This would be a dynamic list in the future */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/30 border border-dashed border-border">
                <div className="size-12 rounded-xl bg-muted flex items-center justify-center">
                  <Clock className="size-6 text-muted-foreground animate-pulse" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-brownie dark:text-cream">
                    Your orders are being synced...
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Checking with the Velvet Kitchen
                  </p>
                </div>
              </div>
              <Button
                asChild
                variant="ghost"
                className="w-full text-primary hover:bg-primary/5 rounded-xl"
              >
                <Link href="/dashboard/orders">View all order history</Link>
              </Button>
            </div>
          </Card>
        </motion.section>

        {/* Favorite Providers Preview */}
        <motion.section variants={itemVariants}>
          <Card className="rounded-[2.5rem] border-border/50 bg-card p-8 h-full">
            <h4 className="text-xl font-serif font-bold mb-6 text-brownie dark:text-cream flex items-center gap-2">
              <Heart className="size-5 text-red-500 fill-red-500" /> Favorite
              Kitchens
            </h4>
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="size-20 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                <Utensils className="size-10 text-muted-foreground/30" />
              </div>
              <p className="text-muted-foreground max-w-xs mb-6">
                You haven&apos;t saved any providers yet. Discover your new
                favorites today.
              </p>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-caramel/30 text-caramel hover:bg-caramel/5"
              >
                <Link href="/providers">Explore Providers</Link>
              </Button>
            </div>
          </Card>
        </motion.section>
      </div>
    </motion.div>
  );
}

// Utility for clean classes
function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
