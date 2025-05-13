// app/lib/auth.ts
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import NextAuth, { type NextAuthConfig, User } from "next-auth";
import { compare, hash } from "bcrypt";

declare module "next-auth" {
  interface User {
    role: "GUEST" | "CUSTOMER_EMAIL" | "CUSTOMER_PHONE" | "OWNER_GUEST" | "OWNER_VERIFIED";
  }
}

const prisma = new PrismaClient();

export const authOptions: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  debug: true,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, request: Request): Promise<User | null> {
        console.log("CredentialsProvider: authorize called", {
          credentials,
          request: request.url,
        });
        if (!credentials?.email || !credentials?.password) {
          console.log("CredentialsProvider: Invalid or missing credentials");
          throw new Error("Missing or invalid email/password");
        }
        const email = credentials.email as string;
        const password = credentials.password as string;
        console.log("CredentialsProvider: Processing email", { email });

        const user = await prisma.user.findUnique({
          where: { email },
        });
        console.log("CredentialsProvider: User lookup result", {
          user: user ? { id: user.id, email: user.email } : null,
        });

        if (!user) {
          console.log("CredentialsProvider: User not found, creating new user");
          const hashedPassword = await hash(password, 10);
          const newUser = await prisma.user.create({
            data: {
              email,
              passwordHash: hashedPassword,
              role: "CUSTOMER_EMAIL",
              isGoogleUser: false,
            },
          });
          console.log("CredentialsProvider: New user created", {
            newUser: { id: newUser.id, email: newUser.email },
          });
          return {
            id: newUser.id,
            email: newUser.email!,
            name: newUser.name,
            image: newUser.image,
            role: newUser.role,
          };
        }

        if (user.isGoogleUser || !user.passwordHash) {
          console.log("CredentialsProvider: User is Google-only or no password set");
          throw new Error("Please use Google to sign in");
        }

        const isValid = await compare(password, user.passwordHash);
        console.log("CredentialsProvider: Password comparison result", { isValid });
        if (!isValid) {
          console.log("CredentialsProvider: Invalid credentials");
          throw new Error("Invalid credentials");
        }

        console.log("CredentialsProvider: User authenticated", {
          user: { id: user.id, email: user.email },
        });
        return {
          id: user.id,
          email: user.email!,
          name: user.name,
          image: user.image,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      console.log("Session callback called", { sessionUser: session.user, user });
      if (session.user) {
        session.user.id = user.id;
        session.user.role = user.role;
      }
      console.log("Session callback result", { session });
      return session;
    },
    async jwt({ token, user }) {
      console.log("JWT callback called", { token, user });
      if (user?.role) {
        token.role = user.role;
      }
      console.log("JWT callback result", { token });
      return token;
    },
    async signIn({ user, account, profile }) {
      console.log("SignIn callback called", { user, account, profile });
      if (account?.provider === "google") {
        console.log("SignIn: Google OAuth user", { userEmail: user.email, profile });
      }
      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
};

export const { auth, handlers, signIn, signOut } = NextAuth(authOptions);