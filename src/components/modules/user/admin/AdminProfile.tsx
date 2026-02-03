"use client";

import { IUser } from "@/types";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Mail,
  Phone,
  Calendar,
  Users,
  Briefcase,
  Activity,
} from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";

export default function AdminProfile({
  user,
  allUsers,
}: {
  user: IUser;
  allUsers: IUser[];
}) {
  // Platform wide stats derived from allUsers
  const totalProviders = allUsers.filter((u) => u.role === "PROVIDER").length;
  const totalCustomers = allUsers.filter((u) => u.role === "CUSTOMER").length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-10"
    >
      {/* Admin Identity Card */}
      <section className="relative p-10 bg-card/40 backdrop-blur-xl border border-border/50 rounded-[3rem] overflow-hidden shadow-premium-dark">
        <div className="absolute top-0 right-0 p-10 opacity-5 rotate-12">
          <ShieldCheck size={200} />
        </div>

        <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
          <div className="size-36 rounded-full bg-gradient-to-tr from-primary to-amber-900 border-4 border-background shadow-2xl flex items-center justify-center text-4xl font-serif text-cream uppercase">
            {user.image ? (
              <div className="relative size-36 rounded-full overflow-hidden">
                <Image
                  src={user.image}
                  alt={user.name}
                  fill
                  sizes="144px"
                  className="object-cover"
                />
              </div>
            ) : (
              user.name.charAt(0)
            )}
          </div>

          <div className="flex-1 text-center md:text-left space-y-4">
            <div>
              <h1 className="text-4xl font-serif font-bold text-cream tracking-tight">
                {user.name}
              </h1>
              <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] text-primary font-black uppercase tracking-widest">
                System Administrator
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-cream/60">
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-primary" /> {user.email}
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-primary" />{" "}
                {user.phone || "No direct line set"}
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-primary" /> Established{" "}
                {format(new Date(user.createdAt), "PPP")}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Orchestration Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            label: "Total Partners",
            val: totalProviders,
            icon: Briefcase,
            color: "text-amber-500",
          },
          {
            label: "Active Customers",
            val: totalCustomers,
            icon: Users,
            color: "text-emerald-500",
          },
          {
            label: "System Health",
            val: "Optimal",
            icon: Activity,
            color: "text-primary",
          },
        ].map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            className="p-8 rounded-[2.5rem] bg-card/40 border border-border/30 hover:border-primary/40 transition-all duration-500 group"
          >
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest text-cream/30 font-bold">
                  {stat.label}
                </p>
                <p className="text-3xl font-serif font-bold text-cream">
                  {stat.val}
                </p>
              </div>
              <div
                className={`size-12 rounded-2xl bg-background/50 flex items-center justify-center border border-border/20 ${stat.color}`}
              >
                <stat.icon size={20} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
