import { RouteGroup } from "@/types";

export const userRoutes: RouteGroup[] = [
  {
    title: "Blog Management",
    items: [
      {
        title: "user dashboard",
        url: "/dashboard",
      },
      {
        title: "create blogs",
        url: "/dashboard/create-blogs",
      },
      {
        title: "history",
        url: "/dashboard/history",
      },
    ],
  },
];
