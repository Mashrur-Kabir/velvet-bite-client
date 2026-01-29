"use client";

import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export function RegisterForm() {
  const searchParams = useSearchParams();
  const role =
    searchParams.get("role") === "provider" ? "Provider" : "Customer";

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="border-border bg-card shadow-xl overflow-hidden rounded-[2rem]">
          <CardHeader className="space-y-1 text-center pt-8">
            <CardTitle className="text-3xl font-serif font-bold text-brownie dark:text-cream">
              Join as a {role}
            </CardTitle>
            <CardDescription>
              Create your Velvet Bite account to get started.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pb-8">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Your Name"
                className="rounded-xl border-border/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                className="rounded-xl border-border/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                className="rounded-xl border-border/50"
              />
            </div>

            <Button className="w-full bg-primary hover:bg-caramel text-white rounded-xl py-6 font-bold text-lg mt-4 transition-all active:scale-[0.98]">
              Create Account
            </Button>

            <p className="text-center text-sm text-muted-foreground mt-4">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary font-bold hover:underline"
              >
                Login
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
