import { env } from "@/env";
import { ICreateProviderPayload, IProvider, ServiceResponse } from "@/types";
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
};
