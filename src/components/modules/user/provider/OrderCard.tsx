"use client";

import { IOrder } from "@/types";
import { motion } from "framer-motion";
import { Package, MapPin, User, ShoppingBag } from "lucide-react";

export default function OrderCard({ order }: { order: IOrder }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-card/40 backdrop-blur-md border border-border/40 rounded-[2.5rem] p-10 space-y-8"
    >
      {/* --- HEADER SECTION --- */}
      <div className="flex justify-between items-start border-b border-border/20 pb-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-serif font-bold text-cream">
            Order Ref: {order.id.slice(-6).toUpperCase()}
          </h2>
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-primary animate-pulse" />
            <p className="text-[10px] text-primary font-bold uppercase tracking-[0.3em]">
              Order Status: {order.status}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-cream/40 uppercase font-bold tracking-widest">
            Total Amount
          </p>
          <p className="text-4xl font-serif font-bold text-primary">
            ${order.totalAmount.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* --- CUSTOMER & DELIVERY INFO --- */}
        <div className="space-y-8">
          <section className="space-y-4">
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-cream/60 font-bold flex items-center gap-2">
              <User size={14} className="text-primary" /> Customer Brief
            </h3>
            <div className="p-6 bg-background/50 rounded-3xl border border-border/20 group hover:border-primary/30 transition-colors duration-500">
              <p className="text-lg font-serif text-cream">
                {order.customer?.name || "Anonymous Partner"}
              </p>
              <p className="text-sm text-cream/40 italic">
                {order.customer?.email || "No email provided"}
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-cream/60 font-bold flex items-center gap-2">
              <MapPin size={14} className="text-primary" /> Delivery Location
            </h3>
            <div className="pl-2 border-l-2 border-primary/20">
              <p className="text-sm text-cream/80 leading-relaxed italic">
                {order.deliveryAddress}
              </p>
            </div>
          </section>
        </div>

        {/* --- ITEM ORCHESTRATION --- */}
        <div className="space-y-4">
          <h3 className="text-[10px] uppercase tracking-[0.2em] text-cream/60 font-bold flex items-center gap-2">
            <Package size={14} className="text-primary" /> Items Ordered:
          </h3>
          <div className="space-y-3">
            {order.items.map((item, idx) => (
              <div
                key={item.id || idx}
                // Added 'group' to handle nested hover effects
                className="group flex justify-between items-center p-5 bg-background/60 rounded-2xl border border-border/10 hover:bg-cream transition-all duration-500 cursor-default"
              >
                <div className="flex items-center gap-4">
                  <div className="size-10 rounded-xl bg-primary/5 flex items-center justify-center border border-primary/10 group-hover:bg-[#1A0F0D]/20 group-hover:border-[#1A0F0D]/20 transition-all duration-500">
                    <ShoppingBag
                      size={16}
                      className="text-primary/60 group-hover:text-[#1A0F0D]"
                    />
                  </div>
                  <div>
                    {/* Meal name transitions to Deep Brown */}
                    <p className="text-sm font-bold text-cream group-hover:text-[#1A0F0D] transition-colors duration-500">
                      {item.meal?.name}
                    </p>
                    {/* Qty transitions to Brownie */}
                    <p className="text-[12px] text-primary uppercase tracking-widest group-hover:text-[#481b0f] transition-colors duration-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                {/* Price transitions to Deep Brown with lower opacity */}
                <p className="text-sm font-serif text-cream/60 group-hover:text-[#1A0F0D] transition-colors duration-500">
                  ${((item.price ?? 0) * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
