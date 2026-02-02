import { env } from "@/env";
import {
  ICreateOrderPayload,
  ICreateReviewPayload,
  IOrder,
  IReview,
  IUser,
  ServiceResponse,
} from "@/types";
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
      const res = await fetch(`${API_URL}/orders/my-orders`, {
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

  updateOrderStatus: async function (
    orderId: string,
    status: "CANCELLED",
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
      if (!res.ok) throw new Error(data.message || "Failed to update status");
      return { data: data.data, error: null };
    } catch (error) {
      return {
        data: null,
        error: {
          message:
            error instanceof Error
              ? error.message
              : "Error. Can't update order status",
        },
      };
    }
  },

  createReview: async function (
    reviewData: ICreateReviewPayload,
  ): Promise<ServiceResponse<IReview>> {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(reviewData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Review submission failed");
      return { data: data.data, error: null };
    } catch (error) {
      return {
        data: null,
        error: {
          message:
            error instanceof Error
              ? error.message
              : "Due to an unknown error, review cannot be created. Try again later",
        },
      };
    }
  },

  getMyReviews: async function (): Promise<ServiceResponse<IReview[]>> {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/reviews/my-reviews`, {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(),
        },
        next: { tags: ["reviews"] }, // Revalidates when a new review is created
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
              : "Review cannot be fetched. Try again later",
        },
      };
    }
  },

  deleteReview: async function (
    reviewId: string,
  ): Promise<ServiceResponse<null>> {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/reviews/${reviewId}`, {
        method: "DELETE",
        headers: { Cookie: cookieStore.toString() },
      });

      if (!res.ok) throw new Error("Could not erase review");
      return { data: null, error: null };
    } catch (error) {
      return {
        data: null,
        error: {
          message:
            error instanceof Error
              ? error.message
              : "An unknown error occurred. Cannot delete review",
        },
      };
    }
  },

  // NEW: Profile Fetcher
  getMyProfile: async function (): Promise<ServiceResponse<IUser>> {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/users/me`, {
        method: "GET",
        headers: { Cookie: cookieStore.toString() },
        next: { tags: ["user-profile"] },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch profile");

      return { data: data.data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Connection Error" } };
    }
  },

  // NEW: Profile Updater
  updateProfile: async function (
    payload: Partial<{ name: string; phone: string; image: string }>,
  ): Promise<ServiceResponse<IUser>> {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/users/update-me`, {
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
      return { data: null, error: { message: "Update failed" } };
    }
  },
};
