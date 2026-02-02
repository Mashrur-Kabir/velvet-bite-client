import { Clock, Timer } from "lucide-react";
import { IProvider } from "@/types";

/**
 * Determines if an order is "Recent" (within 24 hours) or "Legacy"
 * and returns the appropriate premium badge.
 */
export const getTimeBadge = (createdAt: string) => {
  const orderDate = new Date(createdAt).getTime();
  const now = new Date().getTime();
  const diffInHours = (now - orderDate) / (1000 * 60 * 60);

  if (diffInHours < 24) {
    return (
      <div className="flex items-center gap-3 bg-emerald-600/10 border border-emerald-600/20 px-5 py-2.5 rounded-2xl">
        <Clock className="size-4 text-emerald-600" />
        <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400">
          Recent
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 bg-rose-600/10 border border-rose-600/20 px-5 py-2.5 rounded-2xl">
      <Timer className="size-4 text-rose-600" />
      <span className="text-sm font-bold text-rose-700 dark:text-rose-400">
        Due!
      </span>
    </div>
  );
};

/**
 * Matches a Provider ID against a list of providers to return the display name.
 */
export const getProviderName = (providerId: string, providers: IProvider[]) => {
  if (!providers || providers.length === 0) return "Velvet Kitchen";
  const provider = providers.find((p) => p.id === providerId);
  return provider ? provider.name : "Velvet Kitchen";
};
