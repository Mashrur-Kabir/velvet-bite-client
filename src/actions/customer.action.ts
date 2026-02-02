"use server";

import { customerService } from "@/services/customerServices/customer.service";
import {
  ICreateOrderPayload,
  ICreateReviewPayload,
  IOrder,
  IReview,
  ServiceResponse,
} from "@/types";
import { revalidateTag } from "next/cache";

export const createOrderAction = async (
  data: ICreateOrderPayload,
): Promise<ServiceResponse<IOrder>> => {
  const res = await customerService.createOrder(data);
  if (res.data) {
    revalidateTag("orders", "max");
  }
  return res;
};

export const getMyOrdersAction = async () => {
  return await customerService.getMyOrders();
};

export const cancelOrderAction = async (orderId: string) => {
  const res = await customerService.updateOrderStatus(orderId, "CANCELLED");
  if (res.data) revalidateTag("orders", "max");
  return res;
};

export const createReviewAction = async (
  data: ICreateReviewPayload,
): Promise<ServiceResponse<IReview>> => {
  const res = await customerService.createReview(data);
  if (res.data) revalidateTag("reviews", "max");
  return res;
};

export const deleteReviewAction = async (reviewId: string) => {
  const res = await customerService.deleteReview(reviewId);
  if (!res.error) revalidateTag("reviews", "max");
  return res;
};
