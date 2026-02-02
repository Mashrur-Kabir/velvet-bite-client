"use client";

import { IProvider } from "@/types";
import { motion } from "framer-motion";
import { MapPin, Phone, ShieldCheck, Store } from "lucide-react";

export default function ProviderProfileCard({
  provider,
}: {
  provider: IProvider;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      className="group relative p-6 bg-card border border-border rounded-[2rem] shadow-2xl transition-all duration-500 hover:border-primary/30"
    >
      {/* Decorative Glow */}
      <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />

      <div className="flex items-start gap-5">
        <div className="size-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
          <Store className="text-primary size-7 group-hover:scale-110 transition-transform duration-500" />
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-serif font-bold text-cream">
                {provider.name}
              </h3>
              {provider.isActive && (
                <ShieldCheck className="text-primary size-4" />
              )}
            </div>
            <p className="text-xs text-muted-foreground line-clamp-1 italic">
              {provider.description}
            </p>
          </div>

          <div className="space-y-1.5 border-t border-border pt-3">
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground uppercase tracking-wider">
              <MapPin size={12} className="text-primary/60" />
              {provider.address}
            </div>
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground uppercase tracking-wider">
              <Phone size={12} className="text-primary/60" />
              {provider.phone}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
