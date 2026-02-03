"use client";

import { getAllOrdersAction } from "@/actions/admin.action";
import AllOrderCard from "@/components/modules/user/admin/orders/AllOrderCard";
import { ShoppingBag, DollarSign, Activity, LayoutList } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { IOrder } from "@/types";

export default function AllOrdersPage() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch logic moved to client-compatible pattern if needed,
  // but keeping the server action logic for performance
  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await getAllOrdersAction();
      if (data) {
        const sorted = data.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        setOrders(sorted);
      }
      setIsLoading(false);
    };
    fetchOrders();
  }, []);

  const totalVolume = orders.reduce((acc, curr) => acc + curr.totalAmount, 0);
  const activeTransmissions = orders.filter(
    (o) => o.status !== "DELIVERED" && o.status !== "CANCELLED",
  ).length;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  if (isLoading) return null; // Or a shimmer loader

  return (
    <div className="max-w-7xl mx-auto py-16 px-6 space-y-12">
      <motion.header
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-2"
      >
        <div className="flex items-center gap-3">
          <LayoutList className="text-primary size-8" />
          <h1 className="text-5xl font-serif font-bold text-cream tracking-tight">
            Velvet <span className="text-primary italic">Orders</span>
          </h1>
        </div>
        <p className="text-muted-foreground uppercase tracking-[0.4em] text-[10px] font-bold opacity-60">
          Platform-wide logistics orchestration
        </p>
      </motion.header>

      {/* --- LOGISTICS STATS --- */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {[
          {
            label: "Total Volume",
            val: `$${totalVolume.toLocaleString()}`,
            icon: DollarSign,
            color: "text-emerald-500",
          },
          {
            label: "Active Streams",
            val: activeTransmissions,
            icon: Activity,
            color: "text-amber-500",
          },
          {
            label: "Order Count",
            val: orders.length,
            icon: ShoppingBag,
            color: "text-primary",
          },
        ].map((stat, i) => (
          <motion.div key={i} variants={itemVariants}>
            <Card className="bg-card border-border/40 rounded-[2.5rem] overflow-hidden group hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 cursor-default relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardContent className="p-8 flex items-center justify-between relative z-10">
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
                    {stat.label}
                  </p>
                  <h3 className="text-3xl font-bold text-cream group-hover:text-primary transition-colors duration-500 leading-none">
                    {stat.val}
                  </h3>
                </div>
                <div
                  className={`p-4 rounded-2xl bg-background/50 border border-border/20 ${stat.color} group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-inner`}
                >
                  <stat.icon size={24} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* --- LIVE TRANSMISSION STREAM --- */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {orders.length > 0 ? (
          orders.map((order) => (
            <motion.div key={order.id} variants={itemVariants}>
              <AllOrderCard order={order} />
            </motion.div>
          ))
        ) : (
          <div className="py-32 text-center border border-dashed border-border/40 rounded-[3rem] bg-card/5">
            <p className="font-serif italic text-cream/30 text-lg">
              The transmission stream is currently vacant.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
