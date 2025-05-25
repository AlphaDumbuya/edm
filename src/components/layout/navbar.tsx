"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import {
  Home,
  Info,
  Target,
  HeartHandshake,
  Users,
  DollarSign,
  Newspaper,
  Phone,
} from "lucide-react";

import { Button } from "@/components/ui/button";
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

const mainNavItems = [
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
    ],
  },
  {
    title: "Get Involved",
    icon: Users,
    links: [
      { href: "/get-involved", title: "Get Involved Overview", description: "Discover ways to contribute to EDM." },
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
    ],
  },
  {
    title: "Contact",
    icon: Phone,
    href: "/contact",
    description: "Reach out to EDM teams in Sierra Leone or Oregon.",
  },
];

interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
  title: string;
  children: React.ReactNode;
}

const ListItem = React.forwardRef<React.ElementRef<"a">, ListItemProps>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block p-3 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium">{title}</div>
            <p className="text-sm text-muted-foreground">{children}</p>
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
      const parts = name.split(" ");
      return (parts[0]?.[0] + (parts[1]?.[0] || parts[0]?.[1] || "")).toUpperCase();
    }
    return email?.[0].toUpperCase() || "U";
  };

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex items-center gap-2">
            <Image src="https://code-alpha-image-gallary.vercel.app/edm-logo.png" alt="EDM Logo" width={40} height={40} className="h-10 w-10" />
            <span className="text-xl font-bold">EDM</span>
          </span>
        </Link>

        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {mainNavItems.map((item, i) => (
              <NavigationMenuItem key={i}>
                {item.links ? (
                  <>
                    <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-4 w-[400px] md:grid-cols-2">
                        {item.links.map((link) => (
                          <Link
                            key={link.title}
                            href={link.href}
                            className={cn("block p-3 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground")}
>
                            <ListItem title={link.title} >
 {link.description}
 </ListItem>
                          </Link>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <NavigationMenuLink asChild >
                    <Link href={item.href!} >
                      {item.title}
                    </Link>
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden lg:flex items-center gap-2">
          {!loading && typedUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-9 w-9 rounded-full">
                  <Avatar>
                    <AvatarImage src={typedUser.photoURL || undefined} />
                    <AvatarFallback>{getInitials(typedUser.name, typedUser.email)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {/* User Info */}
                <DropdownMenuLabel>{typedUser.name || "User"}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
 <Link href="/dashboard">
 Dashboard
 </Link>
 </DropdownMenuItem>
 <DropdownMenuItem asChild>
 <Link href="/dashboard/profile">
 Profile
 </Link>
 </DropdownMenuItem>
 <DropdownMenuItem asChild>
 <Link href="/dashboard/settings">
 Settings
 </Link>
 </DropdownMenuItem>
                {/* Admin Dashboard Link (Conditional) */}
                {(() => {
                  const allowedAdminRoles = ['SUPER_ADMIN', 'ADMIN', 'EDITOR', 'VIEWER'];
                  if (typedUser?.role && allowedAdminRoles.includes(typedUser.role)) {
                    return (
                      <DropdownMenuItem asChild>
                        <Link href="/admin">Admin Dashboard</Link>
                      </DropdownMenuItem>
                    );
                  }
                })()}
 <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOutAuth}>Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : ( // Render Login and Sign Up buttons when not logged in
            (<>
              <Link href="/login" legacyBehavior>
                <Button variant="outline">Login</Button>
              </Link>
              <Link href="/auth/signup" legacyBehavior>
                <Button variant="default">Sign Up</Button>
              </Link>
            </>)
          )}
        </div>

        {/* Mobile Menu Trigger */}
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
                    legacyBehavior>
                    <Image src="https://code-alpha-image-gallary.vercel.app/edm-logo.png" alt="EDM Logo" width={32} height={32} className="h-8 w-8" />
                    <span className="text-lg font-bold">EDM</span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4">
                {mainNavItems.map((item, i) => (
                  <div key={i} className="space-y-2">
 {item.href && (
 <Link
 href={item.href}
 className="text-base font-medium hover:text-primary transition-colors flex items-center gap-2"
 onClick={() => setMobileMenuOpen(false)}
 >
 {item.icon && <item.icon size={18} />}
 {item.title}
 </Link>
 )}
                    {item.links && (
                      <div>
                        <h4 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-2">
                          {item.icon && <item.icon size={16} />}
                          {item.title}
                        </h4>
                        <ul className="ml-4 space-y-2 border-l pl-4">
                          {item.links?.map((link) => (
                            <li key={link.href}>
                              <Link
                                href={link.href}
                                className="text-sm hover:text-primary transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                                legacyBehavior>
                                {link.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
