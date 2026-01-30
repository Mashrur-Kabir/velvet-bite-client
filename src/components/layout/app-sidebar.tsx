"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { adminRoutes } from "@/routes/adminRoutes";
import { providerRoutes } from "@/routes/providerRoutes";
import { customerRoutes } from "@/routes/customerRoutes";
import { RouteGroup } from "@/types";
import { Roles } from "@/constants/userRoles";
import { cn } from "@/lib/utils";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: {
    role: string | undefined;
  };
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  const pathname = usePathname();

  // Route Selection Logic
  const routes: RouteGroup[] = React.useMemo(() => {
    switch (user.role) {
      case Roles.admin:
        return adminRoutes;
      case Roles.provider:
        return providerRoutes;
      case Roles.customer:
        return customerRoutes;
      default:
        return [];
    }
  }, [user.role]);

  return (
    <Sidebar
      className="border-r border-caramel/20 bg-card/50 backdrop-blur-xl"
      {...props}
    >
      <SidebarContent className="p-2">
        <AnimatePresence mode="wait">
          {routes.map((group, groupIdx) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: groupIdx * 0.1 }}
            >
              <SidebarGroup>
                <SidebarGroupLabel className="text-brownie/50 dark:text-cream/50 font-serif uppercase tracking-widest text-[10px]">
                  {group.title}
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = pathname === item.url;

                      return (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton
                            asChild
                            isActive={isActive}
                            className={cn(
                              "group transition-all duration-300 rounded-xl h-11",
                              isActive
                                ? "bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]"
                                : "hover:bg-primary/10 text-brownie dark:text-cream hover:scale-[1.01]",
                            )}
                          >
                            <Link
                              href={item.url}
                              className="flex items-center gap-3"
                            >
                              {Icon && (
                                <Icon
                                  className={cn(
                                    "size-5 transition-colors",
                                    isActive
                                      ? "text-white"
                                      : "text-primary group-hover:text-caramel",
                                  )}
                                />
                              )}
                              <span className="font-medium">{item.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </motion.div>
          ))}
        </AnimatePresence>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
