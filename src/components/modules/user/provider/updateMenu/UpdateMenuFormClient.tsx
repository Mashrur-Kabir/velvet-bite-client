"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation"; // 1. Import for redirection
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { IMeal } from "@/types";
import { updateMealAction } from "@/actions/provider.action";
import { Utensils, DollarSign, AlignLeft, Save } from "lucide-react";
import * as z from "zod";

const mealSchema = z.object({
  name: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Brief is too short for the archives"),
  price: z.number().positive().max(1500, "Price exceeds protocol limits"),
  isAvailable: z.boolean(),
});

export default function UpdateMenuFormClient({ meal }: { meal: IMeal }) {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: meal.name,
      description: meal.description,
      price: meal.price,
      isAvailable: meal.isAvailable,
    },
    validators: { onChange: mealSchema },
    onSubmit: async ({ value }) => {
      toast.promise(updateMealAction(meal.id, value), {
        loading: "Synchronizing recipe modifications...",
        success: (res) => {
          if (res.error) throw new Error(res.error.message);

          // Redirect back to menu after success
          router.push("/provider-dashboard/my-menu");
          return "Recipe successfully updated in the archives.";
        },
        error: (err) => err.message,
        style: {
          background: "#2D1B16",
          color: "#F3E9DC",
          border: "1px solid #C08552",
        },
      });
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="shadow-premium-dark border-primary/20 bg-card/40 backdrop-blur-md rounded-[2.5rem] overflow-hidden">
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse" />
        <CardHeader className="pb-2">
          <CardDescription className="text-primary/60 italic text-sm">
            Modify the visual and culinary essence of {meal.name}.
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
            <FieldGroup className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Dish Name */}
                <form.Field name="name">
                  {(field) => (
                    <Field className="space-y-1.5">
                      <FieldLabel className="text-cream text-[10px] uppercase tracking-widest font-bold">
                        Dish Name
                      </FieldLabel>
                      <div className="relative">
                        <Utensils className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-primary/40" />
                        <Input
                          className="pl-12 bg-background/50 border-border rounded-2xl h-14"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      </div>
                      {field.state.meta.isTouched && (
                        <FieldError
                          errors={field.state.meta.errors}
                          className="text-cream italic text-[11px]"
                        />
                      )}
                    </Field>
                  )}
                </form.Field>

                {/* Price */}
                <form.Field name="price">
                  {(field) => (
                    <Field className="space-y-1.5">
                      <FieldLabel className="text-cream text-[10px] uppercase tracking-widest font-bold">
                        Price
                      </FieldLabel>
                      <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-primary/40" />
                        <Input
                          type="text"
                          className="pl-12 bg-background/50 border-border rounded-2xl h-14"
                          value={
                            field.state.value === 0 ? "" : field.state.value
                          }
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val === "" || /^\d*\.?\d*$/.test(val)) {
                              const num = val === "" ? 0 : parseFloat(val);
                              if (num <= 1500) field.handleChange(num);
                            }
                          }}
                        />
                      </div>
                      {field.state.meta.isTouched && (
                        <FieldError
                          errors={field.state.meta.errors}
                          className="text-cream italic text-[11px]"
                        />
                      )}
                    </Field>
                  )}
                </form.Field>
              </div>

              {/* Description */}
              <form.Field name="description">
                {(field) => (
                  <Field className="space-y-1.5">
                    <FieldLabel className="text-cream text-[10px] uppercase tracking-widest font-bold">
                      Description
                    </FieldLabel>
                    <div className="relative">
                      <AlignLeft className="absolute left-4 top-4 size-4 text-primary/40" />
                      <Textarea
                        className="min-h-[120px] pl-12 pt-3.5 bg-background/50 border-border rounded-2xl resize-none focus:border-primary transition-all"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </div>
                  </Field>
                )}
              </form.Field>

              {/* Submit Button */}
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
              >
                {([canSubmit, isSubmitting]) => (
                  <Button
                    type="submit"
                    disabled={!canSubmit || isSubmitting}
                    className="w-full h-14 rounded-full bg-primary text-primary-foreground font-bold uppercase tracking-[0.3em] text-xs hover:text-cream transition-all duration-500 shadow-xl shadow-primary/10 hover:bg-accent group"
                  >
                    <span className="flex items-center gap-3">
                      {isSubmitting ? (
                        "Synchronizing..."
                      ) : (
                        <>
                          <Save size={16} /> Save Changes
                        </>
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
