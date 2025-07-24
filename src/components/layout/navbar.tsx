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
  ChevronDown,
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
interface ListItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string;
  title: string;
  children: React.ReactNode;
  href: string;
}

const ListItem = React.forwardRef<React.ElementRef<typeof Link>, ListItemProps>(
  ({ className, title, children, href, ...props }, ref) => {
    return (
      <li>
        <Link
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-popover-foreground bg-popover border border-dashed border-primary", // force visible text and border
            className
          )}
          href={href}
          {...props}>
          <span>
            <div className="text-sm font-medium leading-none text-popover-foreground">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-popover-foreground">{children}</p>
          </span>
        </Link>
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
      { href: "/about", title: "Our Story", description: "EDM's history, beliefs, and structure." },
      { href: "/about/what-we-believe", title: "Beliefs", description: "Our core doctrinal statements." },
      { href: "/events", title: "Events", description: "Upcoming and past events." },
      { href: "/international-board", title: "Board", description: "Meet our leadership team." },
    ],
  },
  {
    title: "The Mission",
    icon: Target,
    href: "/the-mission",
    description: "Our mission, vision, and goals.",
  },
  {
    title: "Ministries",
    icon: HeartHandshake,
    links: [
      { href: "/ministries", title: "Overview", description: "Explore all ministries." },
      { href: "/ministries/evangelism", title: "Evangelism", description: "Sharing the Gospel." },
      { href: "/ministries/discipleship", title: "Discipleship", description: "Training believers." },
      { href: "/ministries/education", title: "Education", description: "Quality education." },
      { href: "/ministries/missions-outreach", title: "Outreach", description: "Mission efforts." },
    ],
  },
  {
    title: "Get Involved",
    icon: Users,
    links: [
      { href: "/get-involved", title: "Overview", description: "Ways to contribute." },
      { href: "/get-involved/volunteer", title: "Volunteer", description: "Offer your time and skills." },
      { href: "/get-involved/partner", title: "Partner", description: "Partnership opportunities." },
      { href: "/get-involved/prayer", title: "Prayer", description: "Join us in prayer." },
    ],
  },
  {
    title: "Donate",
    icon: DollarSign,
    href: "/donate",
    description: "Support our work.",
  },
  {
    title: "News & Media",
    icon: Newspaper,
    links: [
      { href: "/news", title: "News", description: "Latest articles and reports." },
      { href: "/gallery", title: "Gallery", description: "Photos and videos." },
    ],
  },
  {
    title: "Contact",
    icon: Phone,
    href: "/contact",
    description: "Reach out to EDM.",
  },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOutAuth, loading } = useAuth();
  const [isClient, setIsClient] = useState(false);
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const typedUser = user as AuthUserType | null;

  const getInitials = (name?: string | null, email?: string | null) => {
    if (name) {
      const parts = name.split(" ");
      return (parts[0]?.[0] + (parts[1]?.[0] || parts[0]?.[1] || "")).toUpperCase();
    }
    return email?.[0].toUpperCase() || "U";
  };

  const toggleMenu = (idx: number) => {
    setOpenMenu((prev) => (prev === idx ? null : idx));
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <header className="bg-background shadow sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo + EDM text always together */}
        <Link href="/" className="flex items-center gap-2 min-w-max">
          <div className="h-8 w-8 md:h-10 md:w-10 relative">
            <Image
              src="https://code-alpha-image-gallary.vercel.app/edm-logo.png"
              alt="EDM Logo"
              fill
              sizes="(max-width: 768px) 32px, 40px"
              className="object-contain"
            />
          </div>
          <span className="text-xl font-bold ml-1 md:ml-2">EDM</span>
        </Link>

        {/* Desktop Nav - Improved Spacing and Alignment */}
        <nav className="hidden lg:flex flex-1 items-center justify-center gap-2">
          {mainNavItems.map((item, i) => (
            <div
              key={i}
              className="relative"
              onMouseEnter={() => setOpenDropdown(i)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              {item.links ? (
                <>
                  <button
                    className="flex items-center gap-1 px-2 py-1 rounded-md text-base font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground transition-colors"
                    type="button"
                    tabIndex={0}
                    aria-expanded={openDropdown === i}
                  >
                    {item.icon && <item.icon size={16} className="inline-block" />}
                    <span>{item.title}</span>
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  {openDropdown === i && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full w-72 bg-popover text-popover-foreground rounded-lg shadow-lg border border-border transition-all z-50">
                      <ul className="py-2">
                        {item.links.map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              className="block px-4 py-3 rounded-md text-base font-medium hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
                              onClick={() => setOpenDropdown(null)}>
                              <div className="font-semibold">{link.title}</div>
                              <div className="text-sm text-muted-foreground">{link.description}</div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href || '#'}
                  className="px-2 py-1 rounded-md text-base font-medium hover:bg-accent hover:text-accent-foreground transition-colors">
                  {item.icon && <item.icon size={16} className="inline-block mr-1" />}
                  {item.title}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Desktop Auth Buttons/User */}
        <div className="hidden lg:flex items-center gap-2 min-w-max">
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
                    onClick={() => setMobileMenuOpen(false)}>
                    <Image src="https://code-alpha-image-gallary.vercel.app/edm-logo.png" alt="EDM Logo" width={32} height={32} className="h-8 w-8" />
                    <span className="text-lg font-bold">EDM</span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4">
                {mainNavItems.map((item: NavItem, i) => (
                  <div key={i}>
                    {item.links ? (
                      <>
                        <button
                          className="flex items-center gap-2 text-lg font-semibold mb-2 w-full justify-between focus:outline-none"
                          onClick={() => toggleMenu(i)}
                          aria-expanded={openMenu === i}
                        >
                          <span className="flex items-center gap-2">
                            {isClient && item.icon && <item.icon size={16} />}
                            {item.title}
                          </span>
                          <ChevronDown className={`transition-transform ${openMenu === i ? "rotate-180" : "rotate-0"}`} size={18} />
                        </button>
                        {openMenu === i && (
                          <ul className="ml-4 space-y-2 border-l pl-4">
                            {item.links.map((link, j) => (
                              <div key={j}>
                                <Link
                                  href={link.href}
                                  className="text-base font-medium hover:text-primary transition-colors"
                                  onClick={() => setMobileMenuOpen(false)}>
                                  {isClient && link.icon && <link.icon size={16} className="inline mr-2" />}
                                  {link.title}
                                </Link>
                                {link.links && (
                                  <ul className="ml-4 space-y-2 border-l pl-4 mt-2">
                                    {link.links.map((subLink, k) => (
                                      <li key={k}>
                                        <Link
                                          href={subLink.href}
                                          className="text-sm hover:text-primary transition-colors"
                                          onClick={() => setMobileMenuOpen(false)}>
                                          {subLink.title}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : item.href ? (
                      <Link
                        href={item.href}
                        className="flex items-center gap-2 text-lg font-semibold whitespace-nowrap"
                        onClick={() => setMobileMenuOpen(false)}>
                        <span className="flex items-center gap-2">
                          {isClient && item.icon && <item.icon size={20} />}
                          {item.title}
                        </span>
                      </Link>
                    ) : null}
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
                  <div className="space-y-3">
                    <Link href="/auth/login" className="block">
                      <Button variant="outline" className="w-full h-10 text-sm hover:bg-primary/10 hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/auth/signup" className="block">
                      <Button variant="default" className="w-full h-10 text-sm" onClick={() => setMobileMenuOpen(false)}>
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