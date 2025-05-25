import "next-auth";
import { UserRole } from "@prisma/client"; // Assuming UserRole is in your Prisma client types

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      role: UserRole;
      // Add any other custom properties you have on your user object
    } & DefaultSession["user"];
  }

  /**
   * The shape of the user object returned in the OAuth providers' `account` and `profile` callbacks.
   */
  interface User {
    role: UserRole;
    // Add any other custom properties you have on your user object
  }
}