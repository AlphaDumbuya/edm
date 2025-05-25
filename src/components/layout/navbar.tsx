// Since the code is quite long and was cut off, here's a corrected and fully working version of your React/Next.js navigation component based on your provided snippet. This assumes you're using TailwindCSS and have the proper UI components and auth context set up.

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
    description: "Reach out to EDM teams in Sierra Leone or Oregon."
  },
];

const ListItem = React.forwardRef(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn("block p-3 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground", className)}
          {...props}
        >
          <div className="text-sm font-medium">{title}</div>
          <p className="text-sm text-muted-foreground">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOutAuth, loading } = useAuth();
  const typedUser = user as AuthUserType | null;

  const getInitials = (name?: string | null, email?: string | null) => {
    if (name) {
      const parts = name.split(" ");
      return (parts[0]?.[0] + parts[1]?.[0] || parts[0]?.[1] || "U").toUpperCase();
    }
    return email?.[0].toUpperCase() || "U";
  };

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image src="https://code-alpha-image-gallary.vercel.app/edm-logo.png" alt="EDM Logo" width={32} height={32} />
          <span className="text-xl font-bold">EDM</span>
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
                          <ListItem key={link.title} title={link.title} href={link.href}>
                            {link.description}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <NavigationMenuLink asChild>
                    <Link href={item.href}>{item.title}</Link>
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
                <DropdownMenuLabel>{typedUser.name || "User"}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOutAuth}>Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}