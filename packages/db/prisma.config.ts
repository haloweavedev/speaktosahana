import "dotenv/config";
import { defineConfig, env } from "prisma/config";

const directUrl = process.env.DIRECT_DATABASE_URL ?? process.env.DIRECT_URL;
const databaseUrl = directUrl ?? env("DATABASE_URL");
const shadowDatabaseUrl = process.env.SHADOW_DATABASE_URL;

export default defineConfig({
  schema: "./prisma/schema.prisma",
  datasource: {
    url: databaseUrl,
    ...(shadowDatabaseUrl ? { shadowDatabaseUrl } : {}),
  },
});
