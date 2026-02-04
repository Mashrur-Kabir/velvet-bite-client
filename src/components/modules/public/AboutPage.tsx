"use client";

import { motion } from "framer-motion";
import { ChefHat, ChevronLeft, Leaf, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const values = [
    {
      icon: <ChefHat />,
      title: "Artisan Quality",
      desc: "Every kitchen is hand-picked for culinary excellence.",
    },
    {
      icon: <Leaf />,
      title: "Fresh Ingredients",
      desc: "Ingredients sourced daily to ensure the velvet texture in every bite.",
    },
    {
      icon: <ShieldCheck />,
      title: "Secure Dining",
      desc: "Advanced safety protocols from kitchen to doorstep.",
    },
  ];

  return (
    <div className="space-y-24 py-20">
      <section className="text-center space-y-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 mb-12 text-[12px] uppercase font-bold tracking-[0.3em] text-cream/40 hover:text-cream transition-all duration-300 group animate-metadata"
        >
          <ChevronLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Return Home
        </Link>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-serif font-bold text-cream"
        >
          Our <span className="text-caramel italic">Mission</span>
        </motion.h1>
        <p className="max-w-2xl mx-auto text-muted-foreground leading-relaxed italic font-serif">
          “Redefining the foodie experience through precision, elegance, and
          artisanal care.”
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 container mx-auto">
        {values.map((v, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -10 }}
            className="p-10 rounded-[2.5rem] bg-card/30 border border-caramel/10 text-center space-y-4"
          >
            <div className="size-12 mx-auto bg-caramel/10 rounded-2xl flex items-center justify-center text-caramel">
              {v.icon}
            </div>
            <h3 className="text-xl font-bold text-cream">{v.title}</h3>
            <p className="text-sm text-muted-foreground">{v.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
