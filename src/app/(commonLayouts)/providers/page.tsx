import { publicService } from "@/services/publicServices/public.service";
import ProviderCard from "@/components/modules/public/ProviderCard";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default async function ProvidersPage() {
  const { data: providers, error } = await publicService.getProviders();

  if (error)
    return (
      <div className="p-20 text-center text-caramel font-serif italic">
        The kitchens are currently quiet: {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-[#1A0F0D] py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* --- NAVIGATION: FIXED HOVER PROTOCOL --- */}
        <div className="relative z-30 mb-10">
          {" "}
          {/* Wrap in a z-indexed relative container */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[12px] uppercase font-bold tracking-[0.3em] text-cream transition-all duration-500 ease-out group hover:text-primary"
          >
            <ChevronLeft
              size={20}
              className="group-hover:-translate-x-1.5 transition-transform duration-500 ease-out"
            />
            <span className="relative overflow-hidden">
              RETURN TO HOME
              {/* Animated underline for consistent Velvet aesthetic */}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-caramel/40 transition-all duration-500 group-hover:w-full" />
            </span>
          </Link>
        </div>

        {/* Header Animation remains the same */}
        <header className="mb-16 space-y-4 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="inline-block px-4 py-1 rounded-full border border-caramel/20 text-[10px] uppercase tracking-[0.3em] text-caramel font-bold">
            Our Master Chefs
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-cream tracking-tight">
            Meet the <span className="text-caramel italic">Providers</span>
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {providers?.map((provider, index) => (
            <ProviderCard key={provider.id} provider={provider} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
