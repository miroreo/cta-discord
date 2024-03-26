import { Discord, drizzle, drizzlePostgres, postgres } from "../../deps.ts";
// import { PrismaClient } from "../../prisma/client/deno/edge.ts";
import * as utils from "../utils.ts";
import { Alert, getActiveAlerts } from "../cta/alerts.ts";
import { Guild } from "../../db/schema.ts";
import { guilds } from "../../db/schema.ts";
import { kvStore } from "../../db/schema.ts";
import { alertHistory } from "../../db/schema.ts";

await utils.ensureEnvs(["DATABASE_URL"]);
const queryClient = postgres(Deno.env.get("DATABASE_URL") as string);
const db = drizzlePostgres(queryClient);

export async function pollAlerts(b: Discord.Bot) {
  utils.log.info("Polling for alerts");
  const alerts = await getActiveAlerts({
    planned: true,
    accessibility: false,
    routes: ["red", "blue", "g", "brn", "p", "y", "pink", "org"],
  });
  if (!alerts || alerts.length === 0) {
    utils.log.info("No active alerts");
    return;
  }
  utils.log.info(`Found ${alerts.length} active alerts`);
  alerts.forEach(async (alert) => {
    try {
      await handleAlert(b, alert);
    } catch (e) {
      utils.log.error(e);
    }
  });
}

const pushAlert = async (b: Discord.Bot, alert: Alert) => {
  let published = 0;

  const servers: Guild[] = await db.select().from(guilds).where(
    drizzle.eq(guilds.hasAlerts, true),
  ).execute();

  await servers.forEach(async (sub) => {
    if (!sub.alertChannel) return;
    try {
      await b.helpers.sendMessage(sub.alertChannel, {
        embeds: [{
          author: {
            name: "CTA Alerts",
            iconUrl:
              "https://www.transitchicago.com/assets/1/16/DimRiderToolDesktop/quick-link-4.png?14576",
          },
          color: parseInt(alert.severityColor.replace("#", "0x")),
          title: alert.headline,
          description: alert.shortDescription,
          timestamp: new Date(alert.eventStart).valueOf(),
        }],
      });
      utils.log.info(
        `Published alert to ${sub.guildName} in #${sub.alertChannel}`,
      );
      published++;
    } catch (e) {
      utils.log.error(e);
    }
  });
  // console.log(published)
  return published;
};
const handleAlert = async (b: Discord.Bot, alert: Alert) => {
  let currentAlertId = await db.select().from(kvStore).where(
    drizzle.eq(kvStore.key, "last_alert_id"),
  ).execute();
  if (!currentAlertId) {
    currentAlertId = await db.insert(kvStore).values([{
      key: "last_alert_id",
      value: alert.alertId.toString(),
    }]).execute();
  }
  // console.log(alert.alertId);
  const hasBeenPublished = await db.select().from(alertHistory).where(
    drizzle.eq(alertHistory.alertId, alert.alertId),
  ).execute();

  if (
    !currentAlertId[0].value ||
    alert.alertId > parseInt(currentAlertId[0].value) || !hasBeenPublished
  ) {
    const count = await pushAlert(b, alert);
    await db.update(kvStore).set({ value: alert.alertId.toString() }).where(
      drizzle.eq(kvStore.key, "last_alert_id"),
    ).execute();

    console.log(alert.alertId);
    await db.insert(alertHistory).values([{
      alertId: alert.alertId,
      publishedTo: count,
      headline: alert.headline,
      shortDescription: alert.shortDescription,
      guid: alert.guid,
    }]).execute();
  }
};
