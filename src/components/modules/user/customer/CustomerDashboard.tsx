"use client";

import { motion } from "framer-motion";
import {
  ShoppingBag,
  Clock,
  Star,
  ArrowRight,
  Utensils,
  Heart,
  Soup,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IOrder, IReview, IProvider, IUser } from "@/types";
import { cn } from "@/lib/utils";

interface DashboardProps {
  user: IUser | null;
  orders: IOrder[];
  reviews: IReview[];
  providers: IProvider[];
}

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

export default function CustomerDashboard({
  user,
  orders,
  reviews,
  providers,
}: DashboardProps) {
  const userName = user?.name || "Guest";

  // Derived Statistics
  const activeOrders = orders.filter((o) =>
    ["PLACED", "PREPARING", "READY"].includes(o.status),
  );

  const totalSpent = orders
    .filter((o) => o.status === "DELIVERED")
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const quickStats = [
    {
      title: "Active Orders",
      value: activeOrders.length.toString(),
      icon: ShoppingBag,
      color: "text-amber-600",
    },
    {
      title: "Total Spent",
      value: `$${totalSpent.toFixed(2)}`,
      icon: Clock,
      color: "text-brownie",
    },
    {
      title: "Reviews Shared",
      value: reviews.length.toString(),
      icon: Star,
      color: "text-yellow-600",
    },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-8 max-w-7xl mx-auto px-4"
    >
      {/* --- WELCOME HERO --- */}
      <motion.section variants={itemVariants}>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-brownie p-8 md:p-12 text-cream shadow-2xl">
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Bon Appétit, {userName}!
            </h1>
            <p className="text-cream/80 text-lg mb-8 max-w-lg leading-relaxed">
              Ready for your next culinary adventure? Explore fresh flavors from
              the best kitchens in the community.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                className="group relative bg-primary hover:bg-amber-900 text-primary-foreground font-bold rounded-full px-12 py-6 transition-all duration-300 shadow-lg overflow-hidden"
              >
                <Link
                  href="/meals"
                  className="flex items-center justify-center"
                >
                  <motion.div className="flex items-center gap-2 transition-all duration-500 group-hover:translate-x-12 group-hover:opacity-0">
                    <span>Browse Menu</span>
                    <ArrowRight className="size-5" />
                  </motion.div>
                  <div className="absolute inset-0 flex items-center justify-center translate-x-[-100%] opacity-0 transition-all duration-700 group-hover:translate-x-0 group-hover:opacity-100">
                    <Soup className="size-5 text-amber-400" />
                  </div>
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="relative rounded-full px-8 py-6 border-cream/20 text-cream hover:border-amber-400 hover:bg-transparent group transition-all duration-500 overflow-hidden"
              >
                <Link href="/dashboard/my-orders">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cream/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <span className="relative z-10 flex items-center gap-2">
                    Track Orders
                    <div className="size-1.5 rounded-full bg-amber-400 group-hover:animate-ping" />
                  </span>
                </Link>
              </Button>
            </div>
          </div>
          <Utensils className="absolute -right-16 -bottom-16 size-80 text-cream/5 -rotate-12" />
        </div>
      </motion.section>

      {/* --- STATS GRID --- */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {quickStats.map((stat) => (
          <Card
            key={stat.title}
            className="border-none shadow-xl rounded-3xl bg-card/50 backdrop-blur-sm overflow-hidden group hover:scale-[1.02] transition-transform duration-300"
          >
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-[0.2em] mb-1">
                  {stat.title}
                </p>
                <h3 className="text-3xl font-bold text-brownie dark:text-cream">
                  {stat.value}
                </h3>
              </div>
              <div
                className={cn(
                  "p-4 rounded-2xl bg-muted/50 transition-colors group-hover:bg-primary/10",
                  stat.color,
                )}
              >
                <stat.icon className="size-6" />
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* --- CURRENT ACTIVITY & FEATURED --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.section variants={itemVariants}>
          <Card className="rounded-[2.5rem] border-border/50 bg-card p-8 h-full">
            <h4 className="text-xl font-serif font-bold mb-6 text-brownie dark:text-cream flex items-center gap-2">
              <ShoppingBag className="size-5 text-caramel" /> Current Cravings
            </h4>
            <div className="space-y-4">
              {activeOrders.length > 0 ? (
                activeOrders.slice(0, 3).map((order) => (
                  <div
                    key={order.id}
                    className="p-4 rounded-2xl bg-muted/30 border border-caramel/10 flex justify-between items-center group hover:border-caramel/30 transition-all"
                  >
                    <div>
                      <p className="font-bold text-brownie dark:text-cream">
                        {order.items[0]?.meal?.name}
                      </p>
                      <p className="text-[10px] uppercase tracking-widest text-caramel font-bold">
                        {order.status}
                      </p>
                    </div>
                    <Link
                      href={`/dashboard/my-orders/update-order?orderId=${order.id}`}
                      className="p-2 rounded-full bg-cream hover:bg-primary-foreground/70 text-primary-foreground hover:text-cream transition-all"
                    >
                      <ArrowRight size={22} />
                    </Link>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-sm text-muted-foreground italic">
                    No active culinary transmissions.
                  </p>
                </div>
              )}
              <Button
                asChild
                variant="ghost"
                className="w-full text-primary hover:bg-primary/5 rounded-xl mt-4"
              >
                <Link href="/dashboard/my-orders">View full history</Link>
              </Button>
            </div>
          </Card>
        </motion.section>

        <motion.section variants={itemVariants}>
          <Card className="rounded-[2.5rem] border-border/50 bg-card p-8 h-full">
            <h4 className="text-xl font-serif font-bold mb-6 text-brownie dark:text-cream flex items-center gap-2">
              <Heart className="size-5 text-rose-500 fill-rose-500" /> Featured
              Kitchens
            </h4>
            <div className="grid grid-cols-2 gap-4">
              {providers.slice(0, 4).map((p) => (
                <div
                  key={p.id}
                  className="group p-4 rounded-2xl bg-accent/40 border border-transparent hover:border-primary-foreground/40 hover:bg-cream transition-all text-center"
                >
                  <p className="text-xs font-bold truncate text-cream group-hover:text-primary-foreground transition-colors">
                    {p.name}
                  </p>
                  <p className="text-[9px] uppercase tracking-widest text-muted-foreground mt-1 group-hover:text-primary-foreground/80 transition-colors">
                    Velvet Partner
                  </p>
                </div>
              ))}
            </div>
            <Button
              asChild
              variant="outline"
              className="w-full mt-8 rounded-full border-caramel/30 bg-cream hover:bg-primary-foreground/70 text-primary-foreground hover:text-cream font-bold uppercase tracking-widest text-[10px]"
            >
              <Link href="/providers">Explore All Providers</Link>
            </Button>
          </Card>
        </motion.section>
      </div>
    </motion.div>
  );
}
