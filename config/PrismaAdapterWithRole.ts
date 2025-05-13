// app/lib/config/PrismaAdapterWithRole.ts
import { PrismaClient } from "@prisma/client";
import { Adapter } from "next-auth/adapters";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const PrismaAdapterWithRole = (prisma: PrismaClient): Adapter => {
  const baseAdapter = PrismaAdapter(prisma);

  return {
    ...baseAdapter,
    async getUser(id: string) {
      const user = await prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          role: true,
          createdAt: true,
        },
      });

      if (!user) return null;

      return {
        id: user.id,
        name: user.name,
        email: user.email || "",
        emailVerified: user.createdAt,
        image: user.image,
        role: user.role || "GUEST",
      };
    },
    // Ensure other adapter methods are correctly implemented
    async createUser(data) {
      const user = await prisma.user.create({
        data: {
          email: data.email,
          name: data.name,
          image: data.image,
          role: data.role || "GUEST",
          isGoogleUser: false, // Default for non-Google users
        },
      });
      return {
        id: user.id,
        email: user.email || "",
        name: user.name,
        image: user.image,
        emailVerified: user.createdAt,
        role: user.role,
      };
    },
    async updateUser(data) {
      const user = await prisma.user.update({
        where: { id: data.id },
        data: {
          email: data.email,
          name: data.name,
          image: data.image,
          role: data.role,
        },
      });
      return {
        id: user.id,
        email: user.email || "",
        name: user.name,
        image: user.image,
        emailVerified: user.createdAt,
        role: user.role,
      };
    },
    // Add other required adapter methods if needed (e.g., getSessionAndUser, deleteUser)
  };
};
