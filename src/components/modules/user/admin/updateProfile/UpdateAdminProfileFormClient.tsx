"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { IUser } from "@/types";
import { updateAdminProfileAction } from "@/actions/admin.action";
import { User, Phone, Image as ImageIcon, Save, X } from "lucide-react";
import * as z from "zod";

// Admin Profile Validation Schema
const adminSchema = z.object({
  name: z.string().min(3, "Administrator name must be at least 3 characters"),
  phone: z
    .string()
    .min(10, "A valid direct line is required")
    .nullable()
    .optional(),
  image: z
    .string()
    .url("Invalid visual essence link")
    .nullable()
    .optional()
    .or(z.literal("")),
});

type AdminSchema = z.infer<typeof adminSchema>;

export default function UpdateAdminProfileFormClient({
  user,
}: {
  user: IUser;
}) {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: user.name || "",
      phone: user.phone || "",
      image: user.image || "",
    } as AdminSchema,
    validators: { onChange: adminSchema },
    onSubmit: async ({ value }) => {
      toast.promise(updateAdminProfileAction(value), {
        loading: "Synchronizing administrative credentials...",
        success: (res) => {
          if (res.error) throw new Error(res.error.message);
          router.push("/admin-dashboard");
          return "Imperial records successfully updated.";
        },
        error: (err) => err.message,
        style: {
          background: "oklch(0.45 0.08 55)", // Deep Roast
          color: "oklch(0.92 0.03 65)", // Cream
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
            Refine system administrator credentials. These changes propagate
            across all governance modules.
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
              {/* Admin Name */}
              <form.Field name="name">
                {(field) => (
                  <Field className="space-y-1.5">
                    <FieldLabel className="text-cream text-[10px] uppercase tracking-widest font-bold ml-1">
                      Administrator Name
                    </FieldLabel>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-primary/40" />
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
                        className="text-rose-400 italic text-[11px]"
                      />
                    )}
                  </Field>
                )}
              </form.Field>

              {/* Visual Essence (Image URL) */}
              <form.Field name="image">
                {(field) => (
                  <Field className="space-y-1.5">
                    <FieldLabel className="text-cream text-[10px] uppercase tracking-widest font-bold ml-1">
                      Visual Essence (Avatar URL)
                    </FieldLabel>
                    <div className="relative">
                      <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-primary/40" />
                      <Input
                        className="pl-12 bg-background/50 border-border rounded-2xl h-14 text-cream focus:border-primary/50 transition-all"
                        value={field.state.value ?? ""}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="https://images.unsplash.com/..."
                      />
                    </div>
                  </Field>
                )}
              </form.Field>

              {/* Direct Line (Phone) */}
              <form.Field name="phone">
                {(field) => (
                  <Field className="space-y-1.5">
                    <FieldLabel className="text-cream text-[10px] uppercase tracking-widest font-bold ml-1">
                      Direct Line (Optional)
                    </FieldLabel>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-primary/40" />
                      <Input
                        className="pl-12 bg-background/50 border-border rounded-2xl h-14 text-cream focus:border-primary/50 transition-all"
                        value={field.state.value ?? ""}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </div>
                  </Field>
                )}
              </form.Field>

              {/* Governance Actions */}
              <div className="flex flex-col md:flex-row gap-4 pt-6 border-t border-white/5">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/admin-dashboard")}
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
                      className="flex-[2] h-14 rounded-full bg-primary text-primary-foreground font-bold hover:text-cream uppercase tracking-[0.3em] text-[10px] transition-all duration-500 shadow-xl shadow-primary/10 hover:bg-accent group"
                    >
                      <span className="flex items-center gap-3">
                        {state.isSubmitting ? (
                          "Orchestrating..."
                        ) : (
                          <>
                            <Save size={16} /> Update Admin Profile
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
