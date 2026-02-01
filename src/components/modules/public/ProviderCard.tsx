"use client";

import { IProvider } from "@/types/moduleTypes/provider.type";
import { motion } from "framer-motion";
import { ChefHat, MapPin, Phone, ArrowUpRight } from "lucide-react";
import Link from "next/link";

// 1. Add the index to your props interface
interface ProviderCardProps {
  provider: IProvider;
  index: number;
}

// 2. Destructure the index here
export default function ProviderCard({ provider, index }: ProviderCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      // Use the index to stagger the entry
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.1, 1),
        ease: "easeOut",
      }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Link
        href={`/providers/${provider.id}`}
        className="group relative flex flex-col h-full p-8 rounded-[2.5rem] border border-caramel/10 bg-[#2D1B16]/20 backdrop-blur-xl transition-all duration-500 hover:border-caramel/40 hover:bg-[#2D1B16]/40 overflow-hidden shadow-xl"
      >
        {/* Animated Background Glow */}
        <div className="absolute -right-10 -top-10 size-40 bg-caramel/5 blur-[80px] group-hover:bg-caramel/10 transition-colors" />

        <div className="flex justify-between items-start mb-8">
          <div className="size-14 rounded-2xl bg-caramel/10 flex items-center justify-center text-caramel transition-all duration-500 group-hover:bg-caramel group-hover:text-brownie group-hover:rotate-12 group-hover:shadow-[0_0_20px_rgba(192,133,82,0.4)]">
            <ChefHat className="size-7" />
          </div>
          <div className="size-10 rounded-full border border-caramel/20 flex items-center justify-center text-caramel opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
            <ArrowUpRight className="size-5" />
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <div>
            <h3 className="text-2xl font-serif font-bold text-cream group-hover:text-caramel transition-colors">
              {provider.name}
            </h3>
            <div className="flex items-center gap-2 mt-2 text-caramel/40">
              <MapPin className="size-3" />
              <span className="text-[10px] uppercase tracking-widest font-bold">
                {provider.address}
              </span>
            </div>
          </div>

          <p className="text-sm text-cream/60 line-clamp-3 leading-relaxed font-light italic">
            “{provider.description}”
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-caramel/5 flex items-center gap-4 text-cream/40 group-hover:text-cream transition-colors">
          <Phone className="size-4" />
          <span className="text-xs font-medium tracking-tighter">
            {provider.phone}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
