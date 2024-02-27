import { PostgresClient, loadEnv } from "./deps.ts";
import * as utils from "./utils.ts";
import { log } from "./deps.ts";
import { initLog, discordLog } from "./logging.ts";

initLog();
try {
	await utils.ensureEnvs(["PSQL_USER", "PSQL_DB", "PSQL_HOST", "PSQL_PASS", "PSQL_PORT"]);
} catch(error) {
	discordLog.error(error);
	Deno.exit(1);
}

const client = new PostgresClient({
    user: Deno.env.get("PSQL_USER"),
    database: Deno.env.get("PSQL_DB"),
    hostname: Deno.env.get("PSQL_HOST"),
    password: Deno.env.get("PSQL_PASS"),
    port: parseInt(Deno.env.get("PSQL_PORT") || "5432"),
});
await client.connect();
type DiscordGuild = {
    guildId: bigint,
    guildName?: string,
    hasAlerts?: boolean,
    alertChannel?: bigint,
    accessibilityAlerts?: boolean,
    plannedAlerts?: boolean,
    routeIds?: string[],
}
type AlertRecord = {
    alertId: number,
    publishedTo?: number,
    headline?: string,
    shortDescription?: string,
    guid?: string,
}
type KVItem = {
    key: string,
    value: string
}

const initSchema = async () => {
    await client.queryArray(`
        CREATE TABLE IF NOT EXISTS guilds (
            guild_id BIGINT PRIMARY KEY,
            guild_name TEXT,
            has_alerts BOOLEAN,
            alert_channel BIGINT,
            accessibility_alerts BOOLEAN,
            planned_alerts BOOLEAN,
            route_ids TEXT[]
        );
    `);
    await client.queryArray(`
        CREATE TABLE IF NOT EXISTS alert_history (
            alert_id INTEGER PRIMARY KEY,
            published_to INTEGER,
            headline TEXT,
            short_description TEXT,
            guid TEXT
        );`);
    await client.queryArray(`
        CREATE TABLE IF NOT EXISTS kv_store (
            key TEXT PRIMARY KEY,
            value TEXT
        );`);
}
initSchema();
export const getGuild = async (id: bigint): Promise<DiscordGuild | null> => {
    const result = await client.queryObject({
        camelCase: true,
        text: `SELECT * FROM guilds WHERE guild_id = $1`,
        args: [id]
    });
    return result.rows[0] as DiscordGuild || null;   
}
export const setGuild = async (guild: DiscordGuild) => {
    await client.queryArray({
        text: `INSERT INTO guilds (guild_id, guild_name, has_alerts, alert_channel) 
                VALUES ($1, $2, $3, $4) 
                ON CONFLICT (guild_id) 
                DO UPDATE SET has_alerts = $3, alert_channel = $4`,
        args: [guild.guildId, guild.guildName, guild.hasAlerts, guild.alertChannel]
    }).catch(error => {
        // discordLog.error(`Error pushing guild to database: ${error}`);
        throw new Error("Error pushing guild to database");
    })
}

export const getKV = async (key: string): Promise<string | null> => {
    const result = await client.queryObject({
        text: `SELECT key, value FROM kv_store WHERE key = $1`,
        args: [key]
    });
    if(result.rowCount === 0) return null;
    return (result.rows[0] as KVItem).value;
}
export const setKV = async (key: string, value: string) => {
    await client.queryArray({
        text: `INSERT INTO kv_store (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = $2`,
        args: [key, value]
    });
}

export const subscribeToAlerts = async (guildID: bigint, channelID: bigint) => {
    await client.queryArray({
        text: `UPDATE guilds SET has_alerts = true, alert_channel = $1 WHERE guild_id = $2`,
        args: [channelID, guildID]
    }).catch(error => {
        discordLog.error("Error pushing updated guild to database", error);
    });
}
export const unsubscribeFromAlerts = async (guildID: bigint) => {
    await client.queryArray({
        text: `UPDATE guilds SET has_alerts = false, alert_channel = NULL WHERE guild_id = $1`,
        args: [guildID]
    }).catch(error => {
        discordLog.error("Error pushing updated guild to database", error);
    })
}

export const getSubscribers = async (): Promise<DiscordGuild[]> => {
    const res = await client.queryObject({
        camelCase: true,
        text: `SELECT * FROM guilds WHERE has_alerts = true`,
    });
    return res.rows as DiscordGuild[];
}

export const getAlerts = async (): Promise<AlertRecord[]> => {
    const res = await client.queryObject({
        camelCase: true,
        text: `SELECT * FROM alert_history`,
    });
    return res.rows as AlertRecord[];
}
export const getAlertPublished = async (alertId: number): Promise<boolean> => {
    const res = await client.queryObject({
        camelCase: true,
        text: `SELECT * FROM alert_history WHERE alert_id = $1`,
        args: [alertId]
    });
    return res.rows[0] ? true : false;
}

export const pushAlertToDatabase = async (alert: AlertRecord) => {
    await client.queryArray({
        text: `INSERT INTO alert_history (alert_id, published_to, headline, short_description, guid) VALUES ($1, $2, $3, $4, $5)`,
        args: [alert.alertId, alert.publishedTo, alert.headline, alert.shortDescription, alert.guid]
    }).catch(error => {
        discordLog.error("Error pushing alert to database", error);
    })
}