import UpdateProviderProfileFormServer from "@/components/modules/user/provider/updateProfile/UpdateProviderProfileFormServer";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function UpdateProviderProfilePage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6 space-y-12">
      {/* 1. Navigation Header for Operational Continuity */}
      <header className="space-y-4">
        <Link
          href="/dashboard/provider-dashboard/profile"
          className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-[0.2em] text-primary/60 hover:text-primary transition-colors"
        >
          <ChevronLeft size={14} /> Back to Profile
        </Link>
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-cream tracking-tight">
            Refine <span className="text-primary italic">Identity</span>
          </h1>
          <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold opacity-60">
            Adjust your professional culinary credentials in the community
            archives.
          </p>
        </div>
      </header>

      {/* 2. Invoking the Server Component to fetch and display the form */}
      <UpdateProviderProfileFormServer />
    </div>
  );
}
