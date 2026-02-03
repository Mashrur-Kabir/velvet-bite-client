import UpdateAdminProfileFormServer from "@/components/modules/user/admin/updateProfile/UpdateAdminProfileFormServer";
import { ShieldCheck, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function UpdateAdminProfilePage() {
  return (
    <div className="max-w-4xl mx-auto pb-20 pt-5 px-6 space-y-12">
      <header className="space-y-4">
        <Link
          href="/dashboard/admin-dashboard"
          className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-[0.2em] text-primary/60 hover:text-primary transition-colors"
        >
          <ChevronLeft size={14} /> Back to overview
        </Link>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-primary size-8" />
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-cream tracking-tight">
              Refine <span className="text-primary italic">Profile</span>
            </h1>
          </div>
          <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold opacity-60">
            Update your administrative profile within the system hierarchy.
          </p>
        </div>
      </header>

      <UpdateAdminProfileFormServer />
    </div>
  );
}
