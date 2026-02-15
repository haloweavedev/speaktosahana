import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../prisma/generated/prisma";
import type { PoolConfig } from "pg";
import { Pool } from "pg";

const connectionString =
  process.env.DIRECT_DATABASE_URL || process.env.DIRECT_URL || process.env.DATABASE_URL;

// Supabase pooler uses certs that Node's TLS rejects by default.
// The pg Pool `ssl` option only covers the Pool layer — the @prisma/adapter-pg
// adapter opens its own TLS connections, so we must relax it at the process level.
if (process.env.PRISMA_STRICT_SSL !== "true") {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

const prismaClientSingleton = () => {
  if (!connectionString) {
    throw new Error("DATABASE_URL (or DIRECT_URL/DIRECT_DATABASE_URL) must be set for Prisma.");
  }

  const strictSsl = process.env.PRISMA_STRICT_SSL === "true";

  if (process.env.LOG_PRISMA_CONNECTION !== "false") {
    try {
      const url = new URL(connectionString);
      const display = `${url.hostname}:${url.port || "5432"}${url.pathname}`;
      console.info(`[prisma] init adapter host=${display} ssl=${strictSsl ? "strict" : "relaxed"}`);
    } catch {
      // ignore parsing issues to avoid blocking client creation
    }
  }

  const poolConfig: PoolConfig = {
    connectionString,
    ssl: strictSsl ? undefined : { rejectUnauthorized: false },
  };

  const pool = new Pool(poolConfig);

  const adapter = new PrismaPg(pool);

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

export * from "../prisma/generated/prisma";

export async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries = 3,
  delay = 1000
): Promise<T> {
  let lastError: unknown;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error: any) {
      lastError = error;
      // Retry on common pooler/connection errors
      if (
        error?.code === "P1001" || // Can't reach database server
        error?.code === "P2024" || // Connection timed out
        error?.message?.includes("Can't reach database")
      ) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }
      throw error;
    }
  }
  throw lastError;
}
