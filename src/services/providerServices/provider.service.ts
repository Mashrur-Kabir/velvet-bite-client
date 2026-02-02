import { env } from "@/env";
import {
  ICreateMealPayload,
  ICreateProviderPayload,
  IMeal,
  IOrder,
  IProvider,
  IUpdateMealPayload,
  ServiceResponse,
} from "@/types";
import { cookies } from "next/headers";

const API_URL = env.BACKEND_URL;

export const providerService = {
  createProvider: async function (
    payload: ICreateProviderPayload,
  ): Promise<ServiceResponse<IProvider>> {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/providers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create profile");
      return { data: data.data, error: null };
    } catch (error) {
      return {
        data: null,
        error: {
          message:
            error instanceof Error
              ? error.message
              : "Provider can't be created due to an error",
        },
      };
    }
  },

  getMyProvider: async function (): Promise<ServiceResponse<IProvider>> {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/providers/me`, {
        method: "GET",
        headers: { Cookie: cookieStore.toString() },
        next: { tags: ["provider-profile"] },
      });

      const data = await res.json();
      // If no profile exists, the backend might return 404 or null.
      // We handle that gracefully in the action/page.
      return { data: data.data || null, error: null };
    } catch (error) {
      return {
        data: null,
        error: {
          message:
            error instanceof Error
              ? error.message
              : "Due to an unknown error, Provider can't be fetched. Try again later",
        },
      };
    }
  },

  createMeal: async function (
    payload: ICreateMealPayload,
  ): Promise<ServiceResponse<IMeal>> {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/meals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Meal creation failed");
      return { data: data.data, error: null };
    } catch (error) {
      return {
        data: null,
        error: {
          message:
            error instanceof Error
              ? error.message
              : "An error occurred. Cannot create meal.",
        },
      };
    }
  },

  getMyMeals: async function (): Promise<ServiceResponse<IMeal[]>> {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/meals/my-meals`, {
        method: "GET",
        headers: { Cookie: cookieStore.toString() },
        next: { tags: ["provider-meals"] }, // Granular tag for provider's own list
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
              : "An error occurred. Cannot get meals.",
        },
      };
    }
  },

  updateMeal: async function (
    mealId: string,
    payload: IUpdateMealPayload,
  ): Promise<ServiceResponse<IMeal>> {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/meals/${mealId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");
      return { data: data.data, error: null };
    } catch (error) {
      return {
        data: null,
        error: {
          message:
            error instanceof Error
              ? error.message
              : "Due to an unexpected error. Meal cannot be updated.",
        },
      };
    }
  },

  deleteMeal: async function (mealId: string): Promise<ServiceResponse<IMeal>> {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/meals/${mealId}`, {
        method: "DELETE",
        headers: { Cookie: cookieStore.toString() },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Deletion failed");
      return { data: data.data, error: null };
    } catch (error) {
      return {
        data: null,
        error: {
          message:
            error instanceof Error
              ? error.message
              : "An error occurred. Request cannot be processed",
        },
      };
    }
  },

  getProviderOrders: async function (): Promise<ServiceResponse<IOrder[]>> {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/orders/provider-orders`, {
        method: "GET",
        headers: { Cookie: cookieStore.toString() },
        next: { tags: ["provider-orders"] },
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
              : "Sorry, could not fetch orders due to an unknown error",
        },
      };
    }
  },

  getOrderById: async function (
    orderId: string,
  ): Promise<ServiceResponse<IOrder>> {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/orders/${orderId}`, {
        method: "GET",
        headers: { Cookie: cookieStore.toString() },
        next: { tags: [`order-${orderId}`] },
      });
      const data = await res.json();
      return { data: data.data, error: null };
    } catch (error) {
      return {
        data: null,
        error: {
          message:
            error instanceof Error
              ? error.message
              : "An error occurred. Request cannot be processed",
        },
      };
    }
  },

  updateOrderStatus: async function (
    orderId: string,
    status: string,
  ): Promise<ServiceResponse<IOrder>> {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/orders/${orderId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Status update failed");
      return { data: data.data, error: null };
    } catch (error) {
      return {
        data: null,
        error: {
          message:
            error instanceof Error
              ? error.message
              : "An unknown error occurred. Try updating order status later",
        },
      };
    }
  },
};
