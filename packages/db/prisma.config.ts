import { defineConfig, env } from "@prisma/config";

const directUrl = process.env.DIRECT_DATABASE_URL ?? process.env.DIRECT_URL;

export default defineConfig({
  schema: "./prisma/schema.prisma",
  engine: "classic",
  datasource: {
    url: env("DATABASE_URL"),
    ...(directUrl ? { directUrl } : {}),
  },
});
