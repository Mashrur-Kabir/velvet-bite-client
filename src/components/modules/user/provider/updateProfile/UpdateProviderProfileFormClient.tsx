"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
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
import { IProvider } from "@/types";
import { updateMyProviderAction } from "@/actions/provider.action";
import {
  Store,
  MapPin,
  Phone,
  AlignLeft,
  Save,
  X,
  ArrowRight,
} from "lucide-react";
import * as z from "zod";

// 1. Schema for Provider Profile validation
const providerSchema = z.object({
  name: z.string().min(3, "Kitchen Identity must be at least 3 characters"),
  description: z
    .string()
    .min(10, "Culinary Brief is too short for the archives"),
  address: z.string().min(5, "Base location is required for logistics"),
  phone: z.string().min(10, "A valid direct line is required"),
});

type ProviderSchema = z.infer<typeof providerSchema>;

export default function UpdateProviderProfileFormClient({
  provider,
}: {
  provider: IProvider;
}) {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: provider.name,
      description: provider.description,
      address: provider.address,
      phone: provider.phone,
    } as ProviderSchema,
    validators: { onChange: providerSchema },
    onSubmit: async ({ value }) => {
      toast.promise(updateMyProviderAction(value), {
        loading: "Synchronizing provider credentials...",
        success: (res) => {
          if (res.error) throw new Error(res.error.message);
          // 2. Redirect back to identity hub after success
          router.push("/provider-dashboard/profile");
          return "Kitchen identity successfully refined.";
        },
        error: (err) => err.message,
        style: {
          background: "oklch(0.45 0.08 55)", // Deep Medium roast accent
          color: "oklch(0.92 0.03 65)", // Creamy text
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
        <CardHeader className="pb-6">
          <CardDescription className="text-primary/60 italic text-sm">
            Update your professional credentials. Your changes will update the
            community records.
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
            <FieldGroup className="space-y-8">
              {/* Kitchen Identity Field */}
              <form.Field name="name">
                {(field) => (
                  <Field className="space-y-1.5">
                    <FieldLabel className="text-cream text-[10px] uppercase tracking-widest font-bold ml-1">
                      Kitchen Identity
                    </FieldLabel>
                    <div className="relative">
                      <Store className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-primary/40" />
                      <Input
                        className="pl-12 bg-background/50 border-border rounded-2xl h-14 text-cream focus:border-primary/50 transition-all"
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

              {/* Culinary Brief Field */}
              <form.Field name="description">
                {(field) => (
                  <Field className="space-y-1.5">
                    <FieldLabel className="text-cream text-[10px] uppercase tracking-widest font-bold ml-1">
                      Culinary Brief
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Direct Line */}
                <form.Field name="phone">
                  {(field) => (
                    <Field className="space-y-1.5">
                      <FieldLabel className="text-cream text-[10px] uppercase tracking-widest font-bold ml-1">
                        Direct Line
                      </FieldLabel>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-primary/40" />
                        <Input
                          className="pl-12 bg-background/50 border-border rounded-2xl h-14 text-cream"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      </div>
                    </Field>
                  )}
                </form.Field>

                {/* Base Location */}
                <form.Field name="address">
                  {(field) => (
                    <Field className="space-y-1.5">
                      <FieldLabel className="text-cream text-[10px] uppercase tracking-widest font-bold ml-1">
                        Location
                      </FieldLabel>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-primary/40" />
                        <Input
                          className="pl-12 bg-background/50 border-border rounded-2xl h-14 text-cream"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      </div>
                    </Field>
                  )}
                </form.Field>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col md:flex-row gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/provider-dashboard/profile")}
                  className="flex-1 h-14 rounded-full border-primary/20 text-primary hover:bg-primary/5 transition-all uppercase tracking-widest text-[10px] font-bold"
                >
                  <X size={14} className="mr-2" /> Discard Changes
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
                      className="flex-[2] h-14 rounded-full bg-primary text-primary-foreground font-bold uppercase tracking-[0.3em] text-[10px] transition-all duration-500 shadow-xl shadow-primary/10 hover:bg-accent group"
                    >
                      <span className="flex items-center gap-3 hover:text-cream">
                        {state.isSubmitting ? (
                          "Synchronizing..."
                        ) : (
                          <>
                            <Save size={16} /> Update Profile
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
