import { UserRole } from "@prisma/client";

declare module "next-auth" {
  interface User {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
    role: UserRole;
  }

  interface Session {
    user: {
      id: string;
      name: string | null;
      email: string;
      image: string | null;
      role: UserRole;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: UserRole;
  }
}
