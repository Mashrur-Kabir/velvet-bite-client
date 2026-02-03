"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IMeal, ICategory } from "@/types";
import { updateMealAction } from "@/actions/provider.action";
import {
  Utensils,
  DollarSign,
  AlignLeft,
  Save,
  Tag,
  Eye,
  EyeOff,
  X,
  Image as ImageIcon, // Added for the new field
} from "lucide-react";
import * as z from "zod";

const mealSchema = z.object({
  name: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Brief is too short for the archives"),
  price: z.number().positive().max(1500, "Price exceeds protocol limits"),
  categoryId: z.string().min(1, "Please select a category classification"),
  imageUrl: z.string().url("Invalid visual essence link"), // Added to schema
  isAvailable: z.boolean(),
});

type MealSchema = z.infer<typeof mealSchema>;

interface Props {
  meal: IMeal;
  categories: ICategory[];
}

export default function UpdateMenuFormClient({ meal, categories }: Props) {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: meal.name,
      description: meal.description,
      price: meal.price,
      categoryId: meal.categoryId || "",
      imageUrl: meal.imageUrl || "", // Added to default values
      isAvailable: meal.isAvailable,
    } as MealSchema,
    validators: { onChange: mealSchema },
    onSubmit: async ({ value }) => {
      toast.promise(updateMealAction(meal.id, value), {
        loading: "Processing recipe changes...",
        success: (res) => {
          if (res.error) throw new Error(res.error.message);
          router.push("/provider-dashboard/my-menu");
          return "Recipe successfully updated in the archives.";
        },
        error: (err) => err.message,
        style: {
          background: "oklch(0.45 0.08 55)",
          color: "oklch(0.92 0.03 65)",
          border: "1px solid oklch(0.35 0.03 45)",
          fontFamily: "var(--font-serif)",
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
                          className="pl-12 bg-background/50 border-border rounded-2xl h-14 text-cream"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      </div>
                      {field.state.meta.errors.length > 0 && (
                        <FieldError
                          errors={field.state.meta.errors}
                          className="text-cream italic text-[11px]"
                        />
                      )}
                    </Field>
                  )}
                </form.Field>

                {/* Classification (Category) */}
                <form.Field name="categoryId">
                  {(field) => (
                    <Field className="space-y-1.5">
                      <FieldLabel className="text-cream text-[10px] uppercase tracking-widest font-bold">
                        Classification (Category)
                      </FieldLabel>
                      <div className="relative">
                        <Tag className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-primary/40 z-10" />
                        <Select
                          onValueChange={(val) => field.handleChange(val)}
                          value={field.state.value}
                        >
                          <SelectTrigger className="pl-12 bg-background/50 border-border rounded-2xl h-14 text-cream focus:ring-0">
                            <SelectValue placeholder="Select classification" />
                          </SelectTrigger>
                          <SelectContent
                            position="popper"
                            sideOffset={8}
                            className="bg-[#2D1B16] border-caramel/20 text-cream rounded-2xl w-(--radix-select-trigger-width)"
                          >
                            {categories.map((cat) => (
                              <SelectItem
                                key={cat.id}
                                value={cat.id}
                                className="focus:bg-caramel focus:text-brownie"
                              >
                                {cat.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </Field>
                  )}
                </form.Field>
              </div>

              {/* Visual Essence (Image URL) - Added here */}
              <form.Field name="imageUrl">
                {(field) => (
                  <Field className="space-y-1.5">
                    <FieldLabel className="text-cream text-[10px] uppercase tracking-widest font-bold">
                      Visual Essence (URL)
                    </FieldLabel>
                    <div className="relative">
                      <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-primary/40" />
                      <Input
                        className="pl-12 bg-background/50 border-border rounded-2xl h-14 text-cream"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="https://images.unsplash.com/..."
                      />
                    </div>
                    {field.state.meta.errors.length > 0 && (
                      <FieldError
                        errors={field.state.meta.errors}
                        className="text-cream italic text-[11px]"
                      />
                    )}
                  </Field>
                )}
              </form.Field>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                          className="pl-12 bg-background/50 border-border rounded-2xl h-14 text-cream"
                          value={
                            field.state.value === 0 ? "" : field.state.value
                          }
                          onBlur={field.handleBlur}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val === "" || /^\d*\.?\d*$/.test(val)) {
                              const num = val === "" ? 0 : parseFloat(val);
                              if (num <= 1500) field.handleChange(num);
                            }
                          }}
                        />
                      </div>
                    </Field>
                  )}
                </form.Field>

                {/* Archive Visibility */}
                <form.Field name="isAvailable">
                  {(field) => (
                    <Field className="space-y-1.5">
                      <FieldLabel className="text-cream text-[10px] uppercase tracking-widest font-bold">
                        Archive Visibility
                      </FieldLabel>
                      <div className="flex items-center justify-between bg-background/50 border border-border rounded-2xl h-14 px-6">
                        <div className="flex items-center gap-3">
                          {field.state.value ? (
                            <Eye size={18} className="text-emerald-600" />
                          ) : (
                            <EyeOff size={18} className="text-rose-600" />
                          )}
                          <span className="text-xs text-cream font-medium">
                            {field.state.value
                              ? "Active in Menu"
                              : "Archived (Hidden)"}
                          </span>
                        </div>
                        <Switch
                          checked={field.state.value}
                          onCheckedChange={(checked: boolean) =>
                            field.handleChange(checked)
                          }
                          className="bg-accent data-[state=checked]:bg-cream"
                        />
                      </div>
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
                        className="min-h-[120px] pl-12 pt-3.5 bg-background/50 border-border rounded-2xl resize-none focus:border-primary transition-all text-cream"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </div>
                  </Field>
                )}
              </form.Field>

              {/* Action Buttons */}
              <div className="flex flex-col md:flex-row gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/provider-dashboard/my-menu")}
                  className="flex-1 h-14 rounded-full border-primary/20 text-primary hover:bg-primary/5 transition-all"
                >
                  <X size={16} className="mr-2" /> Discard Changes
                </Button>

                <form.Subscribe
                  selector={(state) => ({
                    canSubmit: state.canSubmit,
                    isSubmitting: state.isSubmitting,
                  })}
                >
                  {(state) => (
                    <Button
                      type="submit"
                      disabled={!state.canSubmit || state.isSubmitting}
                      className="flex-[2] h-14 rounded-full hover:bg-primary hover:text-primary-foreground font-bold uppercase tracking-[0.3em] text-xs text-cream bg-amber-950 transition-all duration-500 border-primary group"
                    >
                      <span className="flex items-center gap-3">
                        {state.isSubmitting ? (
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
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
