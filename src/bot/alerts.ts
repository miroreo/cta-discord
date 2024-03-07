import { Discord } from "../../deps.ts";
import { PrismaClient } from "../../prisma/client/deno/edge.ts";
import * as utils from "../utils.ts";
import { getActiveAlerts, Alert } from "../cta/alerts.ts";

await utils.ensureEnvs(["DATABASE_URL"]);

const prisma = new PrismaClient({
	datasourceUrl: Deno.env.get("DATABASE_URL") as string,
});

export async function pollAlerts(b: Discord.Bot) {
	utils.log.info("Polling for alerts");
	const alerts = await getActiveAlerts({planned: true, accessibility: false, routes: ["red","blue","g","brn","p","y","pink","org"]});
	if(!alerts || alerts.length === 0) {
		utils.log.info("No active alerts");
		return;
	}
	utils.log.info(`Found ${alerts.length} active alerts`);
	const servers = await prisma.guilds.findMany({
		where: {
			has_alerts: true,
		},
		select: {
			guild_id: true,
			alert_channel: true,
			guild_name: true,
		}
	});
	alerts.forEach(async (alert) => {
		try {
			await handleAlert(b, alert);
		} catch(e) {
			utils.log.error(e);
		}
	})
}

const pushAlert = async (b: Discord.Bot, alert: Alert) => {
	let published = 0;
	const subscribers = await prisma.guilds.findMany({
		select: {
			guild_id: true,
			alert_channel: true,
			has_alerts: true,
			guild_name: true,
		},
		where: {
			has_alerts: true
		}
	})
	await subscribers.forEach(async (sub) => {
		if(!sub.alert_channel) return;
		try {
			await b.helpers.sendMessage(sub.alert_channel, {
				embeds: [{
					author: {
						name: "CTA Alerts",
						iconUrl: "https://www.transitchicago.com/assets/1/16/DimRiderToolDesktop/quick-link-4.png?14576"
					},
					color: parseInt(alert.severityColor.replace("#", "0x")),
					title: alert.headline,
					description: alert.shortDescription,
					timestamp: new Date(alert.eventStart).valueOf(),
				}]
			})
			utils.log.info(`Published alert to ${sub.guild_name} in #${sub.alert_channel}`)
			published++;
		} catch (e) {
			utils.log.error(e);
		}
	});
	// console.log(published)
	return published;
}
const handleAlert = async (b: Discord.Bot, alert: Alert) => {
	let currentAlertId = await prisma.kv_store.findFirst({
		select: {
			value: true
		},
		where: {
			key: "last_alert_id"
		}
	});
	if(!currentAlertId) {
		currentAlertId = await prisma.kv_store.create({
			data: {
				key: "last_alert_id",
				value: alert.alertId.toString()
			},
			select: {
				value: true
			}
		});
	}
	console.log(alert.alertId);
	const hasBeenPublished = await prisma.alert_history.findFirst({
		where: {
			alert_id: alert.alertId
		},
		select: {
			alert_id: true
		}
	});

	if(!currentAlertId.value || alert.alertId > parseInt(currentAlertId.value) || !hasBeenPublished) {
		const count = await pushAlert(b, alert);
		await prisma.kv_store.update({
			where: {
				key: "last_alert_id"
			},
			data: {
				value: alert.alertId.toString()
			}
		});
		console.log(alert.alertId);
		await prisma.alert_history.create({
			data: {
				alert_id: alert.alertId,
				published_to: count,
				headline: alert.headline,
				short_description: alert.shortDescription,
				guid: alert.guid,
			}
		});
	}
}