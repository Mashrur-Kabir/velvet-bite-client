import { LucideIcon } from "lucide-react";

// Define a proper interface for your route structure
export interface RouteItem {
  title: string;
  url: string;
  icon?: LucideIcon;
}

export interface RouteGroup {
  title: string;
  items: RouteItem[];
}
