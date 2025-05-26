import { prisma } from "@/lib/prisma";

interface GetLeadsParams {
  search?: string;
  page?: number;
  pageSize?: number;
  organizationId?: string;
}

export async function getLeads({
  search = "",
  page = 1,
  pageSize = 50,
  organizationId,
}: GetLeadsParams = {}) {
  const skip = (page - 1) * pageSize;

  const where = {
    ...(organizationId && { organizationId }),
    ...(search && {
      OR: [
        { phoneNumber: { contains: search, mode: "insensitive" as const } },
        { email: { contains: search, mode: "insensitive" as const } },
        {
          organization: {
            name: { contains: search, mode: "insensitive" as const },
          },
        },
        // Search in JSON data - you might need to adjust this based on your JSON structure
        { data: { path: ["name"], string_contains: search } },
      ],
    }),
  };
  const leads = await prisma.lead.findMany({
    where,
    include: {
      summary: true,
      organization: true,
      calls: {
        orderBy: { createdAt: "desc" },
        take: 1, // Only get the latest call for performance
      },
      cluster: true,
      keywords: true,
    },
    orderBy: { createdAt: "desc" },
    skip,
    take: pageSize,
  });

  return leads;
}
