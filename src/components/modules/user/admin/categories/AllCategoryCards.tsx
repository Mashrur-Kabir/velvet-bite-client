"use client";

import { ICategory } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { Tag, Edit2, Check, X, Calendar } from "lucide-react";
import { useState } from "react";
import { updateCategoryAction } from "@/actions/admin.action";
import { toast } from "sonner";
import { format } from "date-fns";

export default function AllCategoryCards({
  category,
}: {
  category: ICategory;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(category.name);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async () => {
    if (newName === category.name) return setIsEditing(false);

    setIsUpdating(true);
    const res = await updateCategoryAction(category.id, newName);
    // Shared typography and visual base
    const fontStyle = {
      fontFamily: "var(--font-serif)",
      letterSpacing: "-0.02em",
    };

    const toastBaseStyle = {
      background: "oklch(0.45 0.08 55)", // Shiny light chocolate roast
      color: "oklch(0.92 0.03 65)", // Cream text
      border: "1px solid oklch(0.35 0.03 45)",
      padding: "16px",
      ...fontStyle,
    };

    if (res.data) {
      toast.success("Category updated in archives", {
        style: toastBaseStyle,
      });
      setIsEditing(false);
    } else {
      toast.error(res.error?.message || "Update failed", {
        style: {
          ...toastBaseStyle,
          border: "1px solid rgba(224, 62, 62, 0.3)", // Subtle red warning border
        },
      });
    }
    setIsUpdating(false);
  };

  return (
    <motion.div
      layout
      whileHover={{ y: -5 }}
      className="bg-card/40 backdrop-blur-md border border-border/40 rounded-[2rem] p-8 group transition-all duration-500 hover:border-primary/40 relative overflow-hidden"
    >
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        <div className="flex items-center gap-6 flex-1">
          <div className="size-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-lg shadow-primary/5 group-hover:rotate-12 transition-transform duration-500">
            <Tag size={20} />
          </div>

          <div className="space-y-1 flex-1">
            <AnimatePresence mode="wait">
              {isEditing ? (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="flex items-center gap-2"
                >
                  <input
                    autoFocus
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    disabled={isUpdating}
                    className="bg-background/50 border-b-2 border-primary outline-none px-2 py-1 text-2xl font-serif font-bold text-cream w-full max-w-xs"
                  />
                </motion.div>
              ) : (
                <motion.h3
                  key="name"
                  className="text-2xl font-serif font-bold text-cream group-hover:text-primary transition-colors"
                >
                  {category.name}
                </motion.h3>
              )}
            </AnimatePresence>
            <p className="text-[10px] text-cream/30 uppercase font-bold tracking-widest flex items-center gap-2">
              <Calendar size={12} /> Registered:{" "}
              {format(new Date(category.createdAt), "MMM d, yyyy")}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          {isEditing ? (
            <>
              <button
                onClick={handleUpdate}
                disabled={isUpdating}
                className="size-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all"
              >
                <Check size={18} />
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="size-12 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all"
              >
                <X size={18} />
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 h-12 rounded-xl bg-background/50 border border-border/20 text-[10px] text-cream/40 uppercase font-bold tracking-widest flex items-center gap-3 hover:border-primary/40 hover:text-primary transition-all"
            >
              <Edit2 size={14} /> Rename
            </button>
          )}
        </div>
      </div>

      {/* Ambient background accent */}
      <div className="absolute -right-4 -bottom-4 size-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
    </motion.div>
  );
}
