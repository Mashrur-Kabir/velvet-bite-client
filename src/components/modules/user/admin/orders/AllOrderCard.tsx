"use client";

import { IOrder } from "@/types";
import { motion } from "framer-motion";
import { MapPin, User, Store, ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export default function AllOrderCard({ order }: { order: IOrder }) {
  const statusColors = {
    PLACED: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    PREPARING: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    READY: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    DELIVERED: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    CANCELLED: "bg-rose-500/10 text-rose-500 border-rose-500/20",
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-card/40 backdrop-blur-md border border-border/40 rounded-[2.2rem] p-8 group transition-all duration-500 hover:border-primary/40"
    >
      <div className="flex flex-col xl:flex-row justify-between gap-8">
        <div className="flex-1 space-y-6">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-xl font-serif font-bold text-cream">
              Ref: #{order.id.slice(-6).toUpperCase()}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${statusColors[order.status]}`}
            >
              {order.status}
            </span>
            <span className="text-[10px] text-cream/20 flex items-center gap-1">
              <Clock size={12} />{" "}
              {format(new Date(order.createdAt), "MMM d, hh:mm a")}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-3 text-sm text-cream/60">
              <User size={16} className="text-primary/60" />
              <span className="truncate">
                Client: <b className="text-cream">{order.customer?.name}</b>
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm text-cream/60">
              <Store size={16} className="text-primary/60" />
              <span className="truncate">
                Provider: <b className="text-cream">{order.provider?.name}</b>
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm text-cream/60 md:col-span-2">
              <MapPin size={16} className="text-primary/60" />
              <span className="truncate italic">{order.deliveryAddress}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-row xl:flex-col items-center justify-between xl:justify-center gap-4 border-t xl:border-t-0 xl:border-l border-white/5 pt-6 xl:pt-0 xl:pl-8">
          <div className="text-right xl:text-center">
            <p className="text-[10px] uppercase font-bold tracking-widest text-cream/40">
              Investment
            </p>
            <p className="text-3xl font-serif font-bold text-primary">
              ${order.totalAmount.toFixed(2)}
            </p>
          </div>
          <Link
            href={`/admin-dashboard/all-orders/${order.id}`}
            className="size-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-xl shadow-primary/5"
          >
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
