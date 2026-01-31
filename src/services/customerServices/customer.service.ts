import { env } from "@/env";
import { ServiceOptions } from "@/types"; // Your global type
import { IMeal, IMealFilter, IMealResponse } from "@/types/meal.type";

const API_URL = env.BACKEND_URL;

export const customerService = {
  /**
   * Fetch all meals with optional filtering and pagination
   */
  getMeals: async function (params?: IMealFilter, options?: ServiceOptions) {
    try {
      const url = new URL(`${API_URL}/meals`);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value.toString());
          }
        });
      }

      const config: RequestInit = {
        cache: options?.cache || "force-cache", // Default to SSG
        next: {
          revalidate: options?.revalidate,
          tags: ["meals"],
        },
      };

      const res = await fetch(url.toString(), config);
      const data: IMealResponse = await res.json();

      if (data.success) {
        return { data: data.data, meta: data.meta, error: null };
      }

      return { data: null, error: data.message };
    } catch (error) {
      return { data: null, error: "Failed to fetch meals" };
    }
  },

  /**
   * Fetch a single meal by its ID
   */
  getMealById: async function (id: string, options?: ServiceOptions) {
    try {
      const res = await fetch(`${API_URL}/meals/${id}`, {
        cache: options?.cache || "no-store", // Default to dynamic for single items
        next: { tags: ["meal", id] },
      });

      const data = await res.json();

      if (data.success) {
        return { data: data.data as IMeal, error: null };
      }
      return { data: null, error: data.message };
    } catch (error) {
      return { data: null, error: "Failed to fetch meal details" };
    }
  },
};
