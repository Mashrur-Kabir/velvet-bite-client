"use client";

import { motion } from "framer-motion";
import {
  Package,
  MapPin,
  Calendar,
  CheckCircle2,
  Timer,
  ExternalLink,
  ShoppingBag,
  ClipboardClock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IOrder, IProvider } from "@/types";
import { cn } from "@/lib/utils";
import { getTimeBadge } from "@/helpers/customerHelpers/my-order.helper";
import Link from "next/link";

interface MyOrdersProps {
  initialOrders: IOrder[];
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

export default function MyOrdersComponent({
  initialOrders,
  providers,
}: MyOrdersProps) {
  const getProviderName = (providerId: string) => {
    const provider = providers.find((p) => p.id === providerId);
    return provider ? provider.name : "Velvet Kitchen";
  };

  const activeOrders = initialOrders.filter((o) =>
    ["PLACED", "PREPARING", "READY"].includes(o.status),
  );
  const pastOrders = initialOrders.filter((o) =>
    ["DELIVERED", "CANCELLED"].includes(o.status),
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-5xl mx-auto space-y-12 pb-20 px-4"
    >
      {/* --- HEADER --- */}
      <motion.section
        variants={itemVariants}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-caramel/10 pb-8"
      >
        <div>
          <h1 className="text-4xl mt-12 font-serif font-bold text-brownie dark:text-cream tracking-tight">
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
                className="rounded-[2.5rem] border-caramel/10 bg-card/50 backdrop-blur-sm overflow-hidden shadow-premium-dark"
              >
                <CardContent className="p-0">
                  <div className="flex flex-col lg:flex-row">
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
                        {order.status}
                      </span>
                    </div>

                    <div className="flex-1 p-10 space-y-8">
                      <div className="flex flex-wrap justify-between items-start gap-4">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.2em] text-caramel font-bold mb-2">
                            Ref: #{order.id.slice(0, 8)}
                          </p>
                          <h3 className="text-3xl font-serif font-bold text-brownie dark:text-cream">
                            {getProviderName(order.providerId)}
                          </h3>
                        </div>
                        {getTimeBadge(order.createdAt)}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {order.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-transparent"
                          >
                            <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                            <span className="text-sm font-medium text-muted-foreground italic">
                              {item.meal?.name} x{item.quantity}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-8 border-t border-dashed border-caramel/20 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-muted-foreground bg-muted/50 px-4 py-2 rounded-full">
                          <MapPin className="size-3.5 text-caramel" />
                          <span className="text-[11px] font-medium tracking-wide truncate max-w-[200px]">
                            {order.deliveryAddress}
                          </span>
                        </div>
                        <Link
                          href={`/dashboard/my-orders/update-order?orderId=${order.id}`}
                        >
                          <Button
                            variant="ghost"
                            className="text-primary font-bold group rounded-full hover:bg-primary/5 px-6"
                          >
                            Update
                            <ExternalLink className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
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
        <div className="flex items-center gap-3 px-2 pt-4">
          <div className="relative">
            <ClipboardClock className="size-5 text-amber-600" />
            <div className="absolute inset-0 size-5 bg-amber-600 blur-lg opacity-20 animate-pulse" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-brownie dark:text-cream px-2">
            History
          </h2>
        </div>
        <div className="bg-[#2D1B16]/5 dark:bg-card/30 rounded-[2.5rem] border border-caramel/10 overflow-hidden backdrop-blur-md mb-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-caramel/10 bg-muted/20 text-[10px] uppercase tracking-[0.25em] text-caramel font-serif">
                  {/* FIX 1: Column Headers now total 4 */}
                  <th className="p-8 font-bold">Timeline & Identity</th>
                  <th className="p-8 font-bold text-center">
                    Total Investment
                  </th>
                  <th className="p-8 font-bold text-center">Date</th>
                  <th className="p-8 font-bold text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-caramel/5">
                {pastOrders.length > 0 ? (
                  pastOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="group hover:bg-caramel/5 transition-all duration-300"
                    >
                      {/* FIX 2: Identity Column (Kitchen + Ref ID) */}
                      <td className="p-8">
                        <div className="flex flex-col gap-1">
                          <span className="text-sm font-serif italic text-muted-foreground group-hover:text-brownie dark:group-hover:text-cream transition-colors">
                            {getProviderName(order.providerId)}
                          </span>
                          <span className="text-[10px] text-muted-foreground/40 font-mono">
                            #{order.id.slice(0, 8)}
                          </span>
                        </div>
                      </td>

                      {/* FIX 3: Total Investment aligned center */}
                      <td className="p-8 text-center font-bold text-brownie dark:text-cream">
                        ${order.totalAmount}
                      </td>

                      {/* FIX 4: Date column with integrated icon */}
                      <td className="p-8">
                        <div className="flex items-center justify-center gap-3">
                          <div className="size-9 rounded-xl bg-muted/80 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500">
                            <Calendar className="size-4" />
                          </div>
                          <span className="text-sm font-bold text-brownie dark:text-cream">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </td>

                      {/* FIX 5: Status as the final column */}
                      <td className="p-8 text-center">
                        <Badge
                          variant="outline"
                          className={cn(
                            "px-3 py-1 rounded-full border-caramel/20",
                            order.status === "CANCELLED"
                              ? "text-destructive"
                              : "text-caramel",
                          )}
                        >
                          {order.status}
                        </Badge>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    {/* FIX 6: Updated colSpan to match header count */}
                    <td colSpan={4} className="p-20 text-center">
                      <div className="flex flex-col items-center gap-4 opacity-30">
                        <ShoppingBag className="size-12" />
                        <p className="font-serif italic text-cream">
                          No history found.
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
