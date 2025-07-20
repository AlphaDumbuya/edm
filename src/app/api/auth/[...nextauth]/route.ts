import NextAuth from 'next-auth';
import type { NextAuthOptions, Session } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import type { RequestInternal } from 'next-auth';

// Define the role type based on your Prisma schema
type UserRole = 'ADMIN' | 'USER';

interface User {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  role: UserRole;
}
import CredentialsProvider from 'next-auth/providers/credentials';
import { findUserByEmail, verifyPassword } from '@/lib/db/users';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      role: UserRole;
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: UserRole;
  }
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET || process.env.BETTER_AUTH_SECRET,
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined,
        req: Pick<RequestInternal, "body" | "query" | "headers" | "method">
      ): Promise<User | null> {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error('Email and password are required');
          }

          const user = await findUserByEmail(credentials.email);

        console.log('User found:', !!user);
        if (user && user.hashedPassword) {
            console.log('User found and has hashedPassword');
            const isMatch = await verifyPassword(credentials.password, user.hashedPassword);
            console.log('Password verification result:', isMatch);

            if (isMatch) {
                console.log('Password matched. Returning user object.');
                // Create a new object with properties expected by the NextAuth User type
                // Return a user object that NextAuth.js can use
                // Exclude sensitive data like hashedPassword
                return {
                  id: user.id,
                  name: user.name || null,
                  email: user.email,
                  role: user.role || 'USER',
                  image: null
                } satisfies User;
            } else {
              console.error("createBlogPostAction: Password verification failed."); // Add error log for incorrect password
              console.log('Password did not match. Returning null.');
              // Return null for incorrect password
              return null;
            }
        } else {
          console.log('User not found or missing hashedPassword. Returning null.');
          // Return null if user is not found
          return null;
        }
        // If you return null then an error will be displayed advising the user to check their details.
      }
      // Add a catch block to handle unexpected errors
      catch (error) {
        console.error('Error in authorize:', error);
        return null;
      }
    }
    // End of authorize
    // End of CredentialsProvider
    })
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.role = token.role as UserRole;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.role = (user as User).role;
      }
      return token;
    }
  },
  session: {
    strategy: "jwt"
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };