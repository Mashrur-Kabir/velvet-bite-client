"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { adminRoutes } from "@/routes/adminRoutes";
import { providerRoutes } from "@/routes/providerRoutes";
import { customerRoutes } from "@/routes/customerRoutes";
import { Roles } from "@/constants/userRoles";
import { cn } from "@/lib/utils";

interface AppSidebarProps {
  user: {
    role: string | undefined;
  };
}

export function AppSidebar({ user }: AppSidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const routes = React.useMemo(() => {
    if (!user.role) return [];
    const mapping = {
      [Roles.admin]: adminRoutes,
      [Roles.provider]: providerRoutes,
      [Roles.customer]: customerRoutes,
    };
    return mapping[user.role as keyof typeof mapping] || [];
  }, [user.role]);

  return (
    <motion.aside
      animate={{ width: isCollapsed ? "5.5rem" : "18rem" }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="fixed left-0 top-0 z-40 h-screen border-r border-caramel/10 bg-[#2D1B16] font-sans text-cream overflow-visible shadow-2xl"
    >
      {/* Glow Filter Logic */}
      <svg width="0" height="0" className="absolute">
        <filter id="velvet-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </svg>

      {/* --- PREMIUM TOGGLE BUTTON --- */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={cn(
          "absolute -right-4 top-12 z-50 flex size-8 items-center justify-center rounded-full border border-caramel/20",
          "bg-caramel text-brownie shadow-[0_0_15px_rgba(192,133,82,0.4)]",
          "transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(192,133,82,0.6)] active:scale-95",
        )}
      >
        <motion.div
          animate={{ rotate: isCollapsed ? 180 : 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-center"
        >
          <ChevronLeft size={18} strokeWidth={2.5} />
        </motion.div>
      </button>

      <div className="flex h-full flex-col p-4 overflow-x-hidden scrollbar-hide">
        {/* Header Area */}
        <div className="mb-12 px-2 pt-4">
          <Link href="/" className="flex items-center gap-4">
            <div className="size-10 min-w-10 rounded-xl bg-caramel shadow-lg shadow-caramel/20 flex items-center justify-center font-serif text-brownie text-xl font-bold">
              V
            </div>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="font-serif text-xl font-bold tracking-tight text-cream whitespace-nowrap"
              >
                Velvet Kitchen
              </motion.span>
            )}
          </Link>
        </div>

        {/* Dynamic Navigation */}
        <nav className="flex-1 space-y-8">
          {routes.map((group, groupIdx) => (
            <div key={group.title} className="space-y-4">
              {!isCollapsed && (
                <motion.h3
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="px-4 text-[10px] font-serif uppercase tracking-[0.25em] text-caramel/40 whitespace-nowrap"
                >
                  {group.title}
                </motion.h3>
              )}
              <div className="space-y-2">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.url;

                  return (
                    <Link
                      key={item.title}
                      href={item.url}
                      className={cn(
                        "group relative flex h-12 items-center gap-4 rounded-2xl px-4 transition-all duration-500",
                        isActive
                          ? "bg-gradient-to-r from-primary to-amber-900 text-white shadow-xl shadow-black/20"
                          : "text-cream/60 hover:bg-caramel/5 hover:text-white",
                      )}
                    >
                      <div className="relative z-10 flex min-w-5 items-center justify-center">
                        {Icon && (
                          <Icon
                            className={cn(
                              "size-5 transition-all duration-700 ease-in-out",
                              "group-hover:scale-125 group-hover:text-caramel group-hover:[filter:url(#velvet-glow)]",
                              isActive ? "text-white" : "text-caramel/60",
                            )}
                          />
                        )}
                      </div>

                      {!isCollapsed && (
                        <motion.span
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className={cn(
                            "text-sm font-medium tracking-wide whitespace-nowrap",
                            isActive ? "text-white" : "group-hover:text-cream",
                          )}
                        >
                          {item.title}
                        </motion.span>
                      )}

                      {isActive && (
                        <motion.div
                          layoutId="active-pill"
                          className="absolute left-0 h-8 w-1 rounded-r-full bg-caramel shadow-[0_0_12px_rgba(192,133,82,1)]"
                        />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Status Indicator */}
        <div className="mt-auto border-t border-caramel/5 pt-8 pb-4 px-2">
          <div className="flex items-center gap-3">
            <div className="size-2.5 min-w-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[10px] uppercase tracking-widest text-caramel/40 font-serif whitespace-nowrap"
              >
                Kitchen Connected
              </motion.span>
            )}
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
