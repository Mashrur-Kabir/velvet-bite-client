import { env } from "@/env";
import {
  IUser,
  IAdminUpdatePayload,
  ServiceResponse,
  IReviewVisibilityPayload,
  IReview,
  IOrder,
  ICategoryUpdatePayload,
  ICategory,
} from "@/types";
import { cookies } from "next/headers";

const API_URL = env.BACKEND_URL;

export const adminService = {
  // 1. Get Admin's Own Profile
  getMyProfile: async function (): Promise<ServiceResponse<IUser>> {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/users/me`, {
        method: "GET",
        headers: { Cookie: cookieStore.toString() },
        next: { tags: ["admin-profile"] },
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
              : "Due to an unknown error, You're profile can't be fetched",
        },
      };
    }
  },

  // 2. Get All Registered Users (Platform Stats)
  getAllUsers: async function (): Promise<ServiceResponse<IUser[]>> {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/users`, {
        method: "GET",
        headers: { Cookie: cookieStore.toString() },
        next: { tags: ["platform-users"] },
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
              : "An error occurred, try again later",
        },
      };
    }
  },

  // 3. Update Admin Profile
  updateProfile: async function (
    payload: IAdminUpdatePayload,
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
      return {
        data: null,
        error: {
          message:
            error instanceof Error
              ? error.message
              : "Oops! due to an error, you're profile can't be updated",
        },
      };
    }
  },

  // 4. Get all platform reviews for moderation
  getAllReviews: async function (): Promise<ServiceResponse<IReview[]>> {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/reviews`, {
        method: "GET",
        headers: { Cookie: cookieStore.toString() },
        next: { tags: ["platform-reviews"] },
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
              : "Due to an error, reviews cannot be loaded",
        },
      };
    }
  },

  // 5. Toggle Review Visibility
  toggleReviewVisibility: async function (
    reviewId: string,
    payload: IReviewVisibilityPayload,
  ): Promise<ServiceResponse<IReview>> {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/reviews/${reviewId}/visibility`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Visibility toggle failed");
      return { data: data.data, error: null };
    } catch (error) {
      return {
        data: null,
        error: {
          message:
            error instanceof Error
              ? error.message
              : "Oops! this action can't be performed",
        },
      };
    }
  },

  // 6. Delete Review
  deleteReview: async function (
    reviewId: string,
  ): Promise<ServiceResponse<null>> {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/reviews/${reviewId}`, {
        method: "DELETE",
        headers: { Cookie: cookieStore.toString() },
      });
      if (!res.ok) throw new Error("Failed to delete review");
      return { data: null, error: null };
    } catch (error) {
      return {
        data: null,
        error: {
          message:
            error instanceof Error
              ? error.message
              : "An error occurred. The review cannot be deleted",
        },
      };
    }
  },

  // 7. Get All Platform Orders
  getAllOrders: async function (): Promise<ServiceResponse<IOrder[]>> {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/orders`, {
        method: "GET",
        headers: { Cookie: cookieStore.toString() },
        next: { tags: ["platform-orders"] },
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
              : "An error occurred. Orders cannot be deleted",
        },
      };
    }
  },

  // 8. Get Single Order Details (Shared Service)
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
              : "Due to an error, the details can't be displayed",
        },
      };
    }
  },

  // 9. Create New Culinary Category
  createCategory: async function (payload: {
    name: string;
  }): Promise<ServiceResponse<ICategory>> {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok)
        throw new Error(data.message || "Failed to establish category");
      return { data: data.data, error: null };
    } catch (error) {
      return {
        data: null,
        error: {
          message:
            error instanceof Error
              ? error.message
              : "Cannot create categories due to an unknown error. Please try again later",
        },
      };
    }
  },

  // 10. Update Culinary Category
  updateCategory: async function (
    categoryId: string,
    payload: ICategoryUpdatePayload,
  ): Promise<ServiceResponse<ICategory>> {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/categories/${categoryId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Taxonomy update failed");
      return { data: data.data, error: null };
    } catch (error) {
      return {
        data: null,
        error: {
          message:
            error instanceof Error
              ? error.message
              : "Oops! an error occurred. Try updating categories later",
        },
      };
    }
  },
};
