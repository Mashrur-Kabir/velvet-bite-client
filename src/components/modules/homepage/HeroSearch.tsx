"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HeroSearch() {
  const [term, setTerm] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Use URLSearchParams for robust query string building
    const params = new URLSearchParams();
    if (term.trim()) {
      params.set("searchTerm", term.trim());
      router.push(`/meals?${params.toString()}`);
    } else {
      router.push("/meals");
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className={cn(
        "mx-auto flex w-full max-w-2xl items-center gap-2 rounded-full bg-white/10 p-2 backdrop-blur-xl border border-white/20 shadow-2xl",
        "focus-within:border-primary/50 transition-all duration-500",
        "h-[72px] transform-gpu",
      )}
    >
      <div className="flex flex-1 items-center px-4">
        <Search className="mr-2 size-5 text-[#F3E9DC]/60 shrink-0" />
        <Input
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          autoComplete="off"
          placeholder="Search for meals or restaurants..."
          className="border-none bg-transparent text-[#F3E9DC] placeholder:text-[#F3E9DC]/60 focus-visible:ring-0 text-lg h-full"
        />
      </div>

      <Button
        type="submit"
        className={cn(
          "relative h-12 px-10 font-bold uppercase tracking-[0.2em] text-[12px] rounded-full transition-all duration-500",
          "bg-primary text-white border border-transparent shadow-[0_0_15px_rgba(192,133,82,0.4)]",
          "hover:shadow-[0_0_25px_rgba(192,133,82,0.6)] hover:-translate-y-0.5 active:scale-95 shrink-0",
        )}
      >
        Explore
      </Button>
    </form>
  );
}
