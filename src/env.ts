import { createEnv } from "@t3-oss/env-nextjs";

import * as z from "zod";

export const env = createEnv({
  // 1. SERVER BLOCK: Private variables
  // These are ONLY accessible on the Next.js server.
  // If you try to use these in a "use client" component, the app will throw an error.
  server: {
    BACKEND_URL: z.url(), // Validates that the string is a real URL
    FRONTEND_URL: z.url(),
    AUTH_URL: z.url(),
  },

  // 2. CLIENT BLOCK: Public variables
  // These MUST start with NEXT_PUBLIC_.
  // They are safe to be bundled and sent to the browser.
  client: {
    NEXT_PUBLIC_TEST: z.string().min(1), // Validates it's a string and not empty
    NEXT_PUBLIC_BACKEND_URL: z.url(),
  },

  // 3. RUNTIME ENV: The Mapping
  // You must manually map process.env values here.
  // This tells the library where to find the raw values to validate.
  runtimeEnv: {
    BACKEND_URL: process.env.BACKEND_URL,
    FRONTEND_URL: process.env.FRONTEND_URL,
    AUTH_URL: process.env.AUTH_URL,
    NEXT_PUBLIC_TEST: process.env.NEXT_PUBLIC_TEST,
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
  },
});
