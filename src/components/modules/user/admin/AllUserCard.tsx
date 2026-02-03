"use client";

import { IUser } from "@/types";
import { motion } from "framer-motion";
import { Mail, Shield, User as UserIcon, MessageSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AllUserCard({ user }: { user: IUser }) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }} // Reduced scale slightly for smoother feel
      className="bg-card/40 backdrop-blur-md border border-border/40 rounded-[2rem] p-6 flex flex-col md:flex-row justify-between items-center group transition-colors duration-500 hover:border-primary/40"
    >
      <div className="flex items-center gap-6 w-full md:w-auto">
        {/* Avatar Container */}
        <div className="relative size-16 rounded-2xl bg-gradient-to-tr from-primary/20 to-amber-900/20 flex items-center justify-center border border-primary/20 shadow-xl overflow-hidden shrink-0">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name}
              fill
              className="object-cover"
              sizes="64px"
            />
          ) : (
            <UserIcon className="text-primary/60" size={24} />
          )}
        </div>

        <div className="overflow-hidden">
          <h4 className="text-xl font-serif font-bold text-cream group-hover:text-primary transition-colors truncate">
            {user.name}
          </h4>
          <div className="flex flex-wrap items-center gap-3 text-[10px] uppercase font-bold tracking-widest text-cream/40 mt-1">
            <span className="flex items-center gap-1">
              <Mail size={10} /> {user.email}
            </span>
            <span className="text-cream/10 hidden sm:inline">|</span>
            <span
              className={`px-2 py-0.5 rounded-md ${
                user.status === "ACTIVE"
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "bg-rose-500/10 text-rose-400"
              }`}
            >
              {user.status}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons - Added shrink-0 to prevent layout collapse */}
      <div className="mt-6 md:mt-0 flex items-center gap-3 w-full md:w-auto justify-end shrink-0">
        {user.role === "CUSTOMER" && (
          <Link
            href={`/admin-dashboard/manage-users/reviews?userId=${user.id}`}
            className="px-6 py-3 rounded-xl bg-background/50 border border-border/20 text-cream/60 text-[10px] uppercase font-bold tracking-widest flex items-center gap-2 hover:border-primary/40 hover:text-primary transition-all"
          >
            <MessageSquare size={14} /> Audit Reviews
          </Link>
        )}

        <button
          title="Manage User Permissions"
          className="p-3 rounded-xl bg-primary/10 border border-transparent hover:border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 active:scale-95 flex items-center justify-center"
        >
          <Shield size={18} />
        </button>
      </div>
    </motion.div>
  );
}
