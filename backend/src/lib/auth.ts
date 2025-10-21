import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaClient } from '@prisma/client';
import type { BetterAuthOptions } from 'better-auth';
import { config } from 'dotenv';
import { resolve } from 'path';

// Charger .env.local en PREMIER (avant tout autre import)
config({ path: resolve(process.cwd(), '.env.local') });

const prisma = new PrismaClient();

const authConfig = {
  database: prismaAdapter(prisma, { provider: 'postgresql' as const }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // à mettre sur true en production
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      redirectURI: `${process.env.BETTER_AUTH_URL}/api/auth/callback/google`,
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 jours
    updateAge: 60 * 60 * 24, // Met à jour la session tous les jours
  },
  trustedOrigins: [
    'http://localhost:3000', // Frontend
    'http://localhost:3001', // Backend
  ],
  advanced: {
    // Permet les cookies cross-origin en dev
    crossSubDomainCookies: {
      enabled: true,
    },
    // Configuration des cookies pour le dev
    cookiePrefix: 'better-auth',
  },
} satisfies BetterAuthOptions;

export const auth: ReturnType<typeof betterAuth> = betterAuth(authConfig);
