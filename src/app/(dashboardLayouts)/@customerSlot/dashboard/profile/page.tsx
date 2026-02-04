import {
  getMyOrdersAction,
  getMyProfileAction,
} from "@/actions/customer.action"; // Import your user service
import IdentityHub from "@/components/modules/user/customer/updateProfile/IdentityHub";
import { Star, PackageCheck, ShieldAlert, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function ProfilePage() {
  // 1. Parallel Fetch: Orders and Profile Identity
  const [ordersRes, profileRes] = await Promise.all([
    getMyOrdersAction(),
    getMyProfileAction(),
  ]);

  const orders = ordersRes.data || [];
  const user = profileRes.data;

  // Filtering logic for delivered items only
  const reviewableOrders =
    orders?.filter((o) => o.status === "DELIVERED") || [];

  return (
    <div className="max-w-6xl mx-auto space-y-16 pb-20 px-6">
      {/* 1. Header: Balanced and Elegant */}
      <header className="animate-velvet-title space-y-3 mt-16 text-center max-w-2xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-cream tracking-tight">
          Manage Your <span className="text-primary italic">Profile</span>
        </h1>
        <p className="text-cream/40 text-sm leading-relaxed uppercase tracking-[0.2em] font-medium">
          Securely handle your culinary experience.
        </p>
        <div className="h-px w-60 bg-gradient-to-r from-transparent via-cream/40 to-transparent mx-auto mt-6" />
      </header>

      {/* 2. Main content: Centered Grid */}
      <main className="max-w-4xl mx-auto space-y-20">
        {/* --- IDENTITY HUB SECTION --- */}
        {/* Pass the dynamic user data from the backend */}
        {user && <IdentityHub user={user} />}

        {/* --- AWAITING REFLECTION SECTION --- */}
        <section className="space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-cream/10 pb-6">
            <div className="space-y-1">
              <h2 className="flex items-center gap-3 font-serif text-3xl text-cream">
                <PackageCheck className="text-cream size-8" /> Awaiting Reviews
              </h2>
              <p className="text-cream/30 text-xs italic ml-11">
                Items delivered and ready for your critique.
              </p>
            </div>

            <Link
              href="/dashboard/profile/my-reviews"
              className="group relative flex items-center gap-2 px-4 py-2 overflow-hidden"
            >
              <span className="relative z-10 text-[10px] uppercase tracking-[0.3em] font-bold text-cream group-hover:text-cream transition-colors duration-500">
                View All Reviews
              </span>
              <ArrowRight className="relative z-10 size-4 text-cream group-hover:text-cream group-hover:translate-x-1 transition-all duration-500" />
              <div className="absolute inset-0 bg-cream/0 group-hover:bg-cream/10 rounded-lg transition-all duration-500 scale-90 group-hover:scale-100" />
            </Link>
          </div>

          <div className="grid gap-6">
            {reviewableOrders.length > 0 ? (
              reviewableOrders.map((order, index) => (
                <div
                  key={order.id}
                  className="animate-metadata group relative p-8 bg-[#2D1B16]/40 border border-cream/5 rounded-[2.5rem] flex flex-col md:flex-row justify-between items-center transition-all duration-700 hover:bg-primary/10 hover:border-cream/20 hover:shadow-2xl hover:shadow-cream/5"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cream/0 via-cream/[0.02] to-cream/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 rounded-[2.5rem]" />

                  <div className="flex gap-6 items-center mb-6 md:mb-0 relative z-10">
                    <div className="size-16 rounded-2xl bg-black/40 border border-cream/10 flex items-center justify-center text-cream shadow-inner group-hover:border-cream/40 transition-all duration-500">
                      <Star
                        size={28}
                        className="group-hover:rotate-[72deg] group-hover:scale-110 transition-all duration-700 ease-out"
                      />
                    </div>
                    <div>
                      <p className="text-cream font-serif text-xl font-bold group-hover:text-cream transition-colors">
                        {order.items[0]?.meal?.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="size-1 rounded-full bg-cream/40" />
                        <p className="text-[10px] text-cream/40 uppercase tracking-widest font-bold">
                          Delivered{" "}
                          {new Date(order.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/dashboard/profile/create-review?mealId=${order.items[0]?.meal?.id}`}
                    className="relative z-10 w-full md:w-auto text-center px-10 py-4 rounded-full bg-[#1A0F0D] border border-cream/20 text-[10px] text-cream hover:bg-cream hover:text-primary-foreground hover:scale-105 active:scale-95 transition-all duration-500 font-semibold uppercase tracking-[0.25em] shadow-lg overflow-hidden"
                  >
                    Share Review
                  </Link>
                </div>
              ))
            ) : (
              <div className="py-24 px-6 rounded-[3rem] border border-dashed border-cream/10 flex flex-col items-center justify-center text-center bg-black/10 transition-colors hover:bg-black/20 group">
                <ShieldAlert className="size-12 text-cream/10 mb-4 group-hover:text-cream/20 transition-colors duration-500" />
                <p className="text-cream/20 font-serif text-lg italic">
                  No deliveries are currently awaiting reviews.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Security Footer */}
        <footer className="pt-12 border-t border-cream/5 flex flex-col items-center gap-4">
          <p className="text-[9px] text-cream/10 uppercase tracking-[0.6em] font-bold">
            Velvet Kitchen Security Protocol v2.0
          </p>
        </footer>
      </main>
    </div>
  );
}
