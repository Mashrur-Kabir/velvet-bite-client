import { createEnv } from "@t3-oss/env-nextjs";

import * as z from "zod";

export const env = createEnv({
  // 1. SERVER BLOCK: Private variables
  // These are ONLY accessible on the Next.js server.
  // If you try to use these in a "use client" component, the app will throw an error.
  server: {
    BACKEND_URL: z.url(), // Validates that the string is a real URL
    AUTH_URL: z.url(),
  },

  // 2. CLIENT BLOCK: Public variables
  // These MUST start with NEXT_PUBLIC_.
  // They are safe to be bundled and sent to the browser.
  client: {
    NEXT_PUBLIC_AUTH_URL: z.url(), // Validates it's a string and not empty
    NEXT_PUBLIC_FRONTEND_URL: z.url(),
  },

  // 3. RUNTIME ENV: The Mapping
  // You must manually map process.env values here.
  // This tells the library where to find the raw values to validate.
  runtimeEnv: {
    BACKEND_URL: process.env.BACKEND_URL,
    AUTH_URL: process.env.AUTH_URL,
    NEXT_PUBLIC_AUTH_URL: process.env.NEXT_PUBLIC_AUTH_URL,
    NEXT_PUBLIC_FRONTEND_URL: process.env.NEXT_PUBLIC_FRONTEND_URL,
  },
});
