"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the forensics to your error reporting service (e.g., Sentry)
    console.error("Transmission Error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center space-y-8">
      <div className="size-24 rounded-[2rem] bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500 animate-pulse">
        <AlertTriangle size={40} />
      </div>

      <div className="space-y-4">
        <h1 className="text-5xl font-serif font-bold text-cream tracking-tight">
          System <span className="text-rose-500 italic">Interruption</span>
        </h1>
        <p className="text-cream/40 max-w-md mx-auto font-serif italic text-lg">
          ‟The kitchen encountered an unexpected logistical error while
          preparing your request.”
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button
          onClick={() => reset()}
          className="bg-primary w-full hover:bg-amber-800 text-white px-8 h-14 rounded-full font-bold uppercase tracking-widest text-xs"
        >
          <RefreshCcw className="mr-2 size-4" /> Retry
        </Button>
        <Button
          asChild
          variant="outline"
          className="border-white/10 w-full text-cream/60 hover:text-cream px-8 h-14 rounded-full font-bold uppercase tracking-widest text-xs"
        >
          <Link href="/">
            <Home className="mr-2 size-4" /> Return Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
