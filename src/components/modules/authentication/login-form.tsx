"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export function LoginForm() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm space-y-8"
      >
        <div className="text-center">
          <h1 className="text-4xl font-serif font-bold text-brownie dark:text-cream">
            Welcome Back
          </h1>
          <p className="text-muted-foreground mt-2">
            Log in to your Velvet Bite account
          </p>
        </div>

        <form className="space-y-4 bg-card p-8 rounded-[2.5rem] border border-border shadow-lg">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required className="rounded-xl" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <button
                type="button"
                className="text-xs text-primary hover:underline"
              >
                Forgot?
              </button>
            </div>
            <Input
              id="password"
              type="password"
              required
              className="rounded-xl"
            />
          </div>
          <Button className="w-full bg-primary hover:bg-caramel text-white rounded-xl py-6 font-bold transition-all">
            Sign In
          </Button>
        </form>

        <p className="text-center text-sm">
          New to Velvet Bite?{" "}
          <Link
            href="/register"
            className="text-primary font-bold hover:underline"
          >
            Register now
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
