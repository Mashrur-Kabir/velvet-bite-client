import { getAllUsersAction } from "@/actions/admin.action";
import AllUserCard from "@/components/modules/user/admin/AllUserCard";
import { Users, Briefcase, MessageSquare } from "lucide-react";
import Link from "next/link";

export default async function ManageUsersPage() {
  const { data: users } = await getAllUsersAction();

  const customers = users?.filter((u) => u.role === "CUSTOMER") || [];
  const providers = users?.filter((u) => u.role === "PROVIDER") || [];

  return (
    <div className="max-w-7xl mx-auto py-16 px-6 space-y-16">
      <header className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="space-y-2">
          <h1 className="text-5xl font-serif font-bold text-cream tracking-tight">
            Platform <span className="text-primary italic">Velvet Family</span>
          </h1>
          <p className="text-muted-foreground uppercase tracking-[0.4em] text-[10px] font-bold">
            User Management & Governance
          </p>
        </div>

        {/* --- GLOBAL REVIEW ACTION --- */}
        <Link
          href="/admin-dashboard/manage-users/all-reviews"
          className="flex items-center gap-3 px-8 h-14 rounded-full bg-card/40 border border-primary/20 text-primary font-bold hover:bg-primary hover:text-primary-foreground transition-all uppercase tracking-widest text-[10px] shadow-xl shadow-primary/5 group"
        >
          <MessageSquare
            size={16}
            className="group-hover:rotate-12 transition-transform"
          />
          Audit All Feedback
        </Link>
      </header>

      {/* --- PROVIDERS SECTION --- */}
      <section className="space-y-8">
        <div className="flex items-center gap-3 px-2 border-l-2 border-primary">
          <Briefcase className="text-primary" size={20} />
          <h2 className="text-2xl font-serif font-bold text-cream">
            Partner Kitchens{" "}
            <span className="text-sm font-sans font-normal text-cream/40 ml-2">
              ({providers.length})
            </span>
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {providers.map((user) => (
            <AllUserCard key={user.id} user={user} />
          ))}
        </div>
      </section>

      {/* --- CUSTOMERS SECTION --- */}
      <section className="space-y-8">
        <div className="flex items-center gap-3 px-2 border-l-2 border-emerald-500">
          <Users className="text-emerald-500" size={20} />
          <h2 className="text-2xl font-serif font-bold text-cream">
            Patrons{" "}
            <span className="text-sm font-sans font-normal text-cream/40 ml-2">
              ({customers.length})
            </span>
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {customers.map((user) => (
            <AllUserCard key={user.id} user={user} />
          ))}
        </div>
      </section>
    </div>
  );
}
