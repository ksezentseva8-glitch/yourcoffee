import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export async function getUserByTelegramId(telegramId: number) {
  return prisma.user.findUnique({
    where: { telegramId },
    include: { preferences: true },
  });
}

export async function upsertUser(
  telegramId: number,
  data: {
    username?: string;
    firstName?: string;
    lastName?: string;
    photoUrl?: string;
    languageCode?: string;
  }
) {
  return prisma.user.upsert({
    where: { telegramId },
    update: data,
    create: {
      id: `user_${telegramId}`,
      telegramId,
      ...data,
    },
  });
}

export async function getMenuItems(category?: string) {
  return prisma.menuItem.findMany({
    where: {
      available: true,
      ...(category && { category }),
    },
  });
}

export function calculateLoyaltyLevel(totalSpent: number): string {
  if (totalSpent >= 50000) return "master";
  if (totalSpent >= 15000) return "expert";
  if (totalSpent >= 5000) return "regular";
  return "novice";
}
