import { customerService } from "@/services/customerServices/customer.service";
import Image from "next/image";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function MealDetailsPage({ params }: Props) {
  const { id } = await params;
  const { data: meal, error } = await customerService.getMealById(id);

  if (error || !meal) {
    return notFound();
  }

  return (
    <div className="container mx-auto p-6 flex flex-col md:flex-row gap-10">
      <div className="relative h-[400px] w-full md:w-1/2 rounded-3xl overflow-hidden shadow-xl">
        <Image
          src={meal.imageUrl}
          alt={meal.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1 space-y-6">
        <div className="space-y-2">
          <span className="text-caramel font-bold uppercase tracking-widest text-sm">
            {meal.category.name}
          </span>
          <h1 className="text-5xl font-serif font-bold text-brownie">
            {meal.name}
          </h1>
          <p className="text-lg text-muted-foreground">{meal.description}</p>
        </div>

        <div className="flex items-center gap-4 text-2xl font-bold text-amber-800">
          ${meal.price}
        </div>

        <div className="p-4 border border-caramel/10 rounded-2xl bg-muted/30">
          <p className="text-sm text-muted-foreground">Kitchen / Provider</p>
          <p className="font-bold text-brownie">{meal.provider.name}</p>
        </div>

        <button className="w-full bg-primary py-4 rounded-full font-bold text-white shadow-lg hover:bg-amber-700 transition-colors">
          Order Now
        </button>
      </div>
    </div>
  );
}
