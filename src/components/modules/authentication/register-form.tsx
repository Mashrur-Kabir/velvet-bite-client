"use client";

import { StandardSchemaV1Issue, useForm } from "@tanstack/react-form";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import Link from "next/link";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { Roles } from "@/constants/userRoles";
import { SignUpParams } from "@/types/moduleTypes/signup.type";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Minimum 8 characters"),
    confirmPassword: z.string().min(8, "Minimum 8 characters"),
    role: z.enum(["customer", "provider"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FieldErrorProps = {
  errors?: (StandardSchemaV1Issue | undefined)[];
};

// Typed Error Component keeping your subtle archival style
const FieldError = ({ errors }: FieldErrorProps) => {
  const issue = errors?.find(
    (e): e is StandardSchemaV1Issue =>
      typeof e === "object" && e !== undefined && "message" in e,
  );

  return (
    <div className="min-h-[16px] mt-1">
      <AnimatePresence mode="wait">
        {issue && (
          <motion.span
            key={issue.message}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-[10px] text-rose-400 italic font-medium tracking-wide block ml-1"
          >
            {issue.message}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};

export function RegisterForm() {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "customer" as "customer" | "provider",
    },
    validators: { onChange: formSchema }, // Validate on change for better UX
    onSubmit: async ({ value }) => {
      const registrationPromise = async () => {
        const { data, error } = await authClient.signUp.email({
          email: value.email,
          password: value.password,
          name: value.name,
          role: value.role === "provider" ? Roles.provider : Roles.customer,
        } as SignUpParams);

        if (error) throw new Error(error.message || "Registration failed");
        return data;
      };

      toast.promise(registrationPromise(), {
        loading: "Syncing with the Velvet kitchen...",
        success: () => {
          form.reset();
          router.push("/");
          return (
            <div className="flex flex-col">
              <span className="font-bold">
                Welcome, {value.name}. Access Granted.
              </span>
              <span className="text-xs opacity-70">
                Velvet Bites community welcomes you :).
              </span>
            </div>
          );
        },
        error: (err) => err.message,
        style: {
          background: "#5E3023",
          color: "#F3E9DC",
          border: "1px solid #C08552",
          padding: "16px",
          boxShadow: "0 0 15px rgba(192, 133, 82, 0.3)",
        },
      });
    },
  });

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        <Card className="border-border bg-card shadow-2xl overflow-hidden rounded-[2.5rem]">
          <CardHeader className="space-y-1 text-center pt-10">
            <CardTitle className="text-4xl font-serif font-bold text-brownie dark:text-cream">
              Create Account
            </CardTitle>
            <CardDescription className="text-lg">
              Join the Velvet Bite community today.
            </CardDescription>
          </CardHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <CardContent className="space-y-6">
              {/* --- ROLE TOGGLE --- */}
              <form.Field name="role">
                {(field) => (
                  <div className="flex p-1 bg-muted rounded-2xl gap-1">
                    {(["customer", "provider"] as const).map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => field.handleChange(r)}
                        className={cn(
                          "flex-1 py-3 rounded-xl text-sm font-bold transition-all capitalize",
                          field.state.value === r
                            ? "bg-cream text-primary-foreground scale-[1.02]"
                            : "text-muted-foreground hover:bg-background/50",
                        )}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                )}
              </form.Field>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <form.Field name="name">
                  {(field) => (
                    <div className="flex flex-col">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="Your Name"
                          className="rounded-xl border-border/50 h-12"
                        />
                      </div>
                      <FieldError errors={field.state.meta.errors} />
                    </div>
                  )}
                </form.Field>

                <form.Field name="email">
                  {(field) => (
                    <div className="flex flex-col">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="name@example.com"
                          className="rounded-xl border-border/50 h-12"
                        />
                      </div>
                      <FieldError errors={field.state.meta.errors} />
                    </div>
                  )}
                </form.Field>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <form.Field name="password">
                  {(field) => (
                    <div className="flex flex-col">
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          className="rounded-xl border-border/50 h-12"
                        />
                      </div>
                      <FieldError errors={field.state.meta.errors} />
                    </div>
                  )}
                </form.Field>

                <form.Field name="confirmPassword">
                  {(field) => (
                    <div className="flex flex-col">
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          className="rounded-xl border-border/50 h-12"
                        />
                      </div>
                      <FieldError errors={field.state.meta.errors} />
                    </div>
                  )}
                </form.Field>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-4 pt-6 pb-10">
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
              >
                {([canSubmit, isSubmitting]) => (
                  <Button
                    type="submit"
                    disabled={!canSubmit}
                    className="w-full bg-cream hover:bg-primary-foreground text-primary-foreground hover:text-white/90 rounded-2xl py-7 font-bold text-lg shadow-xs shadow-cream active:scale-[0.98] transition-all"
                  >
                    {isSubmitting ? "Creating..." : "Create Account"}
                  </Button>
                )}
              </form.Subscribe>

              <p className="text-center text-sm text-muted-foreground mt-2">
                Already part of the collective?{" "}
                <Link
                  href="/login"
                  className="text-primary font-extrabold hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
