import { publicService } from "@/services/publicServices/public.service";
import ProviderCard from "@/components/modules/public/ProviderCard";

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
        {/* Using standard Tailwind for Server-Side entrance animations */}
        <header className="mb-16 space-y-4 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="inline-block px-4 py-1 rounded-full border border-caramel/20 text-[10px] uppercase tracking-[0.3em] text-caramel">
            Our Master Chefs
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-cream tracking-tight">
            Meet the <span className="text-caramel italic">Providers</span>
          </h1>
        </header>

        {/* The grid is static, but each ProviderCard handles its own motion */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {providers?.map((provider, index) => (
            <ProviderCard key={provider.id} provider={provider} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
