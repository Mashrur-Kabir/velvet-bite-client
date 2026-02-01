"use server";

import { customerService } from "@/services/customerServices/customer.service";
import { ICreateOrderPayload, IOrder, ServiceResponse } from "@/types";
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
