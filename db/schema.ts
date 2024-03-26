import {
  bigint,
  boolean,
  integer,
  pgTable,
  text,
  varchar,
} from "npm:drizzle-orm/pg-core";

export const alertHistory = pgTable("alert_history", {
  alertId: integer("alert_id").primaryKey().notNull(),
  headline: text("headline"),
  shortDescription: text("short_description"),
  guid: text("guid"),
  publishedTo: integer("published_to"),
});

export const guilds = pgTable("guilds", {
  guildId: bigint("guild_id", { mode: "bigint" }).primaryKey().notNull(),
  guildName: text("guild_name"),
  hasAlerts: boolean("has_alerts"),
  alertChannel: bigint("alert_channel", { mode: "bigint" }),
  accessibilityAlerts: boolean("accessibility_alerts"),
  plannedAlerts: boolean("planned_alerts"),
  routeIds: text("route_ids").array(),
});
export type Guild = typeof guilds.$inferSelect;
export type NewGuild = typeof guilds.$inferInsert;

export const kvStore = pgTable("kv_store", {
  key: varchar("key").primaryKey().notNull(),
  value: text("value"),
});
