"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { motion } from "framer-motion";
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
import * as z from "zod";
import { createMealAction } from "@/actions/provider.action";
import {
  Utensils,
  DollarSign,
  Image as ImageIcon,
  Tag,
  AlignLeft,
} from "lucide-react";
import { ICategory } from "@/types";

const mealSchema = z.object({
  name: z.string().min(3, "Dish name must be at least 3 characters"),
  description: z.string().min(10, "Description must be appetizingly detailed"),
  price: z
    .number()
    .positive("Price must be a valid amount")
    .max(1500, "Price cannot exceed 1500"),
  categoryId: z.string().min(1, "Please select a culinary category"),
  imageUrl: z.string().url("Invalid archive seal link (Image URL required)"),
});

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
};

export default function CreateMealFormClient({
  categories,
}: {
  categories: ICategory[];
}) {
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      categoryId: "",
      imageUrl: "",
    },
    validators: { onChange: mealSchema },
    onSubmit: async ({ value }) => {
      toast.promise(createMealAction(value), {
        loading: "Integrating new recipe into the archives...",
        success: (res) => {
          if (res.error) throw new Error(res.error.message);
          form.reset();
          return "Recipe Synchronized Successfully!";
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
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <Card className="shadow-premium-dark border-primary/20 bg-card/40 backdrop-blur-md rounded-[2.5rem] overflow-hidden">
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse" />
        <CardHeader>
          <CardDescription className="text-primary/60 italic text-sm">
            Curate your next masterpiece. Every detail must be culinary
            perfection.
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
                <motion.div variants={itemVariants}>
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
                            placeholder="e.g., Soup Dumplings"
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
                </motion.div>

                {/* Price */}
                <motion.div variants={itemVariants}>
                  <form.Field name="price">
                    {(field) => (
                      <Field className="space-y-1.5">
                        <FieldLabel className="text-cream text-[10px] uppercase tracking-widest font-bold">
                          Price
                        </FieldLabel>
                        <div className="relative">
                          <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-primary/40" />
                          <Input
                            // 1. Using "text" instead of "number" gives you total control over the input string
                            type="text"
                            className="pl-12 bg-background/50 border-border rounded-2xl h-14"
                            // 2. We show the value as-is from state. If it's 0, we can show an empty string or a placeholder
                            value={
                              field.state.value === 0 ? "" : field.state.value
                            }
                            onBlur={field.handleBlur}
                            onChange={(e) => {
                              const val = e.target.value;

                              // 3. Regex allows only numbers and a single optional decimal point
                              if (val === "" || /^\d*\.?\d*$/.test(val)) {
                                const numericValue =
                                  val === "" ? 0 : parseFloat(val);

                                // 4. Enforce the 1500 limit immediately or let Zod handle it
                                // If you want to stop them from even typing more than 1500:
                                if (numericValue <= 1500) {
                                  field.handleChange(numericValue);
                                }
                              }
                            }}
                            placeholder="365.00"
                          />
                        </div>
                        {field.state.meta.isTouched &&
                          field.state.meta.errors.length > 0 && (
                            <FieldError
                              errors={field.state.meta.errors}
                              className="text-cream italic text-[11px]"
                            />
                          )}
                      </Field>
                    )}
                  </form.Field>
                </motion.div>
              </div>

              {/* Category Select */}
              <motion.div variants={itemVariants}>
                <form.Field name="categoryId">
                  {(field) => (
                    <Field className="space-y-1.5">
                      <FieldLabel className="text-cream text-[10px] uppercase tracking-widest font-bold">
                        Category
                      </FieldLabel>
                      <div className="relative">
                        <Tag className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-primary/40" />
                        <select
                          className="w-full pl-12 bg-background border border-border rounded-2xl h-14 appearance-none text-sm text-cream focus:border-primary focus:outline-none transition-all disabled:opacity-50"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          /* Disable the select if no categories exist to prevent invalid submissions */
                          disabled={categories.length === 0}
                        >
                          {categories.length > 0 ? (
                            <>
                              <option value="" className="font-bold italic">
                                Select a Category
                              </option>
                              {categories.map((cat) => (
                                <option
                                  key={cat.id}
                                  value={cat.id}
                                  className="bg-card"
                                >
                                  {cat.name}
                                </option>
                              ))}
                            </>
                          ) : (
                            /* Fallback for when the kitchen archives are empty */
                            <option value="" className="italic">
                              No categories available. Contact an admin.
                            </option>
                          )}
                        </select>
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
              </motion.div>

              {/* Image URL */}
              <motion.div variants={itemVariants}>
                <form.Field name="imageUrl">
                  {(field) => (
                    <Field className="space-y-1.5">
                      <FieldLabel className="text-cream text-[10px] uppercase tracking-widest font-bold">
                        Image (URL)
                      </FieldLabel>
                      <div className="relative">
                        <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-primary/40" />
                        <Input
                          className="pl-12 bg-background/50 border-border rounded-2xl h-14"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="https://unsplash.com/..."
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
              </motion.div>

              {/* Description */}
              <motion.div variants={itemVariants}>
                <form.Field name="description">
                  {(field) => (
                    <Field className="space-y-1.5">
                      <FieldLabel className="text-cream text-[10px] uppercase tracking-widest font-bold">
                        Describe your dish
                      </FieldLabel>
                      <div className="relative">
                        <AlignLeft className="absolute left-4 top-4 size-4 text-primary/40" />
                        <Textarea
                          className="min-h-[100px] pl-12 pt-3.5 bg-background/50 border-border rounded-2xl resize-none focus:border-primary transition-all"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="Soft and juicy dumplings with thick soup..."
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
              </motion.div>

              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
              >
                {([canSubmit, isSubmitting]) => (
                  <Button
                    type="submit"
                    disabled={!canSubmit || isSubmitting}
                    className="w-full h-14 rounded-full bg-primary hover:text-white hover:font-bold text-primary-foreground font-bold uppercase tracking-[0.3em] text-xs transition-all duration-500 shadow-xl shadow-primary/10 hover:bg-accent group"
                  >
                    {isSubmitting ? "Orchestrating..." : "Create Recipe"}
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
