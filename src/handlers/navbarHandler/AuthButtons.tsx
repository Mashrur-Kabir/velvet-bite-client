"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const AuthButtons = ({ className }: { className?: string }) => {
  const pathname = usePathname();

  return (
    <div className={cn("flex items-center gap-4", className)}>
      {/* --- LOGIN LINK (Archival Style) --- */}
      <Button
        asChild
        variant="ghost"
        size="sm"
        className={cn(
          "relative h-9 px-4 group transition-colors duration-500",
          "hover:!bg-transparent text-muted-foreground hover:text-primary",
          "after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[1px] after:bg-primary after:transition-all after:duration-500 after:ease-out",
          pathname === "/login"
            ? "text-primary after:w-full"
            : "after:w-0 hover:after:w-full",
        )}
      >
        <Link
          href="/login"
          className="font-bold uppercase tracking-[0.2em] text-[10px]"
        >
          Login
        </Link>
      </Button>

      {/* --- REGISTER BUTTON (Glow Style) --- */}
      <Button
        asChild
        size="sm"
        className={cn(
          "relative h-9 px-6 font-bold uppercase tracking-[0.2em] text-[10px] rounded-full transition-all duration-500",
          "transform-gpu will-change-transform border border-transparent",
          pathname === "/register"
            ? "bg-primary text-white shadow-[0_0_15px_rgba(192,133,82,0.4)] border-primary"
            : "bg-primary/10 text-primary border-primary/20 hover:bg-primary hover:text-white hover:shadow-[0_0_20px_rgba(192,133,82,0.5)] hover:-translate-y-0.5",
        )}
      >
        <Link href="/register">Register</Link>
      </Button>
    </div>
  );
};
