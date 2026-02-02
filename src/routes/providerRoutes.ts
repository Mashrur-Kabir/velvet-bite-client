import { RouteGroup } from "@/types";
import {
  LayoutDashboard,
  Utensils,
  ClipboardList,
  Settings,
  Menu,
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
      {
        title: "Create Menu",
        url: "/provider-dashboard/create-menu",
        icon: Utensils,
      },
      {
        title: "My Menu",
        url: "/provider-dashboard/my-menu",
        icon: Menu,
      },
      {
        title: "My Orders",
        url: "/provider-dashboard/my-orders",
        icon: ClipboardList,
      },
      {
        title: "Profile",
        url: "/provider-dashboard/profile",
        icon: Settings,
      },
    ],
  },
];
