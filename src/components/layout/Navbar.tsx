"use client";

import Image from "next/image";
import Link from "next/link"; // 1. Added Link import
import { Menu, UtensilsCrossed, Store, Info, PhoneCall } from "lucide-react";
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

// Create a motion-enabled Link for the logo
const MotionLink = motion.create(Link);

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface NavbarProps {
  className?: string;
}

const Navbar = ({ className }: NavbarProps) => {
  const isMounted = useMounted();

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
    {
      title: "My Orders",
      url: "/orders",
    },
  ];

  return (
    <section
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4",
        className,
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Left Side: Logo & Desktop Navigation */}
        <div className="flex items-center gap-8">
          {/* 2. Updated Logo Link to use MotionLink */}
          <MotionLink
            href={logo.url}
            className="flex items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
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

          {/* Desktop Nav */}
          <nav className="hidden lg:block">
            {isMounted && (
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            )}
          </nav>
        </div>

        {/* Right Side: Auth & Theme Toggle */}
        <div className="flex items-center gap-3">
          {isMounted ? <ModeToggle /> : <div className="size-10" />}

          <nav className="hidden lg:flex items-center gap-3">
            {/* 3. Updated Auth buttons to use Link */}
            <Button asChild variant="ghost" size="sm">
              <Link href="/login">Login</Link>
            </Button>
            <Button
              asChild
              size="sm"
              className="bg-primary hover:bg-amber-800 hover:text-white text-primary-foreground"
            >
              <Link href="/register">Register</Link>
            </Button>
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
                  <SheetHeader className="flex flex-row items-center gap-2">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={100}
                      height={50}
                      className="object-contain"
                    />
                  </SheetHeader>
                  <div className="flex flex-col gap-6 mt-8">
                    <Accordion type="single" collapsible className="w-full">
                      {menu.map((item) => renderMobileMenuItem(item))}
                    </Accordion>
                    <div className="flex flex-col gap-3 pt-4 border-t">
                      <Button asChild variant="outline">
                        <Link href="/login">Login</Link>
                      </Button>
                      <Button asChild>
                        <Link href="/register">Sign up</Link>
                      </Button>
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
        <NavigationMenuTrigger className="text-brownie/80 dark:text-cream/80 hover:bg-brownie hover:text-cream data-[state=open]:bg-brownie data-[state=open]:text-cream">
          {item.title}
        </NavigationMenuTrigger>

        <NavigationMenuContent>
          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-card">
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
      {/* 4. Using Link inside NavigationMenuLink via asChild */}
      <NavigationMenuLink
        asChild
        className={cn(
          "group relative inline-flex h-10 w-max items-center justify-center px-4 py-2 text-sm font-medium transition-colors cursor-pointer",
          "text-brownie dark:text-cream",
          "after:absolute after:bottom-1 after:left-1/2 after:h-[2px] after:w-0 after:-translate-x-1/2 after:bg-black dark:after:bg-white after:transition-all after:duration-300 hover:after:w-full",
        )}
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
        <AccordionTrigger className="text-md py-3 font-semibold hover:no-underline hover:text-primary transition-colors">
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
      className={cn(
        "relative text-md font-semibold py-3 block w-fit transition-colors",
        "after:absolute after:bottom-2 after:left-0 after:h-[2px] after:w-0 after:bg-black dark:after:bg-white after:transition-all after:duration-300 hover:after:w-full",
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
      className="flex flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-brownie group"
    >
      <div className="text-primary group-hover:text-cream transition-colors">
        {item.icon}
      </div>
      <div>
        <div className="text-sm font-semibold group-hover:text-cream transition-colors">
          {item.title}
        </div>
        {item.description && (
          <p className="text-sm leading-snug text-muted-foreground mt-1 group-hover:text-cream/80 transition-colors">
            {item.description}
          </p>
        )}
      </div>
    </Link>
  );
};

export { Navbar };
