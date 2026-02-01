import { publicService } from "@/services/publicServices/public.service";
import CategoryCard from "@/components/modules/public/CategoryCard";
import { ICategory } from "@/types";

export default async function CategoriesPage() {
  const { data: categories, error } = await publicService.getCategories();

  if (error || !categories)
    return (
      <div className="p-20 text-center text-caramel font-serif italic">
        The pantry is currently empty: {error || "No categories found"}
      </div>
    );

  return (
    <div className="min-h-screen bg-[#1A0F0D] py-32 px-6 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <header className="mb-24 space-y-6 text-center relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-64 bg-caramel/5 blur-[120px] -z-10" />

          <div className="inline-block px-5 py-1.5 rounded-full border border-caramel/20 text-[10px] uppercase tracking-[0.4em] text-caramel font-bold duration-1000 animate-in fade-in slide-in-from-top-4 fill-mode-both">
            Curated Menus
          </div>

          <h1 className="text-5xl md:text-8xl font-serif font-bold text-cream tracking-tighter duration-1000 delay-150 animate-in fade-in slide-in-from-bottom-6 fill-mode-both">
            Choose your <span className="text-amber-700 italic">Flavor</span>
          </h1>

          <div className="h-px w-24 bg-gradient-to-r from-transparent via-caramel/30 to-transparent mx-auto duration-1000 delay-300 animate-in fade-in zoom-in-x-50 fill-mode-both" />
        </header>

        {/* Removed perspective and complex wrapper animations that caused the conflict */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {categories
            .filter((cat: ICategory) => cat && cat.name)
            .map((category: ICategory, index: number) => (
              <div
                key={category.id || index}
                className="h-full transition-transform duration-700 ease-out"
                // We keep the index passing to CategoryCard so its internal Framer Motion stagger works
              >
                <CategoryCard category={category} index={index} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
