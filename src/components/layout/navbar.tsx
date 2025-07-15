"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { useEffect } from "react";
import {
  Home,
  Info,
  Target,
  HeartHandshake,
  Users,
  DollarSign,
  Newspaper,
  Phone,
  User,
  LucideProps,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth, User as AuthUserType } from "@/contexts/auth-context";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cn } from "@/lib/utils";

// ListItem Component
interface ListItemProps {
  className?: string;
  title: string;
  children: React.ReactNode;
  href: string;
}

const ListItem = React.forwardRef<React.ElementRef<typeof Link>, ListItemProps>(
  ({ className, title, children, href, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            ref={ref}
            href={href}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";

// Define the type for the navigation items
interface NavItem {
  title: string;
  icon?: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
  href?: string;
  description?: string;
  links?: {
    href: string;
    title: string;
    icon?: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    description?: string;
    links?: {
      href: string;
      title: string;
      description?: string;
    }[];
  }[];
}

const mainNavItems: NavItem[] = [
  {
    title: "Home",
    icon: Home,
    href: "/",
    description: "Return to the EDM homepage.",
  },
  {
    title: "About",
    icon: Info,
    links: [
      { href: "/about", title: "Our Story & Foundations", description: "EDM's history, beliefs, and structure in Sierra Leone and Oregon." },
      { href: "/about/what-we-believe", title: "What We Believe", description: "Our core doctrinal statements." },
      { href: "/events", title: "Events", description: "Upcoming and past events organized by EDM." },
      { href: "/international-board", title: "International Board", description: "Meet our leadership team for Sierra Leone and Oregon." },
    ],
  },
  {
    title: "The Mission",
    icon: Target,
    href: "/the-mission",
    description: "Our overall mission, vision, and goals for Sierra Leone and Oregon.",
  },
  {
    title: "Ministries",
    icon: HeartHandshake,
    links: [
      { href: "/ministries", title: "Ministries Overview", description: "Explore all EDM ministry areas." },
      { href: "/ministries/evangelism", title: "Evangelism", description: "Sharing the Gospel through various outreaches in Sierra Leone." },
      { href: "/ministries/discipleship", title: "Discipleship", description: "Training believers to become strong and mature in their faith." },
      { href: "/ministries/education", title: "Education", description: "Providing quality education to children." },
      { href: "/ministries/missions-outreach", title: "Missions Outreach", description: "Local and international mission efforts." },
    ],
  },
  {
    title: "Get Involved",
    icon: Users,
    links: [
      { href: "/get-involved", title: "Get Involved Overview", description: "Discover ways to contribute to EDM." },
      { href: "/get-involved/volunteer", title: "Volunteer", description: "Offer your time and skills to support our work." },
      { href: "/get-involved/partner", title: "Partner", description: "Learn about partnership opportunities with individuals, churches, and organizations." },
      { href: "/get-involved/prayer", title: "Prayer", description: "Join us in prayer for our ministry and the people of Sierra Leone." },
    ],
  },
  {
    title: "Donate",
    icon: DollarSign,
    href: "/donate",
    description: "Support our work financially in Sierra Leone and Oregon.",
  },
  {
    title: "News & Media",
    icon: Newspaper,
    links: [
      { href: "/news", title: "News & Updates", description: "Latest articles, reports, and testimonies from Sierra Leone." },
      { href: "/gallery", title: "Media Gallery", description: "View photos and videos from our events and ministries." },
    ],
  },
  {
    title: "Contact",
    icon: Phone,
    href: "/contact",
    description: "Reach out to EDM teams in Sierra Leone or Oregon.",
  },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOutAuth, loading } = useAuth();
  const [isClient, setIsClient] = useState(false);
  const typedUser = user as AuthUserType | null;

  const getInitials = (name?: string | null, email?: string | null) => {
    if (name) {
      const parts = name.split(" ");
      return (parts[0]?.[0] + (parts[1]?.[0] || parts[0]?.[1] || "")).toUpperCase();
    }
    return email?.[0].toUpperCase() || "U";
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex items-center gap-2">
            <div className="h-8 w-8 md:h-10 md:w-10 relative">
              <Image
                src="https://code-alpha-image-gallary.vercel.app/edm-logo.png"
                alt="EDM Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-xl font-bold">EDM</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex flex-1 justify-center">
          <NavigationMenu>
            <NavigationMenuList className="flex items-center gap-1">
              {mainNavItems.map((item) =>
                item.links ? (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuTrigger className="h-10 px-4 hover:bg-primary/10 hover:text-primary data-[state=open]:bg-primary/10 data-[state=open]:text-primary">
                      <div className="flex items-center gap-1">
                        {isClient && item.icon && <item.icon size={16} />}
                        {item.title}
                      </div>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[400px] lg:w-[500px] bg-white p-4 rounded-md border shadow-lg">
                        <ul className="grid gap-3 md:grid-cols-2">
                          {item.links.map((link) => (
                            <ListItem
                              key={link.title}
                              title={link.title}
                              href={link.href}
                            >
                              {link.description}
                            </ListItem>
                          ))}
                        </ul>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuLink asChild>
                      <Link href={item.href || "#"} className={cn(navigationMenuTriggerStyle(), "h-10 px-4 hover:bg-primary/10 hover:text-primary")}>
                        <div className="flex items-center gap-1">
                          {isClient && item.icon && <item.icon size={16} />}
                          {item.title}
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden lg:flex items-center gap-2">
          {!loading && typedUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-9 w-9 rounded-full hover:bg-primary/10 hover:text-primary">
                  <Avatar>
                    <AvatarImage src={typedUser.photoURL || undefined} />
                    <AvatarFallback className="text-inherit">{getInitials(typedUser.name, typedUser.email)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white">
                <DropdownMenuLabel>{typedUser.name || "User"}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary">
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary">
                  <Link href="/dashboard/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary">
                  <Link href="/dashboard/settings">Settings</Link>
                </DropdownMenuItem>
                {(() => {
                  const allowedAdminRoles = ["SUPER_ADMIN", "ADMIN", "EDITOR", "VIEWER"];
                  if (typedUser?.role && allowedAdminRoles.includes(typedUser.role)) {
                    return (
                      <DropdownMenuItem asChild className="hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary">
                        <Link href="/admin">Admin Dashboard</Link>
                      </DropdownMenuItem>
                    );
                  }
                  return null;
                })()}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOutAuth} className="hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary">Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-9 w-9 rounded-full hover:bg-primary/10 hover:text-primary">
                  <Avatar>
                    <AvatarFallback className="text-inherit">
                      <User size={18} />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white">
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary">
                  <Link href="/auth/login">Sign In</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary">
                  <Link href="/auth/signup">Create Account</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <span className="sr-only">Toggle mobile menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 overflow-y-auto sm:max-w-sm">
              <SheetHeader className="mb-6">
                <SheetTitle>
                  <Link
                    href="/"
                    className="flex items-center gap-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="flex items-center gap-2">
                      <Image src="https://code-alpha-image-gallary.vercel.app/edm-logo.png" alt="EDM Logo" width={32} height={32} className="h-8 w-8" />
                      <span className="text-lg font-bold">EDM</span>
                    </span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4">
                {mainNavItems.map((item: NavItem, i) => (
                  <div key={i}>
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="flex items-center gap-2 text-lg font-semibold whitespace-nowrap"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className="flex items-center gap-2">
                          {isClient && item.icon && <item.icon size={20} />}
                          {item.title}
                        </span>
                      </Link>
                    ) : (
                      <>
                        <h3 className="flex items-center gap-2 text-lg font-semibold mb-2">
                          {isClient && item.icon && <item.icon size={16} />}
                          {item.title}
                        </h3>
                        <ul className="ml-4 space-y-2 border-l pl-4">
                          {item.links && item.links.map((link, j) => (
                            <div key={j}>
                              <Link
                                href={link.href}
                                className="text-base font-medium hover:text-primary transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                <span className="flex items-center">
                                  {isClient && link.icon && <link.icon size={16} className="inline mr-2" />}
                                  {link.title}
                                </span>
                              </Link>
                              {link.links && (
                                <ul className="ml-4 space-y-2 border-l pl-4 mt-2">
                                  {link.links.map((subLink, k) => (
                                    <li key={k}>
                                      <Link
                                        href={subLink.href}
                                        className="text-sm hover:text-primary transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                      >
                                        {subLink.title}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                ))}
              </nav>
              {/* Authentication Buttons for Mobile */}
              <div className="flex flex-col gap-4 mt-6">
                {!loading && typedUser ? (
                  <Link href="/dashboard">
                    <Button variant="default" className="w-full" onClick={() => setMobileMenuOpen(false)}>Dashboard</Button>
                  </Link>
                ) : (
                  <div className="space-y-2">
                    <Link href="/auth/login">
                      <Button variant="outline" className="w-full hover:bg-primary/10 hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/auth/signup">
                      <Button variant="default" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                        Create Account
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}