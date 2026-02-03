import { getAllCategoriesAction } from "@/actions/admin.action";
import AllCategoryCards from "@/components/modules/user/admin/categories/AllCategoryCards";
import CreateCategoryModal from "@/components/modules/user/admin/categories/CreateCategoryModal"; // Import here
import { Layers } from "lucide-react";

export default async function AdminCategoriesPage() {
  const { data: categories } = await getAllCategoriesAction();

  return (
    <div className="max-w-5xl mx-auto py-16 px-6 space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Layers className="text-primary size-8" />
            <h1 className="text-5xl font-serif font-bold text-cream tracking-tight">
              Velvet <span className="text-primary italic">Categories</span>
            </h1>
          </div>
          <p className="text-muted-foreground uppercase tracking-[0.4em] text-[10px] font-bold opacity-60">
            Category Oversight
          </p>
        </div>

        {/* --- DYNAMIC MODAL REPLACES STATIC BUTTON --- */}
        <CreateCategoryModal />
      </header>

      <div className="grid grid-cols-1 gap-6">
        {categories && categories.length > 0 ? (
          categories.map((category) => (
            <AllCategoryCards key={category.id} category={category} />
          ))
        ) : (
          <div className="py-32 text-center border border-dashed border-border/40 rounded-[3rem] bg-card/5">
            <p className="font-serif italic text-cream/30 text-lg">
              No categories found in the archives.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
