"use client";

import { motion } from "framer-motion";
import {
  Package,
  MapPin,
  Calendar,
  ChevronRight,
  Clock,
  CheckCircle2,
  Timer,
  ExternalLink,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const orders = [
  {
    id: "VB-9021",
    status: "In Progress",
    date: "May 12, 2026",
    total: "$42.50",
    items: ["Signature Velvet Brownies", "Espresso Macchiato"],
    provider: "The Cocoa Lab",
    estimate: "15-20 mins",
  },
  {
    id: "VB-8840",
    status: "Delivered",
    date: "May 10, 2026",
    total: "$18.00",
    items: ["Glazed Hazelnut Donut", "Iced Latte"],
    provider: "Morning Glow Bakery",
    estimate: null,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function MyOrdersComponent() {
  const activeOrders = orders.filter((o) => o.status === "In Progress");
  const pastOrders = orders.filter((o) => o.status === "Delivered");

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-5xl mx-auto space-y-12 pb-20"
    >
      {/* --- HEADER --- */}
      <motion.section
        variants={itemVariants}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-caramel/10 pb-8"
      >
        <div>
          <h1 className="text-4xl font-serif font-bold text-brownie dark:text-cream tracking-tight">
            My Cravings
          </h1>
          <p className="text-muted-foreground mt-2 font-medium">
            Manage your culinary journey and track active delights.
          </p>
        </div>
        <div className="flex gap-3">
          <Badge
            variant="outline"
            className="px-5 py-2 rounded-full border-amber-600/20 bg-amber-600/5 text-amber-600 font-bold"
          >
            {activeOrders.length} Active
          </Badge>
          <Badge
            variant="outline"
            className="px-5 py-2 rounded-full border-caramel/20 text-muted-foreground font-bold"
          >
            {pastOrders.length} Completed
          </Badge>
        </div>
      </motion.section>

      {/* --- ACTIVE ORDERS --- */}
      {activeOrders.length > 0 && (
        <motion.section variants={itemVariants} className="space-y-6">
          <div className="flex items-center gap-3 px-2">
            <div className="relative">
              <Timer className="size-5 text-amber-600" />
              <div className="absolute inset-0 size-5 bg-amber-600 blur-lg opacity-20 animate-pulse" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-brownie dark:text-cream">
              Happening Now
            </h2>
          </div>

          <div className="grid gap-8">
            {activeOrders.map((order) => (
              <Card
                key={order.id}
                className="rounded-[2.5rem] border-caramel/10 bg-card/50 backdrop-blur-sm overflow-hidden shadow-premium-dark hover:shadow-caramel/5 transition-shadow duration-500"
              >
                <CardContent className="p-0">
                  <div className="flex flex-col lg:flex-row">
                    {/* Visual Status Sidebar */}
                    <div className="w-full lg:w-56 bg-gradient-to-br from-[#2D1B16] to-[#1A0F0D] p-10 flex flex-col items-center justify-center text-cream border-r border-caramel/5">
                      <div className="relative mb-6">
                        <Package className="size-12 text-caramel relative z-10" />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 3 }}
                          className="absolute inset-0 bg-caramel/20 blur-xl rounded-full"
                        />
                      </div>
                      <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-caramel/60 mb-1">
                        Current Stage
                      </span>
                      <span className="text-lg font-serif italic text-cream">
                        Preparing
                      </span>
                    </div>

                    <div className="flex-1 p-10 space-y-8">
                      <div className="flex flex-wrap justify-between items-start gap-4">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.2em] text-caramel font-bold mb-2">
                            Order Reference #{order.id}
                          </p>
                          <h3 className="text-3xl font-serif font-bold text-brownie dark:text-cream">
                            {order.provider}
                          </h3>
                        </div>
                        <div className="flex items-center gap-3 bg-amber-600/10 border border-amber-600/20 px-5 py-2.5 rounded-2xl">
                          <Clock className="size-4 text-amber-600" />
                          <span className="text-sm font-bold text-amber-700 dark:text-amber-400">
                            ~{order.estimate}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {order.items.map((item, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-transparent hover:border-caramel/10 transition-colors"
                          >
                            <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                            <span className="text-sm font-medium text-muted-foreground italic">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-8 border-t border-dashed border-caramel/20 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-muted-foreground bg-muted/50 px-4 py-2 rounded-full">
                          <MapPin className="size-3.5 text-caramel" />
                          <span className="text-[11px] font-medium tracking-wide uppercase">
                            Velvet Drop Point #4
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          className="text-primary font-bold group rounded-full hover:bg-primary/5 px-6"
                        >
                          Live Tracking
                          <ExternalLink className="ml-2 size-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>
      )}

      {/* --- PAST ORDERS --- */}
      <motion.section variants={itemVariants} className="space-y-8">
        <div className="px-2">
          <h2 className="font-serif text-2xl font-bold text-brownie dark:text-cream">
            History
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Refined list of your past culinary experiences.
          </p>
        </div>

        <div className="bg-[#2D1B16]/5 dark:bg-card/30 rounded-[2.5rem] border border-caramel/10 overflow-hidden backdrop-blur-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-caramel/10 bg-muted/20 text-[10px] uppercase tracking-[0.25em] text-caramel font-serif">
                  <th className="p-8 font-bold">Timeline & ID</th>
                  <th className="p-8 font-bold">The Kitchen</th>
                  <th className="p-8 font-bold">Investment</th>
                  <th className="p-8 font-bold text-right">Review</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-caramel/5">
                {pastOrders.length > 0 ? (
                  pastOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="group hover:bg-caramel/5 transition-all duration-300"
                    >
                      <td className="p-8">
                        <div className="flex items-center gap-5">
                          <div className="size-12 rounded-2xl bg-muted/80 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:rotate-6 shadow-sm">
                            <Calendar className="size-5" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-brownie dark:text-cream group-hover:text-primary transition-colors">
                              {order.date}
                            </p>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">
                              ID: {order.id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-8">
                        <span className="text-sm font-serif italic text-muted-foreground group-hover:text-brownie dark:group-hover:text-cream transition-colors">
                          {order.provider}
                        </span>
                      </td>
                      <td className="p-8 font-bold text-brownie dark:text-cream">
                        {order.total}
                      </td>
                      <td className="p-8 text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full hover:bg-caramel/20 text-caramel transition-all group-hover:scale-110"
                        >
                          <ChevronRight className="size-5" />
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="p-20 text-center">
                      <div className="flex flex-col items-center gap-4 opacity-30">
                        <ShoppingBag className="size-12" />
                        <p className="font-serif italic">
                          Your history is a blank canvas...
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}
