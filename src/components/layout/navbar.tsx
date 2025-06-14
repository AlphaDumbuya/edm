
"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  UserCircle,
  Info,
  HeartHandshake,
  DollarSign,
  Newspaper,
  Phone,
  Target,
  Users,
  ExternalLink,
  BookOpenText,
  Briefcase,
  ArrowRight,
  LogIn,
  UserPlus,
  LayoutDashboard,
  LogOut,
  GraduationCap,
  School,
  Home,
  ChevronDown,
} from "lucide-react";

import React, { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
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
import { cn } from "@/lib/utils";

interface NavLink {
  href: string;
  title: string;
  description: string;
}

interface NavItemWithLinks {
  title: string;
  icon: React.ForwardRefExoticComponent<any>;
  links: NavLink[];
  href?: undefined;
}

interface NavItemSingleLink {
  title: string;
  icon: React.ForwardRefExoticComponent<any>;
  href: string;
  description: string;
  links?: undefined;
}

type MainNavItem = NavItemWithLinks | NavItemSingleLink;

const mainNavItems: MainNavItem[] = [
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
      { href: "/ministries/discipleship", title: "Discipleship", description: "Training believers to maturity in Sierra Leone." },
      { href: "/ministries/missions-outreach", title: "Missions Outreach", description: "Church planting and community projects in Sierra Leone." },
      { href: "/ministries/education", title: "Education Overview", description: "Our commitment to Christ-centered education." },
      { href: "/ministries/education/marifa-school", title: "EDM Marifa School", description: "Operational secondary school in Rosortta Village, Sierra Leone." },
    ],
  },
  {
    title: "Get Involved",
    icon: Users,
    links: [
      { href: "/get-involved", title: "Get Involved Overview", description: "Discover ways to contribute to EDM." },
      { href: "/get-involved/volunteer", title: "Volunteer", description: "Offer your time and skills for Sierra Leone or Oregon support." },
      { href: "/get-involved/prayer", title: "Prayer Wall", description: "Join us in prayer for Sierra Leone and Oregon." },
      { href: "/get-involved/partner", title: "Partnerships", description: "Collaborate with EDM for Sierra Leone and Oregon." },
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
      { href: "/gallery", title: "Media Gallery", description: "Photos, videos, and resources from Sierra Leone and Oregon." },
    ],
  },
  {
    title: "Contact",
    icon: Phone,
    href: "/contact",
    description: "Reach out to EDM teams in Sierra Leone or Oregon."
  },
];

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOutAuth, loading } = useAuth();
  const typedUser = user as AuthUserType | null;

  const getInitials = (name?: string | null, email?: string | null) => {
    if (name) {
      const names = name.split(' ');
      if (names.length > 1 && names[0] && names[names.length - 1]) {
        return (names[0][0] + names[names.length - 1][0]).toUpperCase();
      }
      if (names[0]) {
        return names[0].substring(0, 2).toUpperCase();
      }
    }
    if (email) {
      return email[0].toUpperCase();
    }
    return 'U';
  };

  return (
    <header className="bg-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Image src="https://code-alpha-image-gallary.vercel.app/edm-logo.png" alt="EDM Logo" width={28} height={28} className="h-7 w-7 md:h-8 md:w-8" />
            <span className="text-xl md:text-2xl font-bold text-primary">EDM</span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              {mainNavItems.map((item, index) => {
                const IconComponent = item.icon;
                const itemKey = `nav-item-${item.title || 'link'}-${index}`;

                if (item.links) {
                  return (
                    <NavigationMenuItem key={itemKey}>
                      <NavigationMenuTrigger className="flex items-center text-xs px-1.5 py-1 h-9 md:text-sm md:px-2 md:py-1.5">
                        {IconComponent && <IconComponent className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-1.5" />} {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                          {item.links.map((link) => (
                            <ListItem key={link.title} title={link.title} href={link.href}>
                              {link.description}
                            </ListItem>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  );
                } else {
                  return (
                    <NavigationMenuItem key={itemKey}>
                      <NavigationMenuLink asChild>
                        <Link href={item.href || '#'} className={cn(navigationMenuTriggerStyle(), "flex items-center text-xs px-1.5 py-1 h-9 md:text-sm md:px-2 md:py-1.5")}>
                          {IconComponent && <IconComponent className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-1.5" />}
                          {item.title}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  );
                }
              })}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Mobile Menu Trigger & Auth Buttons */}
          <div className="flex items-center gap-2">
            <div className="hidden lg:flex items-center gap-2">
              {!loading && (
                typedUser ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={typedUser.photoURL || undefined} alt={typedUser.name || typedUser.email || "User"} data-ai-hint="user avatar placeholder" />
                          <AvatarFallback>{getInitials(typedUser.name, typedUser.email)}</AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none truncate">{typedUser.name || "User"}</p>
                          <p className="text-xs leading-none text-muted-foreground truncate">
                            {typedUser.email}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard" className="flex items-center w-full">
                          <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard/profile" className="flex items-center w-full">
                          <UserCircle className="mr-2 h-4 w-4" /> Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={signOutAuth} className="flex items-center w-full cursor-pointer">
                        <LogOut className="mr-2 h-4 w-4" /> Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <>
                    <Link href="/auth/login" className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "text-xs md:text-sm")}>
                      <LogIn className="mr-1 h-4 w-4" />Log In
                    </Link>
                    <Link href="/auth/signup" className={cn(buttonVariants({ variant: "default", size: "sm" }), "text-xs md:text-sm")}>
                      <UserPlus className="mr-1 h-4 w-4" />Sign Up
                    </Link>
                  </>
                )
              )}
            </div>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="outline" size="icon">
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-3/4 sm:w-1/2 bg-card h-full overflow-y-auto">
                <SheetHeader className="mb-6 text-left">
                  <SheetTitle>
                    <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                      <Image src="https://code-alpha-image-gallary.vercel.app/edm-logo.png" alt="EDM Logo" width={24} height={24} className="h-6 w-6" />
                      <span className="text-lg font-bold text-primary">EDM</span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col space-y-2">
                  {mainNavItems.map((item, index) => {
                    const IconComponent = item.icon;
                    const itemKey = `mobile-nav-item-${item.title || 'link'}-${index}`;
                    if (item.links) {
                      return (
                        <div key={itemKey}>
                          <h4 className="px-2 py-1 text-sm font-semibold text-muted-foreground flex items-center">
                            {IconComponent && <IconComponent className="h-4 w-4 mr-2" />}
                            {item.title}
                          </h4>
                          <ul className="ml-4 space-y-1 border-l border-border pl-3">
                            {item.links.map((subLink) => (
                              <li key={subLink.title}>
                                <Link
                                  href={subLink.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="block rounded-md px-2 py-1.5 text-sm text-foreground hover:bg-accent hover:text-accent-foreground"
                                >
                                  {subLink.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    }
                    return (
                      <Link
                        key={itemKey}
                        href={item.href || '#'}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center rounded-md px-2 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
                      >
                        {IconComponent && <IconComponent className="h-5 w-5 mr-3" />}
                        {item.title}
                      </Link>
                    );
                  })}
                </nav>
                <div className="mt-auto pt-6 border-t border-border">
                  {!loading && (
                    typedUser ? (
                      <div className="space-y-2">
                         <div className="flex items-center px-2 py-1">
                            <Avatar className="h-9 w-9 mr-3">
                                <AvatarImage src={typedUser.photoURL || undefined} alt={typedUser.name || "User"} />
                                <AvatarFallback>{getInitials(typedUser.name, typedUser.email)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-sm font-medium leading-none truncate">{typedUser.name || "User"}</p>
                                <p className="text-xs leading-none text-muted-foreground truncate">{typedUser.email}</p>
                            </div>
                        </div>
                        <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="flex items-center rounded-md px-2 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground">
                            <LayoutDashboard className="mr-3 h-5 w-5" />Dashboard
                        </Link>
                        <Button variant="ghost" onClick={() => { signOutAuth(); setMobileMenuOpen(false); }} className="w-full justify-start flex items-center text-sm font-medium">
                          <LogOut className="mr-3 h-5 w-5" />Log Out
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)} className={cn(buttonVariants({ variant: "outline" }), "w-full justify-center")}>
                           <LogIn className="mr-2 h-4 w-4" />Log In
                        </Link>
                        <Link href="/auth/signup" onClick={() => setMobileMenuOpen(false)} className={cn(buttonVariants({ variant: "default" }), "w-full justify-center")}>
                           <UserPlus className="mr-2 h-4 w-4" />Sign Up
                        </Link>
                      </div>
                    )
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
