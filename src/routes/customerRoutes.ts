import { RouteGroup } from "@/types";
import { LayoutDashboard, ShoppingBag, ListOrdered, User } from "lucide-react";

export const customerRoutes: RouteGroup[] = [
  {
    title: "Customer Portal",
    items: [
      { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
      {
        title: "Create Order",
        url: "/dashboard/create-orders",
        icon: ListOrdered,
      },
      { title: "My Orders", url: "/dashboard/my-orders", icon: ShoppingBag },
      { title: "Profile Settings", url: "/dashboard/profile", icon: User },
    ],
  },
];
