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
import { cn } from "@/lib/utils";
import * as z from "zod";
import { createProviderAction } from "@/actions/provider.action";
import { Store, MapPin, Phone, AlignLeft, ArrowRight } from "lucide-react";

// 1. Kitchen Schema
const providerSchema = z.object({
  name: z.string().min(3, "Kitchen name must be at least 3 characters"),
  description: z.string().min(10, "Tell us more about your flavors"),
  address: z.string().min(5, "A valid address is required for deliveries"),
  phone: z.string().min(10, "A valid contact number is required"),
});

// 2. Animation Orchestration
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
};

export default function CreateProviderFormClient() {
  const form = useForm({
    defaultValues: { name: "", description: "", address: "", phone: "" },
    validators: { onChange: providerSchema },
    onSubmit: async ({ value }) => {
      toast.promise(createProviderAction(value), {
        loading: "Establishing Kitchen identity in Velvet archives...",
        success: (res) => {
          if (res.error) throw new Error(res.error.message);
          form.reset();
          return (
            <div className="flex flex-col">
              <span className="font-bold">Done!</span>
              <span className="text-xs opacity-70">
                Your Velvet Kitchen profile has been established.
              </span>
            </div>
          );
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
      <Card className="shadow-2xl border-primary/20 bg-card/40 backdrop-blur-sm overflow-hidden rounded-[2.5rem]">
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse" />
        <CardHeader>
          <CardDescription className="text-primary/60 italic text-sm">
            Configure your professional culinary presence. Sealed by the Velvet
            Kitchen Security Protocol.
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
            <FieldGroup className="space-y-6 flex flex-col items-center">
              {/* Kitchen Name Field */}
              <motion.div variants={itemVariants} className="w-full">
                <form.Field name="name">
                  {(field) => (
                    <Field className="space-y-1.5">
                      <FieldLabel className="text-cream text-[10px] uppercase tracking-widest font-bold">
                        Kitchen Identity
                      </FieldLabel>
                      <div className="relative">
                        <Store className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-primary/40" />
                        <Input
                          className="pl-12 bg-background/50 border-border focus:border-primary transition-all duration-300 rounded-2xl h-12"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="e.g., Peri House"
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

              {/* Description Field */}
              <motion.div variants={itemVariants} className="w-full">
                <form.Field name="description">
                  {(field) => (
                    <Field className="space-y-1.5">
                      <FieldLabel className="text-cream text-[10px] uppercase tracking-widest font-bold">
                        Culinary Brief
                      </FieldLabel>
                      <div className="relative">
                        <AlignLeft className="absolute left-4 top-4 size-4 text-primary/40" />
                        <Textarea
                          className="min-h-[120px] pl-12 pt-3.5 bg-background/50 border-border focus:border-primary transition-all duration-300 resize-none rounded-2xl"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="Describe your spicy, tangy party of flavors..."
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                {/* Phone Field */}
                <motion.div variants={itemVariants}>
                  <form.Field name="phone">
                    {(field) => (
                      <Field className="space-y-1.5">
                        <FieldLabel className="text-cream text-[10px] uppercase tracking-widest font-bold">
                          Direct Line
                        </FieldLabel>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-primary/40" />
                          <Input
                            className="pl-12 bg-background/50 border-border focus:border-primary transition-all duration-300 rounded-2xl h-12"
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder="013XXXXXXXX"
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

                {/* Address Field */}
                <motion.div variants={itemVariants}>
                  <form.Field name="address">
                    {(field) => (
                      <Field className="space-y-1.5">
                        <FieldLabel className="text-cream text-[10px] uppercase tracking-widest font-bold">
                          Kitchen Base
                        </FieldLabel>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-primary/40" />
                          <Input
                            className="pl-12 bg-background/50 border-border focus:border-primary transition-all duration-300 rounded-2xl h-12"
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder="Mirpur 14, Dhaka"
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

              {/* Submit Button */}
              <motion.div
                variants={itemVariants}
                className="pt-6 w-full flex justify-center"
              >
                <form.Subscribe
                  selector={(state) => [state.canSubmit, state.isSubmitting]}
                >
                  {([canSubmit, isSubmitting]) => (
                    <Button
                      type="submit"
                      disabled={!canSubmit || isSubmitting}
                      className={cn(
                        "w-full h-14 relative overflow-hidden transition-all duration-500 rounded-full",
                        "bg-primary text-primary-foreground font-bold tracking-[0.3em] uppercase",
                        "active:scale-[0.98] disabled:opacity-20 disabled:grayscale group shadow-xl shadow-primary/10",
                      )}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
                      {isSubmitting ? (
                        <span className="flex items-center gap-3 animate-pulse">
                          Establishing Protocol...
                        </span>
                      ) : (
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          Establish Kitchen{" "}
                          <ArrowRight
                            size={16}
                            className="group-hover:translate-x-2 transition-transform"
                          />
                        </span>
                      )}
                    </Button>
                  )}
                </form.Subscribe>
              </motion.div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
