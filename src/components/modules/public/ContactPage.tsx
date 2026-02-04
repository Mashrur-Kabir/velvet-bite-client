"use client";

import { ChevronLeft, Mail, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 py-20 container mx-auto">
      <div className="space-y-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 mb-12 text-[12px] uppercase font-bold tracking-[0.3em] text-cream/40 hover:text-cream transition-all duration-300 group animate-metadata"
        >
          <ChevronLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Return Home
        </Link>
        <h2 className="text-5xl font-serif font-bold text-cream">
          Get in <span className="text-caramel">Touch</span>
        </h2>
        <p className="text-muted-foreground">
          Whether you&apos;re a connoisseur or a kitchen partner, we await your
          call.
        </p>

        <div className="space-y-2 pt-6">
          <div className="flex items-center gap-4 text-cream/60">
            <div className="size-10 rounded-xl bg-caramel/10 flex items-center justify-center text-caramel">
              <Mail size={18} />
            </div>
            velevetadmin@gmail.com
          </div>
          <div className="flex items-center gap-4 text-cream/60">
            <div className="size-10 rounded-xl bg-caramel/10 flex items-center justify-center text-caramel">
              <Phone size={18} />
            </div>
            +880 1234 567890
          </div>
        </div>
      </div>

      <div className="bg-card/40 backdrop-blur-xl p-10 rounded-[3rem] border border-caramel/10 space-y-6">
        <Input
          placeholder="Your Identity"
          className="h-14 bg-black/20 border-caramel/10 rounded-2xl text-cream"
        />
        <Input
          placeholder="Electronic Mail"
          className="h-14 bg-black/20 border-caramel/10 rounded-2xl text-cream"
        />
        <Textarea
          placeholder="Your Reflection..."
          className="min-h-[150px] bg-black/20 border-caramel/10 rounded-2xl text-cream p-6"
        />
        <Button className="w-full h-14 bg-primary hover:bg-cream text-accent hover:text-primary-foreground font-bold rounded-2xl">
          Send Message <Send size={18} className="ml-2" />
        </Button>
      </div>
    </div>
  );
}
