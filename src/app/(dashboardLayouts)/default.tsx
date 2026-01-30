"use client";

import { motion, Variants } from "framer-motion";
import { ChefHat } from "lucide-react";

export default function DashboardDefault() {
  const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="flex h-[calc(100vh-120px)] items-center justify-center p-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative w-full max-w-2xl overflow-hidden rounded-[3rem] border border-caramel/10 bg-card/30 p-12 text-center backdrop-blur-md shadow-velvet"
      >
        {/* Decorative Background Icon */}
        <div className="absolute -right-8 -top-8 opacity-[0.03]">
          <ChefHat size={300} className="rotate-12 text-brownie" />
        </div>

        <div className="relative z-10 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-caramel/80">
              Est. 2024
            </span>
            <h1 className="mt-4 font-serif text-5xl font-bold text-brownie dark:text-cream md:text-6xl">
              Velvet Bite
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mx-auto h-px w-24 bg-gradient-to-r from-transparent via-caramel/40 to-transparent"
          />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-lg italic text-muted-foreground"
          >
            “Where flavor meets the fine art of dining”
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-sm text-muted-foreground/60"
          >
            Select an option from the sidebar to begin your journey.
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
