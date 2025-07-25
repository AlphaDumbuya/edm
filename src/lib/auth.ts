import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./db/prisma";
import type { NextAuthOptions } from "next-auth";
import bcryptjs from "bcryptjs";
// This is a no-op comment to trigger a file refresh.

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  // Configure authentication methods
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
    sendResetPassword: async ({
      user,
      url,
      token,
    }: {
      user: { id: string; email: string };
      url: string;
      token: string;
    }) => {
      // Send reset password email
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/email/change-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user,
            url,
            token,
          }),
        }
      );
      if (!res.ok) {
        throw new Error("Failed to send reset password email");
      }
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      return data;
    },
    resetPasswordTokenExpiresIn: 3600, // 1 hour
    password: {
      hash: async (password: string) => {
        // Custom password hashing
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        if (!hashedPassword) {
          throw new Error("Failed to hash password");
        }
        return hashedPassword;
      },
      verify: async ({
        hash,
        password,
      }: {
        hash: string;
        password: string;
      }) => {
        // Custom password verification
        const isValid = await bcryptjs.compare(password, hash);
        if (!isValid) {
          throw new Error("Invalid password");
        }
        // Additional validation logic can be added here
        return isValid;
      },
    },
  },
  // Add user configuration to include isAdmin field
  user: {
    additionalFields: {
      isAdmin: {
        type: "boolean",
        default: false,
      },
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }) => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL}/api/email/confirm-email`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user,
              url,
              token,
            }),
          }
        );
        if (!res.ok) {
          throw new Error("Failed to send verification email");
        }
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        return data;
      } catch (error) {
        console.error("Error sending verification email:", error);
        throw new Error("Failed to send verification email");
      }
    },
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 3600, // 1 hour
  },
});
export const authOptions: NextAuthOptions = {
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role;
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    },
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        domain: "localhost", // Ensures cookie is sent for localhost in dev
        secure: false, // Set to true in production with HTTPS
      },
    },
  },
};