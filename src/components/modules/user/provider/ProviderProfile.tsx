"use client";

import { IUser, IProvider } from "@/types";
import { motion } from "framer-motion";
import {
  Store,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShieldCheck,
  UtensilsCrossed,
  PackageCheck,
} from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";

export default function ProviderProfile({
  user,
  provider,
}: {
  user: IUser;
  provider: IProvider;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* --- IDENTITY HERO --- */}
      <section className="relative p-12 bg-gradient-to-br from-card to-background rounded-[3.5rem] border border-border/50 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-10 opacity-5 -rotate-12 pointer-events-none">
          <Store size={240} />
        </div>

        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 relative z-10">
          <div className="size-44 rounded-[2.5rem] bg-background/80 border border-primary/20 p-1.5 shadow-inner group">
            <div className="size-full rounded-[2.2rem] bg-gradient-to-tr from-primary to-amber-900 flex items-center justify-center text-6xl font-serif text-cream uppercase shadow-lg group-hover:scale-105 transition-transform duration-700">
              {provider.name.charAt(0)}
            </div>
          </div>

          <div className="flex-1 space-y-6 text-center lg:text-left">
            <div>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-2">
                <h1 className="text-5xl font-serif font-bold text-cream tracking-tight">
                  {provider.name}
                </h1>
                <div className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] text-primary font-black tracking-widest uppercase flex items-center gap-2">
                  <ShieldCheck size={14} /> Verified Provider
                </div>
              </div>
              <p className="text-cream/40 font-serif italic text-lg max-w-xl">
                {provider.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12 pt-6 border-t border-cream/5">
              <div className="flex items-center gap-3 text-cream/60">
                <Mail size={16} className="text-primary/60" />
                <span className="text-sm font-medium">{user.email}</span>
              </div>
              <div className="flex items-center gap-3 text-cream/60">
                <Phone size={16} className="text-primary/60" />
                <span className="text-sm font-medium">{provider.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-cream/60">
                <MapPin size={16} className="text-primary/60" />
                <span className="text-sm font-medium">{provider.address}</span>
              </div>
              <div className="flex items-center gap-3 text-cream/60">
                <Calendar size={16} className="text-primary/60" />
                <span className="text-sm font-medium">
                  Established{" "}
                  {format(new Date(provider.createdAt), "MMMM yyyy")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- OPERATIONAL METRICS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            label: "Active Recipes",
            val: provider.meals?.length || 0,
            icon: UtensilsCrossed,
          },
          {
            label: "Orders Being Handled",
            val: user._count?.orders || 0,
            icon: PackageCheck,
          },
          { label: "Member Status", val: user.status, icon: ShieldCheck },
        ].map((stat, i) => (
          <div
            key={i}
            className="p-8 rounded-[2.5rem] bg-card/40 border border-border/30 hover:border-primary/40 transition-all duration-500 group"
          >
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest text-cream/30 font-bold">
                  {stat.label}
                </p>
                <p className="text-3xl font-serif font-bold text-cream group-hover:text-primary transition-colors">
                  {stat.val}
                </p>
              </div>
              <div className="size-12 rounded-2xl bg-background/50 flex items-center justify-center border border-border/20 text-primary/60 group-hover:text-primary transition-colors">
                <stat.icon size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- REGISTERED RECIPES SHOWCASE --- */}
      {provider.meals && provider.meals.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center gap-3 px-2">
            <UtensilsCrossed size={20} className="text-primary" />
            <h2 className="text-2xl font-serif font-bold text-cream">
              Culinary Showcase
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {provider.meals.slice(0, 4).map((meal) => (
              <div
                key={meal.id}
                className="aspect-square relative rounded-3xl overflow-hidden border border-border/40 group shadow-lg"
              >
                <Image
                  src={meal.imageUrl}
                  alt={meal.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4">
                  <p className="text-xs font-bold text-cream truncate">
                    {meal.name}
                  </p>
                  <p className="text-[10px] text-primary font-bold tracking-widest">
                    ${meal.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </motion.div>
  );
}
