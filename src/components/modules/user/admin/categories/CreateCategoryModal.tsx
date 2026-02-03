"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Tag, Loader2 } from "lucide-react";
import { createCategoryAction } from "@/actions/admin.action";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CreateCategoryModal() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [isPending, setIsPending] = useState(false);

  // Shared Toast Style
  const toastStyle = {
    background: "oklch(0.45 0.08 55)", // Shiny light chocolate roast
    color: "oklch(0.92 0.03 65)", // Cream text
    border: "1px solid oklch(0.35 0.03 45)",
    fontFamily: "var(--font-serif)",
    padding: "16px",
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim())
      return toast.error("Category identity required", { style: toastStyle });

    setIsPending(true);
    const res = await createCategoryAction(name);

    if (res.data) {
      toast.success(`${name} added to the category lists`, {
        style: toastStyle,
      });
      setName("");
      setOpen(false);
    } else {
      toast.error(res.error?.message || "Category failed to be added", {
        style: toastStyle,
      });
    }
    setIsPending(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-3 px-8 h-14 rounded-full bg-primary text-primary-foreground hover:text-cream font-bold hover:bg-accent transition-all uppercase tracking-widest text-xs shadow-xl shadow-primary/10 group">
          <Plus
            size={20}
            className="group-hover:rotate-90 transition-transform duration-500"
          />
          New Category
        </button>
      </DialogTrigger>

      <DialogContent className="bg-card/90 backdrop-blur-2xl border-border/40 rounded-[2.5rem] max-w-md p-0 overflow-hidden shadow-premium-dark">
        <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-primary to-transparent" />

        <div className="p-10 space-y-8">
          <DialogHeader>
            <DialogTitle className="text-3xl font-serif font-bold text-cream flex items-center gap-4 leading-none">
              <motion.div
                initial={{ scale: 0.8, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                className="size-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary"
              >
                <Tag size={20} />
              </motion.div>
              {/* Removed extra space between tags to fix title gap */}
              <span className="text-primary italic ml-2">Create category</span>
            </DialogTitle>
          </DialogHeader>

          <AnimatePresence>
            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Increased space-y to create vertical gap between label and input */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-4"
              >
                <label className="text-[10px] uppercase font-bold tracking-[0.3em] text-cream/40 ml-1 block">
                  Category Identity
                </label>
                <Input
                  placeholder="e.g. Seafood, Artisan Pastas..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-14 bg-background/50 border-border/40 rounded-2xl text-cream placeholder:text-cream/10 focus:border-primary/50 transition-all px-6"
                  autoFocus
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex gap-4 pt-2"
              >
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setOpen(false)}
                  className="flex-1 h-14 rounded-2xl border-2 border-accent text-cream/40 hover:text-cream transition-colors uppercase tracking-widest text-[10px] font-bold"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="flex-[2] h-14 rounded-2xl hover:text-white bg-primary text-primary-foreground font-bold uppercase tracking-[0.2em] text-[10px] shadow-lg shadow-primary/10 group overflow-hidden relative"
                >
                  {isPending ? (
                    <Loader2 className="animate-spin size-5" />
                  ) : (
                    <span className="relative z-10">Create Category</span>
                  )}
                  <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </Button>
              </motion.div>
            </form>
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
