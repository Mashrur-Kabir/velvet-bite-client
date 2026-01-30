import { AppSidebar } from "@/components/layout/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Roles } from "@/constants/userRoles";
import { userService } from "@/services/user.service";
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
  // Fetch session data from backend service
  const { data } = await userService.getSession();

  // Performance Guard: If no session, redirect to login server-side
  if (!data?.user) {
    redirect("/login");
  }

  const userRole = data.user.role;

  return (
    <SidebarProvider>
      {/* Pass the role to the Sidebar for dynamic route rendering */}
      <AppSidebar user={{ role: userRole }} />

      <SidebarInset className="bg-background">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border/50 px-6 sticky top-0 bg-background/80 backdrop-blur-md z-10">
          <SidebarTrigger className="-ml-1 text-primary hover:bg-primary/10 transition-colors" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex-1">
            <span className="text-xs text-muted-foreground uppercase tracking-tighter">
              Velvet Bite Dashboard / {userRole}
            </span>
          </div>
        </header>

        {/* Role-based Slot Rendering */}
        <main className="flex flex-1 flex-col gap-4 p-6 bg-muted/20">
          {userRole === Roles.admin && adminSlot}
          {userRole === Roles.provider && providerSlot}
          {userRole === Roles.customer && customerSlot}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
