import UpdateMenuFormServer from "@/components/modules/user/provider/updateMenu/UpdateMenuFormServer";

export default async function UpdateMenuPage({
  searchParams,
}: {
  searchParams: Promise<{ mealId: string }>;
}) {
  const { mealId } = await searchParams;

  return (
    <div className="max-w-4xl mx-auto py-16 space-y-12">
      <header className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-cream tracking-tight">
          Refine <span className="text-primary italic">Recipe</span>
        </h1>
        <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold opacity-60">
          Update your cuisine here.
        </p>
      </header>
      <UpdateMenuFormServer mealId={mealId} />
    </div>
  );
}
