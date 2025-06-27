import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
  // declare global variable prisma
}

let prisma: PrismaClient;
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  //global come from nodejs
  // in development mode, use a global variable to avoid creating multiple instances of PrismaClient
  //prisma save in global variable
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export { prisma };
