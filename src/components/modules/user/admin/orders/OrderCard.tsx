"use client";

import { IOrder } from "@/types";
import { motion } from "framer-motion";
import {
  Package,
  MapPin,
  User,
  Store,
  Clock,
  CheckCircle2,
  ShoppingBag,
  Hash,
} from "lucide-react";
import { format } from "date-fns";

export default function OrderCard({ order }: { order: IOrder }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-card/40 backdrop-blur-md border border-border/40 rounded-[3rem] p-10 space-y-10 shadow-premium-dark"
    >
      {/* --- PROTOCOL HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start border-b border-border/20 pb-8 gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 w-fit">
            <Hash size={12} className="text-primary" />
            <span className="text-[10px] font-black uppercase tracking-widest text-primary">
              Transmission ID: {order.id.toUpperCase()}
            </span>
          </div>
          <h2 className="text-4xl font-serif font-bold text-cream tracking-tight">
            Order Protocol:{" "}
            <span className="text-primary italic">{order.status}</span>
          </h2>
          <p className="text-[10px] text-cream/40 uppercase font-bold tracking-[0.4em] flex items-center gap-2">
            <Clock size={12} /> Registered on{" "}
            {format(new Date(order.createdAt), "PPP p")}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-cream/40 uppercase font-bold tracking-widest mb-1">
            Total Asset Value
          </p>
          <p className="text-5xl font-serif font-bold text-primary">
            ${order.totalAmount.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* --- PARTICIPANT BRIEF --- */}
        <div className="space-y-8">
          <section className="space-y-4">
            <h3 className="text-[10px] uppercase tracking-widest text-cream/60 font-bold flex items-center gap-2">
              <User size={14} className="text-primary" /> Customer Identity
            </h3>
            <div className="p-6 bg-background/50 rounded-3xl border border-border/20">
              <p className="text-lg font-serif text-cream">
                {order.customer?.name}
              </p>
              <p className="text-sm text-cream/40 italic">
                {order.customer?.email}
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-[10px] uppercase tracking-widest text-cream/60 font-bold flex items-center gap-2">
              <Store size={14} className="text-primary" /> Kitchen Provider
            </h3>
            <div className="p-6 bg-background/50 rounded-3xl border border-border/20">
              <p className="text-lg font-serif text-cream">
                {order.provider?.name}
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-[10px] uppercase tracking-widest text-cream/60 font-bold flex items-center gap-2">
              <MapPin size={14} className="text-primary" /> Delivery Logistics
            </h3>
            <p className="text-sm text-cream/80 leading-relaxed pl-2 border-l border-primary/30 italic">
              {order.deliveryAddress}
            </p>
          </section>
        </div>

        {/* --- ITEM ORCHESTRATION --- */}
        <div className="space-y-6">
          <h3 className="text-[10px] uppercase tracking-widest text-cream/60 font-bold flex items-center gap-2">
            <Package size={14} className="text-primary" /> Manifest
          </h3>
          <div className="space-y-3">
            {order.items.map((item, idx) => {
              // Logic: Ensure we have a valid numeric price for calculations
              const unitPrice = item.price ?? 0;
              const subtotal = unitPrice * item.quantity;

              return (
                <div
                  key={item.id || idx}
                  className="flex justify-between items-center p-5 bg-background/30 rounded-2xl border border-border/10 hover:bg-primary/20 transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div className="size-10 rounded-xl bg-primary/5 flex items-center justify-center border border-border/10">
                      <ShoppingBag
                        size={16}
                        className="text-primary/40 group-hover:text-primary transition-colors"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-cream">
                        {item.meal?.name || "Recipe Restricted"}
                      </p>
                      <p className="text-[10px] text-primary uppercase font-bold tracking-widest">
                        Qty: {item.quantity} × ${unitPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-serif text-cream/60">
                    ${subtotal.toFixed(2)}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Subtle Order Completion UI */}
          {order.status === "DELIVERED" && (
            <div className="mt-8 p-6 rounded-3xl bg-emerald-500/5 border border-emerald-500/10 flex items-center gap-4">
              <div className="size-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest">
                  Protocol Success
                </p>
                <p className="text-[10px] text-emerald-500/60">
                  Asset delivery confirmed at{" "}
                  {format(new Date(order.updatedAt), "hh:mm a")}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
