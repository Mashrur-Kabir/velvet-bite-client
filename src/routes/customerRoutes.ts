import { RouteGroup } from "@/types";
import { LayoutDashboard, ShoppingBag, History, User } from "lucide-react";

export const customerRoutes: RouteGroup[] = [
  {
    title: "Customer Portal",
    items: [
      { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
      { title: "My Orders", url: "/dashboard/orders", icon: ShoppingBag },
      { title: "Order History", url: "/dashboard/history", icon: History },
      { title: "Profile Settings", url: "/dashboard/profile", icon: User },
    ],
  },
];
