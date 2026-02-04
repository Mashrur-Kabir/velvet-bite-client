import { publicService } from "@/services/publicServices/public.service";
import { userService } from "@/services/userServices/user.service";
import { TrendingMealCard } from "@/components/modules/homepage/TrendingMealCard";
import {
  Soup,
  ArrowRight,
  ChevronRight,
  ChefHat,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import * as motion from "framer-motion/client";
import { Button } from "@/components/ui/button";
import { ICategory, IMeal, IProvider } from "@/types";
import { Roles } from "@/constants/userRoles";
import { HeroSearch } from "@/components/modules/homepage/HeroSearch";

export default async function Home() {
  // 1. Data Fetching
  const [categoriesRes, mealsRes, providersRes, sessionRes] = await Promise.all(
    [
      publicService.getCategories({ revalidate: 3600 }),
      publicService.getMeals({ limit: 3 }, { revalidate: 60 }),
      publicService.getProviders({ revalidate: 600 }),
      userService.getSession(),
    ],
  );

  const categories: ICategory[] = categoriesRes.data || [];
  const trendingMeals: IMeal[] = mealsRes.data || [];
  const topProviders: IProvider[] = providersRes.data?.slice(0, 4) || [];
  const user = sessionRes.data?.user;

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative flex min-h-[90vh] items-center justify-center px-6 py-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/images/home/homeWallpaper.png"
            alt="Velvet Bite Background"
            fill
            priority
            className="object-cover brightness-[0.35]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-background" />
        </div>

        <div className="container relative z-10 mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              ease: [0.16, 1, 0.3, 1],
              duration: 1.2,
              opacity: { duration: 0.6 },
            }}
            className="max-w-4xl transform-gpu backface-hidden will-change-[transform,opacity]"
          >
            <h1 className="mb-6 text-6xl font-extrabold tracking-tight text-[#F3E9DC] md:text-8xl">
              Savor the{" "}
              <span className="text-primary font-serif italic">Velvet</span> in
              Every Bite
            </h1>
            <p className="mb-10 text-[13px] md:text-[15px] text-[#F3E9DC]/60 font-medium uppercase tracking-[0.25em] leading-relaxed max-w-2xl mx-auto">
              Real-time flavors from the best local kitchens, delivered to your
              doorstep.
            </p>

            {/* USE THE ROBUST COMPONENT HERE */}
            <HeroSearch />
          </motion.div>
        </div>
      </section>

      <div className="relative z-20 bg-background">
        {/* 2. DYNAMIC CATEGORIES */}
        <section className="container mx-auto pt-20 px-6 pb-20">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6">
            {categories.slice(0, 6).map((cat: ICategory, i: number) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Link
                  href={`/meals?category=${cat.name}`}
                  className="group relative flex h-40 flex-col items-center justify-center gap-4 overflow-hidden rounded-3xl bg-card border border-border transition-all hover:border-primary/40 hover:shadow-2xl"
                >
                  <div className="rounded-2xl bg-muted p-4 transition-transform group-hover:scale-110 group-hover:rotate-6 text-primary">
                    <Soup className="size-6" />
                  </div>
                  <span className="font-serif text-lg font-bold text-foreground">
                    {cat.name}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 3. TRENDING MEALS */}
        <section className="container mx-auto px-6 py-20">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-brownie dark:text-cream">
              Trending Now
            </h2>
            <Button
              asChild
              variant="ghost"
              className="text-primary font-bold group"
            >
              <Link href="/meals">
                Browse All{" "}
                <ChevronRight className="ml-1 size-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {trendingMeals.map((meal: IMeal) => (
              <TrendingMealCard key={meal.id} meal={meal} />
            ))}
          </div>
        </section>

        {/* 4. MASTER KITCHENS */}
        <section className="container mx-auto px-6 py-20 bg-muted/30 rounded-[4rem]">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold">Master Kitchens</h2>
            <p className="text-muted-foreground mt-2">
              The artisans behind your favorite flavors.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topProviders.map((provider: IProvider) => (
              <Link
                key={provider.id}
                href={`/providers/${provider.id}`}
                className="p-8 bg-card rounded-[2.5rem] border border-border hover:border-primary/40 transition-all text-center group"
              >
                <div className="size-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                  <ChefHat size={32} />
                </div>
                <h3 className="font-bold text-xl">{provider.name}</h3>
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-widest truncate">
                  {provider.address}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* 5. DYNAMIC CTA CONVERSION */}
        <section className="container mx-auto px-6 py-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-[3rem] bg-primary-foreground/50 p-12 md:p-20 text-cream shadow-2xl shadow-black/90 text-center relative overflow-hidden"
          >
            <h2 className="relative z-10 mb-6 text-4xl font-bold md:text-6xl font-serif">
              {user
                ? `Welcome Back, ${user.name}`
                : "Join the Velvet Community"}
            </h2>
            <p className="relative z-10 mb-12 text-cream/70 text-lg md:text-xl max-w-2xl mx-auto">
              {user?.role === Roles.admin &&
                "The platform governance awaits your orchestration."}
              {user?.role === Roles.provider &&
                "Your kitchen is ready for new masterpieces."}
              {user?.role === Roles.customer &&
                "Ready for your next culinary investment?"}
              {!user &&
                "Whether you are a foodie or a provider, we have a place for you."}
            </p>

            <div className="relative z-10 flex flex-wrap justify-center gap-6">
              {user ? (
                <Button
                  asChild
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-amber-900 hover:text-white/80 rounded-full px-12 py-7 text-[14px] font-bold shadow-xl group"
                >
                  <Link
                    href={
                      user.role === Roles.admin
                        ? "/admin-dashboard"
                        : user.role === Roles.provider
                          ? "/provider-dashboard"
                          : "/dashboard"
                    }
                  >
                    <LayoutDashboard className="mr-2 size-5" /> Go to Dashboard
                  </Link>
                </Button>
              ) : (
                <>
                  <Button
                    asChild
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-amber-900 hover:text-white/80 rounded-full px-12 py-7 text-[14px] font-bold"
                  >
                    <Link href="/register">
                      Start Ordering <ArrowRight className="ml-2 size-5" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="rounded-full px-12 py-7 text-[14px] hover:text-white/90 font-bold border-cream/30 text-cream hover:bg-amber-900"
                  >
                    <Link href="/register">Join as Provider</Link>
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
