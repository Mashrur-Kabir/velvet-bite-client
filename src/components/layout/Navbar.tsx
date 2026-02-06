"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Menu,
  UtensilsCrossed,
  Store,
  Info,
  PhoneCall,
  LogOut,
  ClipboardList,
  Beef,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useMounted } from "@/hooks/useMounted";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import { Roles } from "@/constants/userRoles";
import { useRouter, usePathname } from "next/navigation";
import { AuthButtons } from "@/handlers/navbarHandler/AuthButtons";

const MotionLink = motion.create(Link);

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

const Navbar = ({ className }: { className?: string }) => {
  const isMounted = useMounted();
  const router = useRouter();
  const pathname = usePathname();

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const getDashboardUrl = () => {
    if (!user) return "/login";
    switch (user.role) {
      case Roles.admin:
        return "/admin-dashboard";
      case Roles.provider:
        return "/provider-dashboard";
      default:
        return "/dashboard";
    }
  };

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          router.refresh();
        },
      },
    });
  };

  const logo = {
    url: "/",
    src: "/assets/logo/website-logoMain.png",
    title: "Velvet Bite",
    alt: "Velvet Bite Logo",
  };

  const menu: MenuItem[] = [
    { title: "Home", url: "/" },
    {
      title: "Explore",
      url: "/meals",
      items: [
        {
          title: "See Categories",
          description: "Enjoy browsing our categories to suit your cravings",
          icon: <ClipboardList className="size-5 shrink-0" />,
          url: "/categories",
        },
        {
          title: "Browse Meals",
          description: "Discover delicious meals from top-rated providers.",
          icon: <UtensilsCrossed className="size-5 shrink-0" />,
          url: "/meals",
        },
        {
          title: "Our Providers",
          description: "View menus from your favorite local restaurants.",
          icon: <Store className="size-5 shrink-0" />,
          url: "/providers",
        },
        {
          title: "Start Ordering",
          description: "Choose a kitchen to order from your home",
          icon: <Beef className="size-5 shrink-0" />,
          url: "/dashboard/create-orders",
        },
      ],
    },
    {
      title: "Support",
      url: "#",
      items: [
        {
          title: "About Us",
          description: "Learn more about the Velvet Bite mission.",
          icon: <Info className="size-5 shrink-0" />,
          url: "/about",
        },
        {
          title: "Contact",
          description: "Need help? Get in touch with our team.",
          icon: <PhoneCall className="size-5 shrink-0" />,
          url: "/contact",
        },
      ],
    },
  ];

  const filteredMenu = menu.map((item) => {
    if (item.items) {
      return {
        ...item,
        items: item.items
          .filter((subItem) => {
            if (subItem.title === "Start Ordering") {
              return (
                user?.role !== Roles.admin && user?.role !== Roles.provider
              );
            }
            return true;
          })
          .map((subItem) => {
            if (subItem.title === "Start Ordering" && !user) {
              return { ...subItem, url: "/login" };
            }
            return subItem;
          }),
      };
    }
    return item;
  });

  return (
    <section
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 py-4",
        className,
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <MotionLink
            href={logo.url}
            className="flex items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={120}
              height={60}
              className="object-contain"
              priority
            />
          </MotionLink>
          {/* LAPTOP VIEW */}
          <nav className="hidden lg:block">
            {isMounted && (
              <NavigationMenu>
                <NavigationMenuList>
                  {filteredMenu.map((item) => renderMenuItem(item, pathname))}
                  {user && (
                    <NavigationMenuItem>
                      <NavigationMenuLink
                        asChild
                        className={cn(
                          "relative group inline-flex h-10 w-max items-center justify-center px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors",
                          "hover:!bg-transparent focus:!bg-transparent active:!bg-transparent text-muted-foreground hover:text-primary",
                          "after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:h-[1px] after:bg-primary after:transition-all after:duration-500",
                          pathname.includes("dashboard")
                            ? "text-primary after:w-full"
                            : "after:w-0 hover:after:w-full",
                        )}
                      >
                        <Link href={getDashboardUrl()}>Dashboard</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  )}
                </NavigationMenuList>
              </NavigationMenu>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <nav className="hidden lg:flex items-center gap-3">
            {!user ? (
              <AuthButtons />
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                className="group relative w-32 h-9 overflow-hidden rounded-full border-destructive/20 text-destructive transition-all duration-500 hover:bg-destructive hover:text-white font-bold uppercase tracking-[0.2em] text-[10px]"
              >
                <LogOut className="absolute left-4 size-3.5 transition-all duration-300 group-hover:left-1/2 group-hover:-translate-x-1/2" />
                <span className="ml-6 transition-all duration-300 group-hover:translate-x-10 group-hover:opacity-0">
                  Sign Out
                </span>
              </Button>
            )}
          </nav>

          {/* MOBILE VIEW */}
          <div className="lg:hidden flex items-center">
            {isMounted && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-xl border-caramel/20"
                  >
                    <Menu className="size-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="bg-background border-l border-caramel/10 px-5"
                >
                  <SheetHeader className="mb-8 border-b border-caramel/5 pb-4">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={100}
                      height={50}
                      className="object-contain"
                    />
                  </SheetHeader>
                  <div className="flex flex-col gap-6">
                    <Accordion type="single" collapsible className="w-full">
                      {filteredMenu.map((item) =>
                        renderMobileMenuItem(item, pathname),
                      )}
                      {user && (
                        <Link
                          href={getDashboardUrl()}
                          className={cn(
                            "text-[10px] uppercase tracking-[0.3em] font-black py-4 block transition-colors hover:text-cream",
                            pathname.includes("dashboard")
                              ? "text-primary"
                              : "text-cream/60",
                          )}
                        >
                          Go to Dashboard
                        </Link>
                      )}
                    </Accordion>

                    <div className="flex flex-col gap-3 pt-6 border-t border-caramel/10">
                      {!user ? (
                        <AuthButtons className="flex-col items-stretch w-full gap-3" />
                      ) : (
                        <Button
                          variant="outline"
                          onClick={handleSignOut}
                          className="w-full h-12 rounded-full border-cream/10 bg-transparent text-cream/60 hover:bg-cream hover:text-[#2D1B16] hover:border-cream transition-all duration-300 active:scale-95 font-bold uppercase tracking-[0.2em] text-[10px] group"
                        >
                          <LogOut className="mr-2 size-4 group-hover:-translate-x-0.5 transition-transform duration-300" />
                          <span>Sign Out</span>
                        </Button>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem, pathname: string) => {
  if (item.items) {
    const isActive = item.items.some((sub) => pathname === sub.url);
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger
          className={cn(
            "text-[10px] font-bold uppercase tracking-[0.2em] bg-transparent transition-all",
            // FIX 2: Kill extra borders and Persistent BG on triggers
            "hover:!bg-transparent focus:!bg-transparent data-[state=open]:!bg-transparent border-none focus:ring-0",
            isActive
              ? "text-primary"
              : "text-muted-foreground hover:text-primary",
          )}
        >
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid w-80 gap-3 p-4 bg-card border border-caramel/10 rounded-2xl shadow-2xl">
            {item.items.map((subItem) => (
              <NavigationMenuLink asChild key={subItem.title}>
                <SubMenuLink item={subItem} />
              </NavigationMenuLink>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }
  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        asChild
        className={cn(
          "relative group inline-flex h-10 w-max items-center justify-center px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors",
          // FIX 1: Kill persistent active/focus background
          "hover:!bg-transparent focus:!bg-transparent active:!bg-transparent text-muted-foreground hover:text-primary",
          "after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:h-[1px] after:bg-primary after:transition-all after:duration-500",
          pathname === item.url
            ? "text-primary after:w-full"
            : "after:w-0 hover:after:w-full",
        )}
      >
        <Link href={item.url}>{item.title}</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem, pathname: string) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-[11px] uppercase tracking-[0.2em] py-4 font-black hover:text-primary">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-1 pl-4 border-l border-caramel/10 ml-2">
          {item.items.map((subItem) => (
            <Link
              key={subItem.title}
              href={subItem.url}
              className={cn(
                "block p-3 rounded-xl text-[10px] uppercase tracking-widest transition-all",
                pathname === subItem.url
                  ? "bg-primary text-white"
                  : "hover:bg-primary/5 text-muted-foreground",
              )}
            >
              {subItem.title}
            </Link>
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }
  return (
    <Link
      key={item.title}
      href={item.url}
      className={cn(
        "text-[11px] uppercase tracking-[0.2em] py-4 font-black block w-fit transition-colors",
        pathname === item.url
          ? "text-primary"
          : "text-muted-foreground hover:text-primary",
      )}
    >
      {item.title}
    </Link>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <Link
      href={item.url}
      className="flex flex-row gap-4 rounded-xl p-3 leading-none no-underline transition-all hover:bg-primary/5 group"
    >
      <div className="text-primary transition-transform group-hover:scale-110">
        {item.icon}
      </div>
      <div>
        <div className="text-[11px] uppercase tracking-wider font-bold text-cream group-hover:text-primary transition-colors">
          {item.title}
        </div>
        {item.description && (
          <p className="text-[10px] leading-snug text-muted-foreground mt-1 line-clamp-2 group-hover:text-muted-foreground">
            {item.description}
          </p>
        )}
      </div>
    </Link>
  );
};

export { Navbar };
