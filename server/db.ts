import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

// For this demo app, we don't strictly require a real DB connection if we are using MemStorage.
// However, to keep the project structure valid, we include this.
// If DATABASE_URL is missing, we won't fail immediately, but db usage will fail.
const connectionString = process.env.DATABASE_URL || "postgres://user:pass@localhost:5432/db";

export const pool = new Pool({ connectionString });
export const db = drizzle(pool, { schema });
