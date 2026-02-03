"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { IOrder } from "@/types";
import { updateOrderStatusAction } from "@/actions/provider.action";
import {
  Clock,
  CheckCircle2,
  Truck,
  ArrowRight,
  LucideIcon,
} from "lucide-react";
import * as z from "zod";

// 1. Fixed Zod Schema: Enum parameters only accept 'errorMap' or 'invalid_type_error'
// For required checks in TanStack Form, the schema validates the existing value.
const statusSchema = z.object({
  status: z.enum(["PREPARING", "READY", "DELIVERED"], {
    message: "Please select an operational phase",
  }),
});

type TOrderStatus = z.infer<typeof statusSchema>["status"];

export default function UpdateIncomingOrderFormClient({
  order,
}: {
  order: IOrder;
}) {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      status: order.status as TOrderStatus,
    },
    validators: { onChange: statusSchema },
    onSubmit: async ({ value }) => {
      toast.promise(updateOrderStatusAction(order.id, value.status), {
        loading: "Updating status of order...",
        success: (res) => {
          if (res.error) throw new Error(res.error.message);

          // Absolute routing fix
          router.push("/provider-dashboard/my-orders");

          return `Order marked as ${value.status}`;
        },
        error: (err) => err.message,
        style: {
          background: "oklch(0.45 0.08 55)", // Shiny light chocolate
          color: "oklch(0.92 0.03 65)", // Cream text
          border: "1px solid oklch(0.35 0.03 45)",
          fontFamily: "var(--font-serif)",
          padding: "16px",
        },
      });
    },
  });

  const statusOptions: {
    value: TOrderStatus;
    label: string;
    icon: LucideIcon;
    color: string;
  }[] = [
    {
      value: "PREPARING",
      label: "Preparing",
      icon: Clock,
      color: "text-amber-500",
    },
    {
      value: "READY",
      label: "Ready for Pickup",
      icon: CheckCircle2,
      color: "text-emerald-500",
    },
    {
      value: "DELIVERED",
      label: "Delivered",
      icon: Truck,
      color: "text-primary",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="shadow-premium-dark border-primary/20 bg-card/40 backdrop-blur-md rounded-[2.5rem] overflow-hidden">
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse" />
        <CardHeader className="pb-6">
          <CardDescription className="text-primary/60 italic text-sm">
            Current Status:{" "}
            <span className="font-bold uppercase tracking-widest">
              {order.status}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <FieldGroup className="space-y-10">
              <form.Field name="status">
                {(field) => (
                  <Field className="space-y-6">
                    <FieldLabel className="text-cream text-[10px] uppercase tracking-[0.3em] font-bold block text-center">
                      Select Order Phase
                    </FieldLabel>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {statusOptions.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => field.handleChange(opt.value)}
                          className={`p-6 rounded-[2rem] border transition-all duration-500 flex flex-col items-center gap-3 group ${
                            field.state.value === opt.value
                              ? "bg-primary/10 border-primary shadow-lg shadow-primary/5"
                              : "bg-background/40 border-border/40 hover:border-primary/30"
                          }`}
                        >
                          <opt.icon
                            className={`size-6 ${field.state.value === opt.value ? opt.color : "text-cream/20 group-hover:text-cream/40"}`}
                          />
                          <span
                            className={`text-[10px] uppercase font-bold tracking-widest ${field.state.value === opt.value ? "text-cream" : "text-cream/40"}`}
                          >
                            {opt.label}
                          </span>
                        </button>
                      ))}
                    </div>

                    {field.state.meta.errors.length > 0 && (
                      <p className="text-center text-xs text-cream italic">
                        {field.state.meta.errors.join(", ")}
                      </p>
                    )}
                  </Field>
                )}
              </form.Field>

              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
              >
                {([canSubmit, isSubmitting]) => (
                  <Button
                    type="submit"
                    disabled={!canSubmit || isSubmitting}
                    className="w-full h-16 rounded-full bg-primary text-primary-foreground font-bold uppercase tracking-[0.3em] text-xs hover:bg-amber-900 hover:text-cream transition-all duration-500 shadow-xl shadow-primary/10 group"
                  >
                    <span className="flex items-center gap-3">
                      {isSubmitting ? "Synchronizing..." : "Update Status"}
                      {!isSubmitting && (
                        <ArrowRight
                          size={16}
                          className="group-hover:translate-x-2 transition-transform"
                        />
                      )}
                    </span>
                  </Button>
                )}
              </form.Subscribe>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
