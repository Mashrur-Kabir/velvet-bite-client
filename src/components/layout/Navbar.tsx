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
import { ModeToggle } from "./ModeToggle";
import { useMounted } from "@/hooks/useMounted";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client"; // Import auth client
import { Roles } from "@/constants/userRoles"; // Import Roles
import { useRouter, usePathname } from "next/navigation";

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

  // 1. Get Session state from Better Auth
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // 2. Dynamic Dashboard Route Logic
  const getDashboardUrl = () => {
    if (!user) return "/login";
    switch (user.role) {
      case Roles.admin:
        return "/admin-dashboard";
      case Roles.provider:
        return "/provider-dashboard";
      default:
        return "/dashboard"; // Default for CUSTOMER
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
          url: "/order",
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

  return (
    <section
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur `supports-backdrop-filter:bg-background/60` py-4",
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

          <nav className="hidden lg:block">
            {isMounted && (
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                  {/* 3. Add Dashboard to main menu if logged in */}
                  {user && (
                    <NavigationMenuItem>
                      <NavigationMenuLink
                        asChild
                        className="group relative inline-flex h-10 w-max items-center justify-center px-4 py-2 text-sm font-medium transition-colors text-cream"
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
          {isMounted ? <ModeToggle /> : <div className="size-10" />}

          <nav className="hidden lg:flex items-center gap-3">
            {/* 4. Conditional Auth Buttons */}
            {!user ? (
              <>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "relative h-9 px-4 group",
                    "hover:bg-primary-foreground",
                    "after:absolute after:bottom-1 after:left-0 after:h-0.5 after:bg-brownie dark:after:bg-white after:transition-all after:duration-300",
                    pathname === "/login"
                      ? "after:w-full"
                      : "after:w-0 hover:after:w-full",
                  )}
                >
                  <Link href="/login">Login</Link>
                </Button>

                <Button
                  asChild
                  size="sm"
                  className="bg-primary hover:bg-accent hover:text-white font-bold text-black rounded-lg transition-shadow"
                >
                  <Link href="/register">Register</Link>
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                className="group relative w-32 overflow-hidden rounded-xl border-caramel/50 text-brownie transition-all hover:bg-destructive hover:text-white"
              >
                {/* The Icon: Starts on the left, moves to center on hover */}
                <LogOut className="absolute left-4 size-4 transition-all duration-300 group-hover:left-1/2 group-hover:-translate-x-1/2" />

                {/* The Text: Fades out and slides to the right on hover */}
                <span className="ml-6 transition-all duration-300 group-hover:translate-x-10 group-hover:opacity-0">
                  Sign Out
                </span>
              </Button>
            )}
          </nav>

          {/* Mobile Menu */}
          <div className="lg:hidden flex items-center">
            {isMounted && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="size-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <SheetHeader className="mb-4">
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
                      {menu.map((item) => renderMobileMenuItem(item))}
                      {user && (
                        <Link
                          href={getDashboardUrl()}
                          className="text-md font-bold py-3 block text-cream"
                        >
                          Go to Dashboard
                        </Link>
                      )}
                    </Accordion>
                    <div className="flex flex-col gap-3 pt-4 border-t">
                      {!user ? (
                        <>
                          <Button
                            asChild
                            variant="ghost"
                            size="sm"
                            className={cn(
                              "relative h-9 px-4 group",
                              "hover:bg-primary-foreground",
                              "after:absolute after:bottom-1 after:left-0 after:h-[2px] after:bg-brownie dark:after:bg-white after:transition-all after:duration-300",
                              pathname === "/login"
                                ? "after:w-full"
                                : "after:w-0 hover:after:w-full",
                            )}
                          >
                            <Link href="/login">Login</Link>
                          </Button>

                          <Button
                            asChild
                            size="sm"
                            className="bg-primary hover:bg-accent hover:text-white text-black rounded-lg transition-shadow"
                          >
                            <Link href="/register">Register</Link>
                          </Button>
                        </>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleSignOut}
                          className="group relative w-20 overflow-hidden rounded-xl border-caramel/50 text-brownie transition-all hover:bg-destructive hover:text-white"
                        >
                          {/* The Icon: Starts on the left, moves to center on hover */}
                          <LogOut className="absolute left-4 size-4 transition-all duration-300 group-hover:left-1/2 group-hover:-translate-x-1/2" />

                          {/* The Text: Fades out and slides to the right on hover */}
                          <span className="ml-6 transition-all duration-300 group-hover:translate-x-10 group-hover:opacity-0">
                            Sign Out
                          </span>
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

/* --- Render Functions --- */
const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger className="text-brownie/80 dark:text-cream dark:hover:text-white hover:text-primary">
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid w-100 gap-3 p-4 md:w-125 md:grid-cols-2 lg:w-150 bg-card">
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
        className="group relative inline-flex h-10 w-max items-center justify-center px-4 py-2 text-sm font-medium transition-colors text-brownie dark:text-cream dark:hover:text-white"
      >
        <Link href={item.url}>{item.title}</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-md py-3 font-semibold hover:text-primary">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2">
          {item.items.map((subItem) => (
            <Link
              key={subItem.title}
              href={subItem.url}
              className="block p-2 rounded-md hover:bg-brownie hover:text-cream text-sm transition-colors"
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
      className="relative text-md font-semibold py-3 block w-fit"
    >
      {item.title}
    </Link>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <Link
      href={item.url}
      className="flex flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors hover:bg-brownie group"
    >
      <div className="text-primary group-hover:text-cream">{item.icon}</div>
      <div>
        <div className="text-sm font-semibold group-hover:text-cream">
          {item.title}
        </div>
        {item.description && (
          <p className="text-sm leading-snug text-muted-foreground mt-1 group-hover:text-cream/80">
            {item.description}
          </p>
        )}
      </div>
    </Link>
  );
};

export { Navbar };
