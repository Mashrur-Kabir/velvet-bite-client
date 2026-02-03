import { getMyProviderAction } from "@/actions/provider.action";
import ProviderProfile from "@/components/modules/user/provider/ProviderProfile";
import { Edit3 } from "lucide-react";
import Link from "next/link";
import { getMyProfileAction } from "@/actions/customer.action";

export default async function ProviderProfilePage() {
  // Parallel Fetch: User Identity + Provider Identity
  const [userRes, providerRes] = await Promise.all([
    getMyProfileAction(),
    getMyProviderAction(),
  ]);

  const user = userRes.data;
  const provider = providerRes.data;

  if (!user || !provider) return null;

  return (
    <div className="max-w-7xl mx-auto py-16 px-6 space-y-12">
      <header className="flex justify-between items-end">
        <div className="space-y-2">
          <h1 className="text-5xl font-serif font-bold text-cream tracking-tight">
            Kitchen <span className="text-primary italic">Identity</span>
          </h1>
          <p className="text-muted-foreground uppercase tracking-[0.4em] text-[10px] font-bold">
            Manage your credentials
          </p>
        </div>
        <Link
          href="/provider-dashboard/profile/update-profile"
          className="flex items-center gap-3 px-8 h-14 rounded-full bg-primary hover:text-cream text-primary-foreground font-bold hover:bg-accent transition-all uppercase tracking-widest text-xs shadow-xl shadow-primary/10"
        >
          <Edit3 size={16} /> Update Profile
        </Link>
      </header>

      <ProviderProfile user={user} provider={provider} />
    </div>
  );
}
