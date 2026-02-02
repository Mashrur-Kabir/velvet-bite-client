"use client";

import { IUser } from "@/types";
import { UserCircle, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function IdentityHub({ user }: { user: IUser }) {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="relative p-10 bg-gradient-to-br from-[#2D1B16] to-[#1A0F0D] rounded-[3rem] border border-cream/10 overflow-hidden shadow-2xl min-h-[280px]">
      {/* 1. Added min-h-[280px] to lock the height and prevent page-shake during load */}

      <UserCircle className="absolute -right-10 -bottom-10 size-60 text-cream/[0.03] -rotate-12" />

      <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
        <div className="size-32 rounded-[2rem] bg-black/40 border border-cream/10 p-1 relative group shrink-0">
          {user.image && !imageError ? (
            <div className="size-full rounded-[1.8rem] overflow-hidden border border-cream/5 shadow-inner relative">
              <Image
                src={user.image}
                alt={user.name}
                fill
                priority // 2. Critical: Stops the jitter by loading the image immediately
                sizes="128px"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                onError={() => setImageError(true)}
              />
            </div>
          ) : (
            <div className="size-full rounded-[1.8rem] bg-gradient-to-tr from-primary to-amber-700 flex items-center justify-center text-4xl font-serif text-cream uppercase shadow-lg">
              {user.name.charAt(0)}
            </div>
          )}

          <div className="absolute inset-0 rounded-[2rem] bg-primary/20 blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        </div>

        <div className="space-y-4 text-center md:text-left flex-1">
          <div>
            <div className="flex items-center justify-center md:justify-start gap-3 mb-1">
              <h2 className="text-4xl font-serif font-bold text-cream">
                {user.name}
              </h2>
              <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] text-primary font-bold tracking-widest flex items-center gap-1.5 uppercase">
                <ShieldCheck size={12} /> {user.role}
              </div>
            </div>
            <p className="text-cream/40 font-medium text-sm tracking-wide">
              {user.email}
            </p>
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-8 pt-4 border-t border-cream/5">
            <div className="space-y-1">
              <p className="text-[10px] text-cream/20 uppercase font-bold tracking-widest">
                Orders Handled
              </p>
              <p className="text-2xl font-serif text-cream">
                {user._count?.orders || 0}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] text-cream/20 uppercase font-bold tracking-widest">
                Reviews Shared
              </p>
              <p className="text-2xl font-serif text-cream">
                {user._count?.reviews || 0}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] text-cream/20 uppercase font-bold tracking-widest">
                Contact Ref
              </p>
              <p className="text-sm font-medium text-cream italic">
                {user.phone || "No phone linked"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
