"use client";

import { useState } from "react";
import { IMeal } from "@/types";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Minus,
  Plus,
  MapPin,
  ArrowRight,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createOrderAction } from "@/actions/customer.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import * as z from "zod";

// 1. Zod Validation Schema
const orderSchema = z.object({
  address: z
    .string()
    .min(10, "Delivery protocol requires at least 10 characters for precision.")
    .max(200, "Destination address exceeds standard protocol length."),
  quantity: z
    .number()
    .min(1)
    .max(50, "Quantity exceeds single transmission limits."),
});

export default function OrderSelectedMeal({ meal }: { meal: IMeal }) {
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState("");
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const totalAmount = meal.price * quantity;

  // 2. Velvet Bite Stylized Toast
  const toastStyle = {
    background: "oklch(0.45 0.08 55)", // Shiny light chocolate roast
    color: "oklch(0.92 0.03 65)", // Cream text
    border: "1px solid oklch(0.35 0.03 45)",
    fontFamily: "var(--font-serif)",
    padding: "16px",
  };

  const handleOrder = async () => {
    // Validate with Zod
    const validation = orderSchema.safeParse({ address, quantity });

    if (!validation.success) {
      return toast.error(validation.error.issues[0].message, {
        style: toastStyle,
      });
    }

    setIsPending(true);
    const payload = {
      deliveryAddress: address,
      items: [{ mealId: meal.id, quantity }],
    };

    const res = await createOrderAction(payload);

    if (res.data) {
      toast.success("Order placed successfully!", {
        style: toastStyle,
      });
      router.push("/dashboard/my-orders");
    } else {
      toast.error(res.error?.message || "Order placement failed!", {
        style: toastStyle,
      });
    }
    setIsPending(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      {/* 1. ASSET BRIEF: Fixed Visual Card */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-card/40 backdrop-blur-xl border border-border/40 rounded-[3rem] p-10 space-y-8 shadow-premium-dark lg:sticky lg:top-32"
      >
        <div className="relative h-72 w-full rounded-4xl overflow-hidden border border-white/5">
          <Image
            src={meal.imageUrl}
            alt={meal.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-6 left-6">
            <p className="text-[10px] uppercase font-black tracking-widest text-primary mb-1">
              Asset Identity
            </p>
            <h2 className="text-3xl font-serif font-bold text-cream">
              {meal.name}
            </h2>
          </div>
        </div>

        <div className="flex justify-between items-center py-6 border-y border-white/5">
          <div className="space-y-1">
            <p className="text-[10px] uppercase font-bold text-cream/30 tracking-widest">
              Unit Price
            </p>
            <p className="text-2xl font-bold text-primary">
              ${meal.price.toFixed(2)}
            </p>
          </div>
          <div className="flex items-center gap-4 bg-background/50 p-2 rounded-2xl border border-white/5">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="size-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all"
            >
              <Minus size={16} />
            </button>
            <span className="text-xl font-bold w-8 text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="size-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <p className="font-serif italic text-cream/60">Total Price</p>
          <p className="text-4xl font-serif font-bold text-primary">
            ${totalAmount.toFixed(2)}
          </p>
        </div>
      </motion.div>

      {/* 2. LOGISTICS PROTOCOL: Form Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-10"
      >
        <section className="space-y-6">
          <h3 className="text-xs uppercase tracking-[0.4em] font-black text-cream/40 flex items-center gap-3">
            <MapPin size={16} className="text-primary" /> Delivery info:
          </h3>
          <div className="space-y-4">
            <label className="text-sm text-cream/60 italic font-serif">
              Where shall we deliver this delicious goodness?
            </label>
            <Input
              placeholder="e.g. 123 Velvet Lane, Culinary District"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="h-16 bg-card/40 border-border/40 rounded-2xl text-cream focus:border-primary/50 text-lg px-6"
            />
          </div>
        </section>

        <section className="p-8 rounded-[2.5rem] bg-emerald-500/5 border border-emerald-500/10 flex items-start gap-5">
          <div className="size-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-500 shrink-0">
            <CheckCircle2 size={24} />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-bold text-emerald-500 uppercase tracking-widest">
              Premium Assurance
            </p>
            <p className="text-xs text-emerald-500/60 leading-relaxed">
              You will be directed to tracking your order real-time upon
              placement.
            </p>
            <p className="text-xs text-rose-500/60 leading-relaxed">
              You cannot cancel order once it is at preparing stage.
            </p>
          </div>
        </section>

        <Button
          onClick={handleOrder}
          disabled={isPending}
          className="w-full h-20 rounded-full bg-primary text-white text-xl font-bold font-serif hover:bg-amber-800 shadow-2xl active:scale-95 group transition-all"
        >
          {isPending ? (
            <Loader2 className="animate-spin size-6" />
          ) : (
            <span className="flex items-center gap-3">
              Confirm Order Transmission{" "}
              <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </span>
          )}
        </Button>
      </motion.div>
    </div>
  );
}
