import { env } from "@/env";
import { ServiceResponse, IUserSessionResponse } from "@/types";
import { cookies } from "next/headers";

const AUTH_URL = env.AUTH_URL;

export const userService = {
  // Existing Session Fetcher
  getSession: async function (): Promise<
    ServiceResponse<IUserSessionResponse>
  > {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${AUTH_URL}/get-session`, {
        headers: { cookie: cookieStore.toString() },
        cache: "no-store",
      });

      const session = await res.json();
      if (!session) throw new Error("Session is missing.");

      return { data: session, error: null };
    } catch (error) {
      return { data: null, error: { message: "Unauthorized" } };
    }
  },
};
