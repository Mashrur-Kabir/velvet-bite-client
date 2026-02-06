"use client";

import { motion } from "framer-motion";
import { ShoppingBag, DollarSign, Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import AllOrderCard from "./AllOrderCard";
import { IOrder } from "@/types";

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function AllOrdersClientWrapper({
  orders,
}: {
  orders: IOrder[];
}) {
  const totalVolume = orders.reduce((acc, curr) => acc + curr.totalAmount, 0);
  const activeTransmissions = orders.filter(
    (o) => o.status !== "DELIVERED" && o.status !== "CANCELLED",
  ).length;

  const stats = [
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
  ];

  return (
    <div className="space-y-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {stats.map((stat, i) => (
          <motion.div key={i} variants={itemVariants}>
            <Card className="bg-card border-border/40 rounded-[2.5rem] group hover:border-primary/40 transition-all duration-500 relative overflow-hidden">
              <CardContent className="p-8 flex items-center justify-between relative z-10">
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
                    {stat.label}
                  </p>
                  <h3 className="text-3xl font-bold text-cream group-hover:text-primary transition-colors leading-none">
                    {stat.val}
                  </h3>
                </div>
                <div
                  className={`p-4 rounded-2xl bg-background/50 border border-border/20 ${stat.color} group-hover:scale-110 transition-all shadow-inner`}
                >
                  <stat.icon size={24} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

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
          <div className="py-32 text-center border border-dashed border-border/40 rounded-[3rem] bg-card/5 italic text-cream/30 text-lg">
            The transmission stream is currently vacant.
          </div>
        )}
      </motion.div>
    </div>
  );
}
