"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { User, Phone, Image as ImageIcon, CheckCircle2 } from "lucide-react";
import { updateProfileAction } from "@/actions/customer.action";
import { IUser } from "@/types";
import * as z from "zod";
import { useRouter } from "next/navigation";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Provide a valid phone number"),
  image: z.url("Valid image archive link required"),
});

// Explicitly typing variants to resolve ts(2322)
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function UpdateCustomerProfileFormClient({
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
    },
    validators: { onChange: profileSchema },
    onSubmit: async ({ value }) => {
      toast.promise(updateProfileAction(value), {
        loading: "Synchronizing with the archives...",
        success: (res) => {
          if (res.error) throw new Error(res.error.message);
          // redirect
          router.push("/dashboard/profile");
          router.refresh();

          return (
            <div className="flex flex-col">
              <span className="font-bold">Identity Updated!</span>
              <span className="text-xs opacity-70">
                Changes have been committed to the database.
              </span>
            </div>
          );
        },
        error: (err) => err.message,
        style: {
          background: "#2D1B16",
          color: "#F3E9DC",
          border: "1px solid #8B0000",
          padding: "16px",
          boxShadow: "0 0 15px rgba(139, 0, 0, 0.2)",
        },
      });
    },
  });

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Card className="border-caramel/10 bg-[#2D1B16]/40 backdrop-blur-xl shadow-2xl rounded-[2.5rem] overflow-hidden">
        <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-caramel to-transparent opacity-50" />
        <CardContent className="p-10">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="space-y-8"
          >
            {/* --- NAME FIELD --- */}
            <motion.div variants={itemVariants}>
              <form.Field name="name">
                {(field) => (
                  <Field className="space-y-2">
                    <FieldLabel className="text-cream/80 text-[10px] uppercase tracking-[0.2em] font-bold pl-1">
                      Full Identity
                    </FieldLabel>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-caramel/40 transition-colors group-focus-within:text-caramel" />
                      <Input
                        className="pl-12 bg-black/20 border-caramel/10 rounded-2xl h-14 text-cream focus:ring-caramel/20 transition-all duration-300"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="John Doe"
                      />
                    </div>
                    <FieldError
                      errors={field.state.meta.errors}
                      className="text-[10px] text-caramel italic"
                    />
                  </Field>
                )}
              </form.Field>
            </motion.div>

            {/* --- PHONE FIELD --- */}
            <motion.div variants={itemVariants}>
              <form.Field name="phone">
                {(field) => (
                  <Field className="space-y-2">
                    <FieldLabel className="text-cream/80 text-[10px] uppercase tracking-[0.2em] font-bold pl-1">
                      Contact Line
                    </FieldLabel>
                    <div className="relative group">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-caramel/40 transition-colors group-focus-within:text-caramel" />
                      <Input
                        className="pl-12 bg-black/20 border-caramel/10 rounded-2xl h-14 text-cream focus:ring-caramel/20 transition-all duration-300"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="017XXXXXXXX"
                      />
                    </div>
                    <FieldError
                      errors={field.state.meta.errors}
                      className="text-[10px] text-caramel italic"
                    />
                  </Field>
                )}
              </form.Field>
            </motion.div>

            {/* --- IMAGE URL FIELD --- */}
            <motion.div variants={itemVariants}>
              <form.Field name="image">
                {(field) => (
                  <Field className="space-y-2">
                    <FieldLabel className="text-cream/80 text-[10px] uppercase tracking-[0.2em] font-bold pl-1">
                      Portrait Link (URL)
                    </FieldLabel>
                    <div className="relative group">
                      <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-caramel/40 transition-colors group-focus-within:text-caramel" />
                      <Input
                        className="pl-12 bg-black/20 border-caramel/10 rounded-2xl h-14 text-cream focus:ring-caramel/20 transition-all duration-300"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="https://..."
                      />
                    </div>
                    <FieldError
                      errors={field.state.meta.errors}
                      className="text-[10px] text-caramel italic"
                    />
                  </Field>
                )}
              </form.Field>
            </motion.div>

            {/* --- SUBMIT BUTTON --- */}
            <motion.div variants={itemVariants}>
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
              >
                {([canSubmit, isSubmitting]) => (
                  <Button
                    type="submit"
                    disabled={!canSubmit || isSubmitting}
                    className="w-full h-16 bg-cream text-primary-foreground hover:bg-primary-foreground/80 hover:text-white/90 border hover:border-cream font-serif text-xl font-bold rounded-2xl transition-all duration-500 active:scale-[0.98] disabled:opacity-50 group transform-gpu"
                  >
                    {isSubmitting ? "Refining Identity..." : "Commit Changes"}
                    <CheckCircle2 className="ml-2 size-5 transition-transform group-hover:scale-110" />
                  </Button>
                )}
              </form.Subscribe>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
