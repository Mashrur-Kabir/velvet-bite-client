import { AppSidebar } from "@/components/layout/app-sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { Roles } from "@/constants/userRoles";
import { userService } from "@/services/userServices/user.service";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  adminSlot,
  providerSlot,
  customerSlot,
}: {
  adminSlot: React.ReactNode;
  providerSlot: React.ReactNode;
  customerSlot: React.ReactNode;
}) {
  const { data } = await userService.getSession();

  if (!data?.user) {
    redirect("/login");
  }

  const userRole = data.user.role;

  return (
    <div className="flex min-h-screen bg-[#1A0F0D]">
      {/* Custom Sidebar - Fixed width 72 (18rem) */}
      <AppSidebar user={{ role: userRole }} />

      {/* Main Content Area - Margin left to make room for fixed sidebar */}
      <div className="flex flex-1 flex-col ml-72">
        <header className="sticky top-0 z-30 flex h-16 items-center border-b border-caramel/5 bg-[#1A0F0D]/80 px-8 backdrop-blur-md">
          <div className="text-[10px] font-serif uppercase tracking-[0.3em] text-caramel/60">
            Dashboard /{" "}
            <span className="text-caramel italic">
              {userRole.toLowerCase()}
            </span>
          </div>
        </header>

        <main className="flex-1 p-8 overflow-y-auto">
          {userRole === Roles.admin && adminSlot}
          {userRole === Roles.provider && providerSlot}
          {userRole === Roles.customer && customerSlot}
        </main>
      </div>
    </div>
  );
}
