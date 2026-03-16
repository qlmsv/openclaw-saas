/**
 * Better Auth Configuration
 */

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  secret: process.env.BETTER_AUTH_SECRET || "your-secret-change-in-production",
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: process.env.TRUSTED_ORIGINS?.split(",") || ["http://localhost:3000"],
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3001",
  socialProviders: {
    github: { 
      clientId: process.env.GITHUB_CLIENT_ID as string, 
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string 
    },
    google: { 
      clientId: process.env.GOOGLE_CLIENT_ID as string, 
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string 
    }
  },
  plugins: [
    // Add plugins here (e.g., email, oauth, etc.)
  ],
  // Optional: Configure sign up / sign in
  advanced: {
    cookiePrefix: "openclaw",
  },
});

export default auth;
