import { env } from "@/env";
import {
  IMeal,
  IMealFilter,
  IMealResponse,
  IProvider,
  IProviderResponse,
  ServiceOptions,
} from "@/types"; // Your global type
import { ICategoryResponse } from "@/types/moduleTypes/category.type";

const API_URL = env.BACKEND_URL;

export const publicService = {
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

  /**
   * Fetch all active providers
   */
  getProviders: async function (options?: ServiceOptions) {
    try {
      const res = await fetch(`${API_URL}/providers`, {
        cache: options?.cache || "force-cache",
        next: {
          revalidate: options?.revalidate || 10,
          tags: ["providers"],
        },
      });

      const data: IProviderResponse = await res.json();

      if (data.success) {
        return { data: data.data, error: null };
      }
      return { data: null, error: data.message };
    } catch (error) {
      return { data: null, error: "Failed to fetch kitchen providers" };
    }
  },

  /**
   * Fetch a single provider by ID
   */

  getProviderById: async function (id: string, options?: ServiceOptions) {
    try {
      const res = await fetch(`${API_URL}/providers/${id}`, {
        cache: options?.cache || "no-store",
        next: { tags: ["provider", id] },
      });

      const data = await res.json();

      if (data.success) {
        return { data: data.data as IProvider, error: null };
      }
      return { data: null, error: data.message };
    } catch (error) {
      return { data: null, error: "Failed to fetch provider details" };
    }
  },

  /**
   * Fetch all active food categories
   */
  getCategories: async function (options?: ServiceOptions) {
    try {
      const res = await fetch(`${API_URL}/categories`, {
        cache: options?.cache || "force-cache",
        next: {
          revalidate: options?.revalidate || 3600, // Static-first approach
          tags: ["categories"],
        },
      });

      const data: ICategoryResponse = await res.json();

      if (data.success) {
        return { data: data.data, error: null };
      }
      return { data: null, error: data.message };
    } catch (error) {
      return { data: null, error: "Failed to fetch categories" };
    }
  },
};
