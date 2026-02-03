import { env } from "@/env";
import { IUser, IAdminUpdatePayload, ServiceResponse } from "@/types";
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
};
