import Link from "next/link";
import { Utensils, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#1A0F0D] flex items-center justify-center px-6">
      <div className="text-center space-y-12 relative">
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-96 bg-primary/5 blur-[120px] -z-10" />

        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="size-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-primary/40">
              <Utensils size={32} />
            </div>
          </div>
          <h1 className="text-7xl md:text-9xl font-serif font-bold text-cream tracking-tighter opacity-20">
            404
          </h1>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-cream -mt-16 md:-mt-24">
            Asset <span className="text-primary italic">Not Found</span>
          </h2>
          <p className="text-cream/40 font-serif italic text-xl">
            This destination does not exist in our current archives.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-amber-800 transition-all group"
        >
          Back to Velvet{" "}
          <ArrowRight
            size={16}
            className="group-hover:translate-x-2 transition-transform"
          />
        </Link>
      </div>
    </div>
  );
}
