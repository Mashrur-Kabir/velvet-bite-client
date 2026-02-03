"use server";

import { providerService } from "@/services/providerServices/provider.service";
import {
  ICreateMealPayload,
  ICreateProviderPayload,
  IUpdateMealPayload,
} from "@/types";
import { revalidateTag } from "next/cache";

export const createProviderAction = async (data: ICreateProviderPayload) => {
  const res = await providerService.createProvider(data);
  if (res.data) revalidateTag("provider-profile", "max");
  return res;
};

export const getMyProviderAction = async () => {
  return await providerService.getMyProvider();
};

export const createMealAction = async (data: ICreateMealPayload) => {
  const res = await providerService.createMeal(data);
  if (res.data) revalidateTag("meals", "max");
  return res;
};

export const getMyMealsAction = async () => await providerService.getMyMeals();

export const updateMealAction = async (
  mealId: string,
  data: IUpdateMealPayload,
) => {
  const res = await providerService.updateMeal(mealId, data);
  if (res.data) {
    revalidateTag("provider-meals", "max"); // Updates the dashboard list
    revalidateTag("meals", "max"); // Updates the public menu
  }
  return res;
};

export const deleteMealAction = async (mealId: string) => {
  const res = await providerService.deleteMeal(mealId);
  if (res.data) {
    revalidateTag("provider-meals", "max");
    revalidateTag("meals", "max");
  }
  return res;
};

export const getProviderOrdersAction = async () =>
  await providerService.getProviderOrders();

export const getOrderByIdAction = async (id: string) =>
  await providerService.getOrderById(id);

export const updateOrderStatusAction = async (id: string, status: string) => {
  const res = await providerService.updateOrderStatus(id, status);
  if (res.data) {
    revalidateTag("provider-orders", "max");
    revalidateTag(`order-${id}`, "max");
    revalidateTag("orders", "max"); // Revalidate customer side as well
  }
  return res;
};

export const updateMyProviderAction = async (
  payload: Partial<ICreateProviderPayload>,
) => {
  const res = await providerService.updateMyProvider(payload);
  if (res.data) revalidateTag("provider-profile", "max");
  return res;
};
