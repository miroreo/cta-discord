import * as utils from "../utils.ts";
import postgres from "https://deno.land/x/postgresjs/mod.js";
import { drizzle } from "npm:drizzle-orm/postgres-js";
import { Guild, guilds } from "../../db/schema.ts";
import { eq } from "npm:drizzle-orm";
// import { drizzle } from 'https://deno.land/x/drizzle/postgres-';
await utils.ensureEnvs(["DATABASE_URL"]);
const queryClient = postgres(Deno.env.get("DATABASE_URL") as string);
const db = drizzle(queryClient);

const result: Guild[] = await db.select().from(guilds).where(
  eq(guilds.hasAlerts, true),
).execute();

console.log(result);

queryClient.end();
