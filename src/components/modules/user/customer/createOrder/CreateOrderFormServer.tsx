import { IMeal } from "@/types";
import { IProvider } from "@/types";
import CreateOrderFormClient from "./CreateOrderFormClient";

interface CreateOrderFormServerProps {
  providers: IProvider[];
  allMeals: IMeal[];
}

export default function CreateOrderFormServer({
  providers,
  allMeals,
}: CreateOrderFormServerProps) {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <div className="mb-10 border-l-2 border-caramel relative">
        <div className="overflow-hidden pl-4">
          <h1 className="text-2xl font-bold text-cream tracking-widest uppercase animate-in fade-in slide-in-from-left-8 duration-800 delay-500 ease-out fill-mode-both">
            Make An Order
          </h1>
          <p className="text-caramel/50 text-xs italic animate-in fade-in slide-in-from-left-4 duration-700 ease-out fill-mode-both">
            Premium delivery on the way. Verify your locations please.
          </p>
        </div>
      </div>

      {/* Passing the fetched data to the interactive client component */}
      <CreateOrderFormClient providers={providers} allMeals={allMeals} />
    </div>
  );
}
