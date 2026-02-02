"use client";

import { cancelOrderAction } from "@/actions/customer.action";
import { IOrder } from "@/types";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { XCircle, MapPin, Hash } from "lucide-react";
import { motion } from "framer-motion";

export default function UpdateOrderFormClient({ order }: { order: IOrder }) {
  const handleCancel = async () => {
    toast.promise(cancelOrderAction(order.id), {
      loading: "Processing cancellation request...",
      success: "Order successfully voided.",
      error: (err) => err.message,
      style: {
        background: "#2D1B16",
        color: "#F3E9DC",
        border: "1px solid #C08552",
      },
    });
  };

  return (
    <motion.div
      // 1. Explicitly lock x to 0 to prevent the "left shift" jitter
      initial={{ opacity: 0, y: 8, x: 0 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      // 2. REMOVED 'transition-all' and 'duration-700' from here
      className="group relative overflow-hidden p-6 bg-gradient-to-br from-[#2D1B16] to-[#1A0F0D] border border-caramel/10 rounded-[2.5rem] shadow-2xl backdrop-blur-md"
      // 3. Move the hover logic to Framer Motion to keep it buttery smooth
      whileHover={{
        borderColor: "rgba(244, 63, 94, 0.3)", // rose-500/30
        transition: { duration: 0.4 },
      }}
    >
      <div className="absolute -right-4 -bottom-4 size-32 bg-rose-500/5 rounded-full blur-3xl group-hover:bg-rose-500/10 transition-colors duration-700" />

      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-caramel/10 border border-caramel/10">
              <Hash size={12} className="text-caramel" />
            </div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-caramel/60 font-bold">
              Order Ref:{" "}
              <span className="text-caramel italic">
                #{order.id.slice(0, 8)}
              </span>
            </p>
          </div>

          <div className="flex items-start gap-3 max-w-md">
            <MapPin size={16} className="text-caramel/40 mt-1 shrink-0" />
            <p className="text-cream font-medium text-sm leading-relaxed tracking-wide opacity-80 group-hover:opacity-100 transition-opacity">
              {order.deliveryAddress}
            </p>
          </div>
        </div>

        <Button
          onClick={handleCancel}
          // REMOVED: variant="ghost" to prevent brown hover conflict
          className="
            relative w-full sm:w-auto h-12 px-8
            bg-rose-500/10 text-rose-500 border border-rose-500/20
            rounded-2xl flex items-center justify-center gap-3 
            transition-all duration-500 ease-out
            
            /* UPDATED HOVER: High-specificity Rose Glow */
            hover:!bg-rose-600 hover:text-white
            hover:shadow-[0_0_25px_rgba(244,63,94,0.4)]
            hover:border-rose-500
            
            /* JITTER-KILLING PROPERTIES */
            transform-gpu 
            hover:scale-[1.03] 
            active:scale-[0.97]
            [backface-visibility:hidden]
            [perspective:1000px]
            [transform:translateZ(0)]
            will-change-transform
          "
        >
          <XCircle
            size={18}
            className="transition-transform group-hover:rotate-90 duration-700 ease-[0.34,1.56,0.64,1]"
          />
          <span className="text-[10px] uppercase font-bold tracking-[0.25em]">
            Cancel Order
          </span>
        </Button>
      </div>
    </motion.div>
  );
}
