import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  // Use let instead of var
  let prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

// Use globalThis instead of global
const prisma = globalThis.prisma ?? prismaClientSingleton();
export default prisma;

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}
