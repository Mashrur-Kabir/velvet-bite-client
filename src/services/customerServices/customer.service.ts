import { env } from "@/env";
import { ICreateOrderPayload, IOrder, ServiceResponse } from "@/types";
import { cookies } from "next/headers";

const API_URL = env.BACKEND_URL;

export const customerService = {
  createOrder: async function (
    orderData: ICreateOrderPayload,
  ): Promise<ServiceResponse<IOrder>> {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to place order");

      return { data: data.data, error: null };
    } catch (error) {
      return {
        data: null,
        error: {
          message:
            error instanceof Error ? error.message : "Cannot create order",
        },
      };
    }
  },

  getMyOrders: async function (): Promise<ServiceResponse<IOrder[]>> {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/my-orders`, {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(),
        },
        next: { tags: ["orders"] }, // Revalidate using this tag
      });

      const data = await res.json();
      return { data: data.data || [], error: null };
    } catch (error) {
      return {
        data: null,
        error: {
          message:
            error instanceof Error
              ? error.message
              : "An unknown error occurred",
        },
      };
    }
  },
};
