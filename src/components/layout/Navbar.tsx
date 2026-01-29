"use client";

import Image from "next/image"; // 1. Optimal import
import { Menu, UtensilsCrossed, Store, Info, PhoneCall } from "lucide-react"; // Removed ShoppingBag as it's replaced
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
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "./ModeToggle";

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
  const logo = {
    url: "/",
    src: "/assets/logo/website-logo.png", // 2. Direct path to public folder
    title: "Velvet Bite", // Updated to match your logo text
    alt: "Velvet Bite Logo",
  };

  const menu: MenuItem[] = [
    /* ... your menu items ... */
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
          description: "Learn more about the FoodHub mission.",
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
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex w-full">
          <div className="flex items-center gap-8">
            <a href={logo.url} className="flex items-center gap-2">
              {/* 3. Replaced Icon with Next.js Image */}
              <Image
                src={logo.src}
                alt={logo.alt}
                width={40}
                height={40}
                className="rounded-full" // Keeps the logo neat
                priority // Ensures logo loads immediately
              />
              <span className="text-xl font-bold tracking-tight text-brownie dark:text-cream">
                {logo.title}
              </span>
            </a>
            <NavigationMenu>
              <NavigationMenuList>
                {menu.map((item) => renderMenuItem(item))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="flex items-center gap-3">
            <ModeToggle />
            <Button asChild variant="ghost" size="sm">
              <a href="/login">Login</a>
            </Button>
            <Button
              asChild
              size="sm"
              className="bg-primary hover:bg-caramel text-primary-foreground"
            >
              <a href="/register">Join Now</a>
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="flex items-center justify-between w-full lg:hidden">
          <a href={logo.url} className="flex items-center gap-2">
            {/* 4. Replaced Icon with Next.js Image for Mobile */}
            <Image
              src={logo.src}
              alt={logo.alt}
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="text-lg font-bold">{logo.title}</span>
          </a>
          <div className="flex items-center gap-2">
            <ModeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetHeader className="flex flex-row items-center gap-2">
                    {/* 5. Logo inside the Sheet Content */}
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                    <SheetTitle>{logo.title}</SheetTitle>
                  </SheetHeader>
                </SheetHeader>
                <div className="flex flex-col gap-6 mt-8">
                  <Accordion type="single" collapsible className="w-full">
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>
                  {/* ... login/signup buttons ... */}
                  <div className="flex flex-col gap-3 pt-4 border-t">
                    <Button asChild variant="outline">
                      <a href="/login">Login</a>
                    </Button>
                    <Button asChild>
                      <a href="/register">Sign up</a>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ... render functions ... */
const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger className="text-brownie/80 dark:text-cream/80">
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
      <NavigationMenuLink
        href={item.url}
        className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:text-primary"
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-md py-3 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2">
          {item.items.map((subItem) => (
            <a
              key={subItem.title}
              href={subItem.url}
              className="block p-2 rounded-md hover:bg-muted text-sm"
            >
              {subItem.title}
            </a>
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }
  return (
    <a
      key={item.title}
      href={item.url}
      className="text-md font-semibold py-3 block border-b border-transparent"
    >
      {item.title}
    </a>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <a
      className="flex flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted"
      href={item.url}
    >
      <div className="text-primary">{item.icon}</div>
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
        {item.description && (
          <p className="text-sm leading-snug text-muted-foreground mt-1">
            {item.description}
          </p>
        )}
      </div>
    </a>
  );
};

export { Navbar };
