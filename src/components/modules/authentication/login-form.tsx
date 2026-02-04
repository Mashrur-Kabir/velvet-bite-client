"use client";

import { useForm } from "@tanstack/react-form";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Link from "next/link";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { ArrowRight, Loader2 } from "lucide-react";

// 1. Logic Harmony: Define the Login Schema
const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export function LoginForm() {
  const router = useRouter();

  // 2. Logic Harmony: Initialize TanStack Form
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: async ({ value }) => {
      const loginPromise = async () => {
        const { data, error } = await authClient.signIn.email({
          email: value.email,
          password: value.password,
        });

        if (error) {
          throw new Error(error.message || "Authentication failed");
        }
        return data;
      };

      // 3. Visual Harmony: The Velvet Toast (Matched to RegisterForm)
      toast.promise(loginPromise(), {
        loading: "Verifying credentials with the Velvet kitchen...",
        success: () => {
          // Redirect to home after successful login
          router.push("/");

          return (
            <div className="flex flex-col">
              <span className="font-bold">Access Granted. Welcome back.</span>
              <span className="text-xs opacity-70">
                Your session has been restored to the Velvet Bite records.
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
          boxShadow: "0 0 15px rgba(192, 133, 82, 0.3)", // Beige glow
        },
      });
    },
  });

  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      toast.error(`Kitchen uplink failed:\n${error}`);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif font-bold text-brownie dark:text-cream">
            Welcome Back
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Log in to your Velvet Bite account
          </p>
        </div>

        <Card className="border-border bg-card shadow-2xl overflow-hidden rounded-[2.5rem]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <CardContent className="space-y-6 pt-10">
              {/* Email Field */}
              <form.Field name="email">
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Email</Label>
                    <Input
                      id={field.name}
                      type="email"
                      placeholder="name@example.com"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="rounded-xl border-border/50 h-12"
                    />
                    {/* FIXED: Optional chaining used to prevent undefined error */}
                    {field.state.meta.isTouched &&
                      (field.state.meta.errors?.length ?? 0) > 0 && (
                        <p className="text-xs text-destructive">
                          {field.state.meta.errors?.[0]?.message}
                        </p>
                      )}
                  </div>
                )}
              </form.Field>

              {/* Password Field */}
              <form.Field name="password">
                {(field) => (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={field.name}>Password</Label>
                      <Link
                        href="/forgot-password"
                        className="text-xs text-primary hover:underline"
                      >
                        Forgot?
                      </Link>
                    </div>
                    <Input
                      id={field.name}
                      type="password"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="rounded-xl border-border/50 h-12"
                    />
                    {/* FIXED: Optional chaining used to prevent undefined error */}
                    {field.state.meta.isTouched &&
                      (field.state.meta.errors?.length ?? 0) > 0 && (
                        <p className="text-xs text-destructive">
                          {field.state.meta.errors?.[0]?.message}
                        </p>
                      )}
                  </div>
                )}
              </form.Field>
            </CardContent>

            <CardFooter className="flex flex-col gap-4 pt-10 pb-10">
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
              >
                {([canSubmit, isSubmitting]) => (
                  <Button
                    type="submit"
                    disabled={!canSubmit || isSubmitting}
                    className="w-full h-14 bg-cream text-primary-foreground rounded-2xl font-bold text-lg shadow-xl shadow-accent/5 hover:bg-primary-foreground/80 hover:text-white/90 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-500 group"
                  >
                    {isSubmitting ? (
                      <Loader2 className="animate-spin size-5" />
                    ) : (
                      <span className="flex items-center gap-2 tracking-tight">
                        Sign In
                        <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    )}
                  </Button>
                )}
              </form.Subscribe>

              {/* --- CLASSY DIVIDER --- */}
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-accent/5" />
                </div>
                <div className="relative px-4 bg-transparent">
                  <span className="text-[10px] uppercase tracking-[0.5em] text-cream font-black italic">
                    Or
                  </span>
                </div>
              </div>

              <Button
                onClick={handleGoogleLogin}
                variant="outline"
                type="button"
                className="w-full h-14 border-accent/10 bg-cream text-primary-foreground hover:bg-primary-foreground/80 hover:border-cream/40 hover:text-white/90 rounded-2xl transition-all duration-500 flex items-center justify-center gap-3 group"
              >
                {/* Lucide Icons for Google often require a custom SVG or just use a generic Chrome icon */}
                <svg
                  className="size-4 group-hover:scale-110 transition-transform fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-2.21 5.39-7.84 5.39-4.84 0-8.79-4.01-8.79-8.91s3.95-8.91 8.79-8.91c2.75 0 4.59 1.16 5.64 2.17l2.58-2.48C19.11 0 16.03 0 12.48 0 5.86 0 .5 5.37.5 12s5.36 12 11.98 12c6.91 0 11.5-4.86 11.5-11.7 0-.79-.08-1.39-.18-1.98h-11.32z" />
                </svg>
                <span className="font-semibold tracking-wide text-sm">
                  Continue with Google
                </span>
              </Button>

              <p className="text-center text-sm text-muted-foreground mt-2">
                New to Velvet Bite?{" "}
                <Link
                  href="/register"
                  className="text-primary font-extrabold hover:underline"
                >
                  Register now
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
