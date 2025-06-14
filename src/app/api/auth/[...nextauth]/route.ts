import NextAuth, { type User } from 'next-auth';
// Import CredentialsProvider
import CredentialsProvider from 'next-auth/providers/credentials';


// Import your user finding and password verification functions
import { findUserByEmail, verifyPassword } from '@/lib/db/users'; // Assuming these functions exist

// Define a type for the user object from your database, including sensitive fields
interface DatabaseUser {
  id: string;
  name?: string | null;
  email: string; // Email should likely be required based on credentials
  hashedPassword: string; // hashedPassword should likely be required if you're checking it
  role?: string; // Include role if it's part of your user model
}
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g., "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted.
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials provided
        if (!credentials?.email || !credentials?.password) {
            return null; // Return null if credentials are missing
        }

        // Explicitly type the user from the database with the DatabaseUser type
        const user: DatabaseUser | null = await findUserByEmail(credentials.email);

        if (user && user.hashedPassword) {
            const isMatch = await verifyPassword(credentials.password, user.hashedPassword);
            if (isMatch) {
                // Create a new object with properties expected by the NextAuth User type
                // Return a user object that NextAuth.js can use
                // Exclude sensitive data like hashedPassword
                return { id: user.id, name: user.name, email: user.email, role: user.role } as User; // Include role if you have it
            } else {
              console.error("createBlogPostAction: Password verification failed."); // Add error log for incorrect password

              // Return null for incorrect password
              return null;
            }
        } else {
          // Return null if user is not found
          return null;
        }
        // If you return null then an error will be displayed advising the user to check their details.
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET, // Add secret
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };