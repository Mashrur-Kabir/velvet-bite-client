"use client";

import { useState, useMemo } from "react";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ShoppingBag,
  MapPin,
  Utensils,
  ChefHat,
  Plus,
  Trash2,
} from "lucide-react";
import { createOrderAction } from "@/actions/customer.action";
import { IMeal, IProvider } from "@/types";

interface Props {
  providers: IProvider[];
  allMeals: IMeal[];
}

export default function CreateOrderFormClient({ providers, allMeals }: Props) {
  const [selectedProviderId, setSelectedProviderId] = useState<string>("");

  const filteredMeals = useMemo(() => {
    return allMeals.filter((meal) => meal.providerId === selectedProviderId);
  }, [selectedProviderId, allMeals]);

  const form = useForm({
    defaultValues: {
      deliveryAddress: "",
      items: [{ mealId: "", quantity: 1 }],
    },
    onSubmit: async ({ value }) => {
      const validItems = value.items.filter((item) => item.mealId !== "");

      if (validItems.length === 0) {
        toast.error("Please select at least one meal.");
        return;
      }

      const payload = {
        deliveryAddress: value.deliveryAddress,
        items: validItems,
      };

      toast.promise(createOrderAction(payload), {
        loading: "Processing your order...",
        success: (res) => {
          if (res.error) throw new Error(res.error.message);
          form.reset();
          setSelectedProviderId("");
          return (
            <div className="flex flex-col">
              <span className="font-bold">Order successful!</span>
              <span className="text-xs opacity-70">
                Track progress in your dashboard.
              </span>
            </div>
          );
        },
        error: (err) => err.message,
        style: {
          background: "#5E3023", // Brownie
          color: "#F3E9DC", // Cream
          border: "1px solid #C08552", // Caramel
          padding: "16px",
          // 2. Updated to light beige/caramel glow
          boxShadow: "0 0 15px rgba(192, 133, 82, 0.3)",
        },
      });
    },
  });

  return (
    <Card className="border-caramel/10 bg-[#2D1B16]/40 backdrop-blur-xl shadow-3xl rounded-[2.5rem] overflow-hidden">
      <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-caramel to-transparent opacity-50" />
      <CardContent className="p-10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup className="space-y-10">
            {/* --- STEP 1: CHOOSE KITCHEN --- */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-caramel">
                <ChefHat size={16} />
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold">
                  Step 01
                </span>
              </div>
              <Field className="space-y-2">
                <FieldLabel className="text-cream font-serif text-lg">
                  Select Provider
                </FieldLabel>
                <Select
                  onValueChange={(val) => {
                    setSelectedProviderId(val);
                    form.setFieldValue("items", [{ mealId: "", quantity: 1 }]);
                  }}
                >
                  <SelectTrigger className="bg-black/20 border-caramel/10 rounded-2xl h-14 text-cream focus:ring-caramel/20">
                    <SelectValue placeholder="Which kitchen are you craving?" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2D1B16] border-caramel/20 text-cream rounded-2xl">
                    {providers.map((p) => (
                      <SelectItem
                        key={p.id}
                        value={p.id}
                        className="focus:bg-caramel focus:text-brownie"
                      >
                        <div className="flex items-center gap-2 leading-none">
                          <span className="font-medium">{p.name}</span>
                          <span className="text-caramel/40 opacity-50 text-[14px]">
                            ━
                          </span>
                          <span className="text-[10px] opacity-50 uppercase tracking-tighter">
                            {p.address}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>

            <AnimatePresence>
              {selectedProviderId && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-10 overflow-hidden"
                >
                  {/* --- STEP 2: DYNAMIC MEAL LIST --- */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-caramel/5 pb-2">
                      <div className="flex items-center gap-2 text-caramel">
                        <Utensils size={16} />
                        <span className="text-[10px] uppercase tracking-[0.3em] font-bold">
                          Step 02: Menu Selection
                        </span>
                      </div>

                      {/* FIX 1: Alignment fixed by moving button inside header flexbox */}
                      <form.Subscribe
                        selector={(state) => [state.values.items]}
                      >
                        {([items]) => (
                          <button
                            type="button"
                            onClick={() =>
                              form.insertFieldValue("items", items.length, {
                                mealId: "",
                                quantity: 1,
                              })
                            }
                            className="text-[10px] flex items-center gap-1 uppercase tracking-widest font-bold text-caramel hover:text-cream transition-colors group"
                          >
                            <Plus
                              size={12}
                              className="group-hover:rotate-90 transition-transform"
                            />
                            Add Another Item
                          </button>
                        )}
                      </form.Subscribe>
                    </div>

                    <div className="space-y-4">
                      {/* FIX 2: Subscribe to items to ensure instant UI updates */}
                      <form.Subscribe
                        selector={(state) => [state.values.items]}
                      >
                        {([items]) =>
                          items.map((_, index) => (
                            <div
                              key={`order-item-${index}`}
                              className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end animate-in fade-in slide-in-from-left-4 duration-300"
                            >
                              <div className="md:col-span-8">
                                <form.Field name={`items[${index}].mealId`}>
                                  {(field) => (
                                    <Field className="space-y-1">
                                      <FieldLabel className="text-cream/80 text-xs font-serif italic">
                                        The Delight
                                      </FieldLabel>
                                      <Select
                                        onValueChange={(val) =>
                                          field.handleChange(val)
                                        }
                                        value={field.state.value || ""}
                                      >
                                        <SelectTrigger className="bg-black/20 border-caramel/10 rounded-2xl h-10 text-cream">
                                          <SelectValue placeholder="Select a delight..." />
                                        </SelectTrigger>
                                        <SelectContent className="bg-[#2D1B16] border-caramel/20 text-cream rounded-2xl">
                                          {filteredMeals.map((m) => (
                                            <SelectItem key={m.id} value={m.id}>
                                              {m.name} —{" "}
                                              <span className="text-caramel">
                                                ${m.price}
                                              </span>
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                    </Field>
                                  )}
                                </form.Field>
                              </div>

                              <div className="md:col-span-3">
                                <form.Field name={`items[${index}].quantity`}>
                                  {(field) => (
                                    <Field className="space-y-1 flex-col gap-2">
                                      <FieldLabel className="text-cream/80 text-xs font-serif italic">
                                        Quantity
                                      </FieldLabel>
                                      <Input
                                        type="number"
                                        min={1}
                                        className="bg-black/20 border-caramel/10 mb-1 rounded-2xl h-10 text-cream text-center"
                                        value={field.state.value ?? 1}
                                        onChange={(e) => {
                                          const val = Math.max(
                                            1,
                                            Number(e.target.value),
                                          );
                                          field.handleChange(val);
                                        }}
                                      />
                                    </Field>
                                  )}
                                </form.Field>
                              </div>

                              <div className="md:col-span-1 flex justify-center pb-0">
                                {items.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      form.removeFieldValue("items", index)
                                    }
                                    className="text-caramel/20 hover:text-red-400 transition-colors p-2 rounded-full hover:bg-red-400/10"
                                  >
                                    <Trash2 size={20} />
                                  </button>
                                )}
                              </div>
                            </div>
                          ))
                        }
                      </form.Subscribe>
                    </div>
                  </div>

                  {/* --- STEP 3: ADDRESS --- */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-caramel">
                      <MapPin size={16} />
                      <span className="text-[10px] uppercase tracking-[0.3em] font-bold">
                        Step 03
                      </span>
                    </div>
                    <form.Field name="deliveryAddress">
                      {(field) => (
                        <Field className="space-y-2">
                          <FieldLabel className="text-cream font-serif text-lg">
                            Drop Point
                          </FieldLabel>
                          <Input
                            className="bg-black/20 border-caramel/10 rounded-2xl h-14 text-cream"
                            placeholder="Enter your location please..."
                            value={field.state.value || ""}
                            onChange={(e) => field.handleChange(e.target.value)}
                          />
                        </Field>
                      )}
                    </form.Field>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-16 bg-primary hover:bg-amber-900 text-white font-serif text-xl font-bold rounded-2xl shadow-xl transition-all group transform-gpu will-change-transform"
                  >
                    Place Order{" "}
                    <ShoppingBag className="ml-3 transition-transform group-hover:scale-125" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
