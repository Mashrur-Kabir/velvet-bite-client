import {
  getAdminProfileAction,
  getAllUsersAction,
} from "@/actions/admin.action";
import AdminProfile from "@/components/modules/user/admin/AdminProfile";
import { Edit3, LayoutDashboard } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const [profileRes, usersRes] = await Promise.all([
    getAdminProfileAction(),
    getAllUsersAction(),
  ]);

  if (!profileRes.data) return null;

  return (
    <div className="max-w-7xl mx-auto py-16 px-6 space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="text-primary size-8" />
            <h1 className="text-5xl font-serif font-bold text-cream tracking-tight">
              Admin <span className="text-primary italic">Overview</span>
            </h1>
          </div>
          <p className="text-muted-foreground uppercase tracking-[0.4em] text-[10px] font-bold">
            Platform Governance
          </p>
        </div>
        <Link
          href="/admin-dashboard/update-profile"
          className="flex items-center gap-3 px-8 h-14 rounded-full bg-primary text-primary-foreground hover:text-cream font-bold hover:bg-accent transition-all uppercase tracking-widest text-xs shadow-xl shadow-primary/10"
        >
          <Edit3 size={16} /> Refine Profile
        </Link>
      </header>

      <AdminProfile user={profileRes.data} allUsers={usersRes.data || []} />
    </div>
  );
}
