import { RouteGroup } from "@/types";
import {
  LayoutDashboard,
  Utensils,
  ClipboardList,
  Settings,
} from "lucide-react";

export const providerRoutes: RouteGroup[] = [
  {
    title: "Kitchen Management",
    items: [
      {
        title: "Provider Dashboard",
        url: "/provider-dashboard",
        icon: LayoutDashboard,
      },
      { title: "Manage Menu", url: "/provider-dashboard/menu", icon: Utensils },
      {
        title: "Incoming Orders",
        url: "/provider-dashboard/orders",
        icon: ClipboardList,
      },
      {
        title: "Store Settings",
        url: "/provider-dashboard/settings",
        icon: Settings,
      },
    ],
  },
];
