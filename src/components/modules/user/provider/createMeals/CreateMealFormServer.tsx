import { publicService } from "@/services/publicServices/public.service";
import CreateMealFormClient from "./CreateMealFormClient";

export default async function CreateMealFormServer() {
  const { data: categories } = await publicService.getCategories();
  return <CreateMealFormClient categories={categories || []} />;
}
