import CreateMealFormServer from "@/components/modules/user/provider/createMeals/CreateMealFormServer";

export default function CreateMenuPage() {
  return (
    <div className="max-w-4xl mx-auto pb-20 pt-5 space-y-12">
      <header className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-cream tracking-tight">
          Create New <span className="text-primary italic">Delicacies</span>
        </h1>
        <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold opacity-60">
          Add your latest culinary to the public menu.
        </p>
      </header>
      <CreateMealFormServer />
    </div>
  );
}
