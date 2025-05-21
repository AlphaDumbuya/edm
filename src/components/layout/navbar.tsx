
'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  Menu, X, UserCircle, Info, HeartHandshake, DollarSign, Newspaper,
  Phone, Target, Users, ExternalLink, BookOpenText, Briefcase, ArrowRight,
  LogIn, UserPlus, LayoutDashboard, LogOut, GraduationCap, School,
} from 'lucide-react'; // Added Target and Users
import React, { useState } from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/auth-context';
import { cn } from '@/lib/utils';

interface NavLink {
  href: string;
  title: string;
  description: string;
}

interface NavItemWithLinks {
  title: string;
  icon: React.ForwardRefExoticComponent<any>;
  links: NavLink[];
  href?: undefined; // Ensure href is not present for dropdown items
}

interface NavItemSingleLink {
  title: string;
  icon: React.ForwardRefExoticComponent<any>;
  href: string;
  description: string;
  links?: undefined; // Ensure links is not present for single link items
}

type MainNavItem = NavItemWithLinks | NavItemSingleLink;

const mainNavItems: MainNavItem[] = [
  {
    title: 'About',
    icon: Info,
    links: [
      { href: '/about', title: 'Our Story & Foundations', description: "EDM's history, beliefs, and structure in Sierra Leone and Oregon." },
      { href: '/about/what-we-believe', title: 'What We Believe', description: 'Our core doctrinal statements.' },
      { href: '/international-board', title: 'International Board', description: 'Meet our leadership team for Sierra Leone and Oregon.' },
    ],
  },
  {
    title: 'The Mission',
    icon: Target, // This icon was missing from imports
    href: '/the-mission',
    description: 'Our overall mission, vision, and goals for Sierra Leone and Oregon.',
  },
  {
    title: 'Ministries',
    icon: HeartHandshake,
    links: [
      { href: '/ministries', title: 'Ministries Overview', description: 'Explore all EDM ministry areas.' },
      { href: '/ministries/evangelism', title: 'Evangelism', description: 'Sharing the Gospel through various outreaches in Sierra Leone.' },
      { href: '/ministries/discipleship', title: 'Discipleship', description: 'Training believers to maturity in Sierra Leone.' },
      { href: '/ministries/missions-outreach', title: 'Missions Outreach', description: 'Church planting and community projects in Sierra Leone.' },
      { href: '/ministries/education', title: 'Education Overview', description: 'Our commitment to Christ-centered education.' },
      { href: '/ministries/education/marifa-school', title: 'EDM Marifa School', description: 'Operational secondary school in Rosortta Village, Sierra Leone.' },
    ],
  },
  {
    title: 'Get Involved',
    icon: Users, // This icon was missing from imports
    links: [
      { href: '/get-involved', title: 'Get Involved Overview', description: 'Discover ways to contribute to EDM.' },
      { href: '/get-involved/volunteer', title: 'Volunteer', description: 'Offer your time and skills for Sierra Leone or Oregon support.' },
      { href: '/get-involved/prayer', title: 'Prayer Wall', description: 'Join us in prayer for Sierra Leone and Oregon.' },
      { href: '/get-involved/partner', title: 'Partnerships', description: 'Collaborate with EDM for Sierra Leone and Oregon.' },
    ],
  },
  {
    title: 'Donate',
    icon: DollarSign,
    href: '/donate',
    description: 'Support our work financially in Sierra Leone and Oregon.',
  },
  {
    title: 'News & Media',
    icon: Newspaper,
    links: [
      { href: '/news', title: 'News & Updates', description: 'Latest articles, reports, and testimonies from Sierra Leone.' },
      { href: '/gallery', title: 'Media Gallery', description: 'Photos, videos, and resources from Sierra Leone and Oregon.' },
    ],
  },
  {
    title: 'Contact',
    icon: Phone,
    href: '/contact',
    description: 'Reach out to EDM teams in Sierra Leone or Oregon.'
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
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = 'ListItem';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user: rawUser, signOutAuth, loading } = useAuth();

  // Define user with a more specific type if possible, or keep as any for now
  const user = rawUser as {
    displayName?: string | null;
    photoURL?: string | null;
    email?: string | null;
    id?: string;
    [key: string]: any; // Allows for other properties if they exist
  } | null; // Add null explicitly if rawUser can be null

  const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

 return (
   <header className="bg-card shadow-md sticky top-0 z-50">
     <div className="container mx-auto px-4">
       <div className="flex items-center justify-between h-16 md:h-20">
         <Link
           href="/"
           className="flex items-center gap-2 hover:opacity-80 transition-opacity"
         >
           <span>
           <Image src="https://code-alpha-image-gallary.vercel.app/edm-logo.png" alt="EDM Logo" width={28} height={28} className="h-7 w-7 md:h-8 md:w-8" />
           <span className="text-xl md:text-2xl font-bold text-primary">EDM</span>
           </span>
         </Link>

         <div className="hidden lg:flex flex-grow items-center justify-center">
           <NavigationMenu>
             <NavigationMenuList>
               {mainNavItems.map((item, index) => {
                 const IconComponent = item.icon;
                 // Using index for the key as a robust alternative, combined with title for readability
                 const itemKey = `nav-item-${item.title || 'link'}-${index}`; 

                 if (item.links) {
                   return (
                     <NavigationMenuItem key={itemKey}>
                       <NavigationMenuTrigger className="flex items-center text-xs px-1.5 py-1 md:text-sm md:px-2 md:py-1.5">
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
                         <Link
                           href={item.href || '#'}
                           className={cn(navigationMenuTriggerStyle(), "flex items-center text-xs px-1.5 py-1 md:text-sm md:px-2 md:py-1.5")}
                         >
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
         </div>

         <div className="flex items-center gap-2">
           <div className="hidden lg:flex items-center gap-2">
             {loading ? (
               <div className="h-9 w-20 bg-muted rounded-md animate-pulse"></div>
             ) : user ? (
               <DropdownMenu>
                 <DropdownMenuTrigger asChild>
                   <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                     <Avatar className="h-9 w-9">
                       <AvatarImage src={user.photoURL || ''} alt={user.displayName || user.email || 'User'} />
                       <AvatarFallback>{getInitials(user.displayName || user.email)}</AvatarFallback>
                     </Avatar>
                   </Button>
                 </DropdownMenuTrigger>
                 <DropdownMenuContent className="w-56" align="end" forceMount>
                   <DropdownMenuLabel className="font-normal">
                     <div className="flex flex-col space-y-1">
                       <p className="text-sm font-medium leading-none truncate">{user.displayName || user.email}</p>
                       <p className="text-xs leading-none text-muted-foreground truncate">{user.email}</p>
                     </div>
                   </DropdownMenuLabel>
                   <DropdownMenuSeparator />
                   <DropdownMenuItem asChild>
                     <Link href="/dashboard">
                       <LayoutDashboard className="mr-2 h-4 w-4" />Dashboard
                     </Link>
                   </DropdownMenuItem>
                   <DropdownMenuItem asChild>
                     <Link href="/dashboard/profile">
                       <span>
                         <UserCircle className="mr-2 h-4 w-4" />Profile
                       </span>
                     </Link>
                   </DropdownMenuItem>
                   <DropdownMenuItem onClick={signOutAuth}>
                     <LogOut className="mr-2 h-4 w-4" /> Log out
                   </DropdownMenuItem>
                 </DropdownMenuContent>
               </DropdownMenu>
             ) : (
               <DropdownMenu>
                 <DropdownMenuTrigger asChild>
                   <Button variant="ghost" size="icon">
                     <UserCircle className="h-6 w-6" />
                     <span className="sr-only">User menu</span>
                   </Button>
                 </DropdownMenuTrigger>
                 <DropdownMenuContent align="end">
                   <DropdownMenuItem asChild>
                     <Link href="/auth/login">
                       <LogIn className="mr-2 h-4 w-4" />Login
                     </Link>
                   </DropdownMenuItem>
                   <DropdownMenuItem asChild>
                     <Link href="/auth/signup">
                       <span>
                         <UserPlus className="mr-2 h-4 w-4" />Sign Up
                       </span>
                     </Link>
                   </DropdownMenuItem>
                 </DropdownMenuContent>
               </DropdownMenu>
             )}
           </div>

           {/* Mobile Menu Trigger */}
           <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
             <SheetTrigger asChild className="lg:hidden">
               <Button variant="ghost" size="icon">
                 {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                 <span className="sr-only">Toggle menu</span>
               </Button>
             </SheetTrigger>
             <SheetContent side="left" className="w-3/4 sm:w-1/2 bg-card text-card-foreground p-0">
               <SheetHeader className="p-4 border-b">
                 <div className="flex items-center gap-2">
                   <Link
                     href='/'
                     className="flex items-center gap-2"
                     onClick={() => setMobileMenuOpen(false)}
                   >
                     <span>
                     <Image src="https://code-alpha-image-gallary.vercel.app/edm-logo.png" alt="EDM Logo" width={24} height={24} className="h-6 w-6" />
                     <SheetTitle className="text-lg font-bold text-primary">EDM</SheetTitle>
                     </span>
                   </Link>
                 </div>
               </SheetHeader>
               <nav className="flex flex-col p-4 space-y-2">
                 {mainNavItems.map((item, index) => {
                   const IconComponent = item.icon;
                   const itemKey = `mobile-nav-item-${item.title || 'link'}-${index}`;
                   if (item.links) {
                     return (
                       <div key={itemKey}>
                         <h4 className="font-semibold text-sm text-muted-foreground px-2 py-1 mt-2">{item.title}</h4>
                         {item.links.map(link => (
                           <Link
                             key={link.href}
                             href={link.href}
                             className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
                             onClick={() => setMobileMenuOpen(false)}
                           >
                             <ArrowRight className="h-4 w-4 text-primary/70" />
                             <span>{link.title}</span>
                           </Link>
                         ))}
                       </div>
                     );
                   } else if (item.href) {
                     return (
                       <Link
                         key={itemKey}
                         href={item.href}
                         className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
                         onClick={() => setMobileMenuOpen(false)}
                       >
                         {IconComponent && <IconComponent className="h-5 w-5 mr-2" />}
                         <span>{item.title}</span>
                       </Link>
                     );
                   }
                   return null;
                 })}
                 <DropdownMenuSeparator className="my-4" />
                 {user ? (
                   <>
                     <Link
                       href="/dashboard"
                       className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
                       onClick={() => setMobileMenuOpen(false)}
                     >
                       <LayoutDashboard className="h-5 w-5 mr-2" /> Dashboard
                     </Link>
                     <Button
                       variant="ghost"
                       className="w-full justify-start gap-3 px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 hover:text-destructive"
                       onClick={() => { signOutAuth(); setMobileMenuOpen(false); }}
                     >
                       <LogOut className="h-5 w-5 mr-2" /> Log Out
                     </Button>
                   </>
                 ) : (
                   <>
                     <Link
                       href="/auth/login"
                       className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
                       onClick={() => setMobileMenuOpen(false)}
                     >
                       <span>
                         <LogIn className="h-5 w-5 mr-2" /> Login
                       </span>
                     </Link>
                     <Link
                       href="/auth/signup"
                       className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
                       onClick={() => setMobileMenuOpen(false)}
                     >
                       <span>
                       <UserPlus className="h-5 w-5 mr-2" /> Sign Up
                       </span>
                     </Link>
                   </>
                 )}
               </nav>
             </SheetContent>
           </Sheet>
         </div>
       </div>
     </div>
   </header>
 );
}
