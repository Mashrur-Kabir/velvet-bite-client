import { RouteGroup } from "@/types";
import { ShieldCheck, Users, PieChart, Layers } from "lucide-react";

export const adminRoutes: RouteGroup[] = [
  {
    title: "Imperial Admin",
    items: [
      { title: "Overview", url: "/admin-dashboard", icon: ShieldCheck },
      {
        title: "Manage Users",
        url: "/admin-dashboard/manage-users",
        icon: Users,
      },
      {
        title: "All Orders",
        url: "/admin-dashboard/all-orders",
        icon: PieChart,
      },
      { title: "Categories", url: "/admin-dashboard/categories", icon: Layers },
    ],
  },
];
