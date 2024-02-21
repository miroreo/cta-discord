import * as db from "./db.ts";
import {Discord, load} from "./deps.ts";
import {updatePositions, getBadRunNumbers, outOfPlaceTrains, trainLineString} from './train_data.ts';
import {getActiveAlerts} from './service_alerts.ts';
import {searchStations} from './stations.ts';
import { TrainLine } from "./types.ts";
import { Alert } from "./service_alerts.ts";


const env = await load();
const DISCORD_TOKEN = env["DISCORD_TOKEN"];

const bot = Discord.createBot({
  token: DISCORD_TOKEN,
  intents: Discord.Intents.Guilds | Discord.Intents.GuildMessages | Discord.Intents.MessageContent,
  events: {
		ready() {
			console.log("Successfully connected to gateway");
		},
		async interactionCreate(b, i) {
			if (i.data?.name === "ping") {
				await pushAlert("PONG!!!");
				return await b.helpers.sendInteractionResponse(
					i.id,
					i.token,
					{
						type: Discord.InteractionResponseTypes.ChannelMessageWithSource,
						data: {
							content: "Pong! Alerted!",
							flags: Discord.ApplicationCommandFlags.Ephemeral,
						}
					}
				)
			}
			trainDataHandler(b, i);
			stationDataHandler(b, i);
		},

  },
});

// This makes the bot appear as a mobile device
bot.gateway.manager.gatewayConfig.properties = {
	os: "Discordeno",
	browser: "Discord iOS",
	device: "Discordeno",
}

const lineColor = (line: TrainLine) => {
	switch(line) {
		case TrainLine.BLUE:
			return 0x00a1de;
		case TrainLine.RED:
			return 0xc60c30;
		case TrainLine.GREEN:
			return 0x009b3a;
		case TrainLine.ORANGE:
			return 0xf9461c;
		case TrainLine.YELLOW:
			return 0xf9e300;
		case TrainLine.PURPLE:
			return 0x522398;
		case TrainLine.BROWN:
			return 0x62361b;
		case TrainLine.PURPLE_EXPRESS:
			return 0x522398;
		case TrainLine.PINK:
			return 0xe27ea6;
		default:
			return 0x000000;
	}
}

const trainDataHandler = async (b: Discord.Bot, i: Discord.Interaction) => {
	if(i.data?.name === "getbadruns") {
		const {response, embeds} = await getBadRuns();	  
		// response = response + "```json\n" + JSON.stringify(badTrains) + "\n```" ;
		// const response = `The following trains are out of place: ${JSON.stringify(badTrains)}`;
		return await b.helpers.sendInteractionResponse(
			i.id,
			i.token,
			{
				type: Discord.InteractionResponseTypes.ChannelMessageWithSource,
				data: {
					content: response,
					embeds,
					components: [
						{
							type: Discord.MessageComponentTypes.ActionRow,
							components: [
								{
									type: Discord.MessageComponentTypes.Button,
									label: "Refresh",
									style: Discord.ButtonStyles.Primary,
									customId: "getbadruns_refresh"
								}
							]
						}
					]
					
				}
			}
		);
	}
	if(i.data?.name === "alerts") {
		alerts_command(b, i);
	}
	if(i.data?.customId === "getbadruns_refresh") {
		const {response, embeds} = await getBadRuns();
		return await b.helpers.sendInteractionResponse(i.id, i.token, {
			type: Discord.InteractionResponseTypes.UpdateMessage,
			data: {
				content: response,
				embeds,
				components: [
					{
						type: Discord.MessageComponentTypes.ActionRow,
						components: [
							{
								type: Discord.MessageComponentTypes.Button,
								label: "Refresh",
								style: Discord.ButtonStyles.Primary,
								customId: "getbadruns_refresh"
							}
						]
					}
				]
			},
		});
	}

}
const stationDataHandler = async (b: Discord.Bot, i: Discord.Interaction) => {
	if(i.data?.name === "search_stations") {
		const query = i.data.options?.[0]?.value as string;
		const stations = searchStations(query);
		if(stations.length === 0) return await b.helpers.sendInteractionResponse(i.id, i.token, {
			type: Discord.InteractionResponseTypes.ChannelMessageWithSource,
			data: {
				content: `No stations found for "${query}"`,
				flags: Discord.ApplicationCommandFlags.Ephemeral,
			}
		});
		const response = `Station Search results for "${query}":\n` + stations.map(s => `${s.name} (id: ${s.id})`).join("\n");
		return await b.helpers.sendInteractionResponse(i.id, i.token, {
			type: Discord.InteractionResponseTypes.ChannelMessageWithSource,
			data: {
				embeds: [{
					title: `Station Search results for "${query}"`,
					fields: stations.map(s => {
						return {
							name: s.name,
							value: `id: \`${s.id}\``
						}
					}),
					color: 0x00a1de,
				}],
			}
		});
	}
}
const alerts_command = async (b: Discord.Bot, i: Discord.Interaction) => {
	// check if subcommand is subscribe
	if(i.data?.options?.[0]?.name === "subscribe") {
		subscribe_alerts(b, i);
	}
	if(i.data?.options?.[0]?.name === "unsubscribe") {
		unsubscribe_alerts(b, i);
	}
	if(i.data?.options?.[0]?.name === "list") {
		const activeAlerts = await getActiveAlerts({planned: true, accessibility: false, routes: ["red","blue","g","brn","p","y","pink","org"]});
		if(activeAlerts.length === 0) {
			return await b.helpers.sendInteractionResponse(i.id, i.token, {
				type: Discord.InteractionResponseTypes.ChannelMessageWithSource,
				data: {
					content: "No active alerts",
					flags: Discord.ApplicationCommandFlags.Ephemeral,
				}
			});
		}
		let response = `Active Alerts:\n`;
		activeAlerts.forEach(alert => {
			response = response + `**${alert.headline}**\n${alert.shortDescription}\n`;
		});
		return await b.helpers.sendInteractionResponse(i.id, i.token, {
			type: Discord.InteractionResponseTypes.ChannelMessageWithSource,
			data: {
				content: response,
				flags: Discord.ApplicationCommandFlags.Ephemeral,
			}
		});
	
	}
};
const subscribe_alerts = async (b: Discord.Bot, i: Discord.Interaction) => {
	if(!i.member?.permissions || !i.guildId) {
		return await b.helpers.sendInteractionResponse(i.id, i.token, {
			type: Discord.InteractionResponseTypes.ChannelMessageWithSource,
			data: {
				content: "You must be in a server to use this command.",
				flags: Discord.ApplicationCommandFlags.Ephemeral,
			}
		});
	}
	if(Discord.calculatePermissions(i.member?.permissions || BigInt(0)).includes("MANAGE_GUILD")) {
		let guild = await db.getGuild(i.guildId);
		if(!guild) {
			console.log("Guild not found. Creating new guild entry.");
			guild = {
				guildId: i.guildId,
				guildName: (await b.helpers.getGuild(i.guildId)).name,
			}
		}
		console.log();
		const channelId = BigInt(i.data?.options?.[0]?.options?.[0]?.value as string) || i.channelId;
		if(!channelId || typeof channelId !== "bigint") return await b.helpers.sendInteractionResponse(i.id, i.token, {
			type: Discord.InteractionResponseTypes.ChannelMessageWithSource,
			data: {
				content: "Error: You must specify a channel to send alerts to.",
				flags: Discord.ApplicationCommandFlags.Ephemeral,
			}
		});
		if(guild.hasAlerts) {
			return await b.helpers.sendInteractionResponse(i.id, i.token, {
				type: Discord.InteractionResponseTypes.ChannelMessageWithSource,
				data: {
					content: `Already subscribed to alerts. Alerts will be sent to <#${guild.alertChannel}>`,
					flags: Discord.ApplicationCommandFlags.Ephemeral,
				}
			})
		}
		await db.setGuild({
			guildId: i.guildId,
			guildName: guild.guildName,
			hasAlerts: true,
			alertChannel: channelId
		});
		return await b.helpers.sendInteractionResponse(i.id, i.token, {
			type: Discord.InteractionResponseTypes.ChannelMessageWithSource,
			data: {
				content: `Subscribed to alerts. Alerts will be sent to <#${channelId}>`,
				flags: Discord.ApplicationCommandFlags.Ephemeral,
			}
		});
	}
};
const unsubscribe_alerts = async (b: Discord.Bot, i: Discord.Interaction) => {
	if(!i.guildId) {
		return await b.helpers.sendInteractionResponse(i.id, i.token, {
			type: Discord.InteractionResponseTypes.ChannelMessageWithSource,
			data: {
				content: "You must be in a server to use this command."
			}
		});
	}
	let guild = await db.getGuild(i.guildId);
	if(!guild) {
		console.log("Guild not found. Creating new guild entry.");
		guild = {
			guildId: i.guildId,
			guildName: (await b.helpers.getGuild(i.guildId)).name,
		}
	}
	if(!guild.hasAlerts) {
		return await b.helpers.sendInteractionResponse(i.id, i.token, {
			type: Discord.InteractionResponseTypes.ChannelMessageWithSource,
			data: {
				content: `Not subscribed to alerts.`,
				flags: Discord.ApplicationCommandFlags.Ephemeral,
			}
		})
	}
	await db.setGuild({
		guildId: i.guildId,
		guildName: guild.guildName,
		hasAlerts: false,
	});
	return await b.helpers.sendInteractionResponse(i.id, i.token, {
		type: Discord.InteractionResponseTypes.ChannelMessageWithSource,
		data: {
			content: `Unsubscribed from alerts.`,
			flags: Discord.ApplicationCommandFlags.Ephemeral,
		}
	});

};

const pollAlerts = async () => {
	console.log("Polling for alerts");
	const alerts = await getActiveAlerts({planned: true, accessibility: false, routes: ["red","blue","g","brn","p","y","pink","org"]});
	alerts.forEach(async alert => {
		await handleAlert(alert);
	})
	// console.log(alerts);
}
setInterval(pollAlerts, 10000);

const handleAlert = async (alert: Alert) => {
	const currentAlertId = await db.getKV("last_alert_id");
	const hasBeenPublished = await db.getAlertPublished(alert.alertId);
	if(alert.alertId > parseInt(currentAlertId || "0") || !hasBeenPublished) {
		const count = await pushAlert(alert);
		await db.setKV("last_alert_id", alert.alertId.toString());
		await db.pushAlertToDatabase({
			alertId: alert.alertId,
			headline: alert.headline,
			shortDescription: alert.shortDescription,
			guid: alert.guid,
			publishedTo: count
		});
	}
};

export const pushAlert = async (alert: Alert) => {
	let published = 0;
	const subscribers = await db.getSubscribers();
	subscribers.forEach(async (sub) => {
		if(!sub.alertChannel) return;
		bot.helpers.sendMessage(sub.alertChannel, {
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
		}).then((msg) => {
			console.log(`Published alert to ${sub.guildName} in #${sub.alertChannel}`);
			published++;
		}).catch((e) => {
			console.error(e);
		});
	});
	return published;
}

const getBadRuns = async () => {
	const pos = await updatePositions();
	const badTrains = getBadRunNumbers(pos);
	let response = "";
	badTrains.forEach((train) => {
		response = response + `${train.trainNumber} is a ${trainLineString(train.route)} Line train.\n`;
	});
	if(badTrains.length === 0) {
		response = "No trains have mismatched numbers!\n";
	}
	const outOfPlace = outOfPlaceTrains(pos);
	outOfPlace.forEach(train => {
		response = response + `${train.trainNumber} is out of place. ${trainLineString(train.route)} Line train approaching ${train.nextStation.stopName}\n`;
	})
	if(outOfPlace.length === 0) {
		response = response + "No trains are out of place!\n";
	}
	response = response + `Updated: <t:${Math.floor(Date.now() / 1000)}:R>\n`
	const embeds = badTrains?.map(train => {
		return {
			color: lineColor(train.route),
			title: `Train ${train.trainNumber}`,
			fields: [
				{
					name: "Line",
					value: `${trainLineString(train.route)}`
				},
				{
					name: "Next Stop",
					value: `${train.nextStation.stopName}`,
				},
				{
					name: "Destination",
					value: `${train.destination.stationName}`
				}
			],
			description: `This train has the wrong run number for its line.`
		} as Discord.Embed
	}).concat(outOfPlace.map(train => {
		return {
			color: lineColor(train.route),
			title: `Train ${train.trainNumber}`,
			fields: [
				{
					name: "Line",
					value: `${trainLineString(train.route)}`
				},
				{
					name: "Next Stop",
					value: `${train.nextStation.stopName}`,
				},
				{
					name: "Destination",
					value: `${train.destination.stationName}`
				}
			],
			description: `This train is out of place.`
		} as Discord.Embed
	}));
	return {
		response,
		embeds
	}
}


// Another way to do events
bot.events.messageCreate = function (b, message) {
	console.log(message.content);
};

bot.helpers.createGlobalApplicationCommand({
	name: "ping",
	description: "Replies with Pong!",
	options: []
})
bot.helpers.createGlobalApplicationCommand({
	name: "getbadruns",
	description: "Gets trains with bad run numbers",
	type: Discord.ApplicationCommandTypes.ChatInput
});
bot.helpers.createGlobalApplicationCommand({
	name: "alerts",
	description: "Subscribe to CTA Alerts",
	type: Discord.ApplicationCommandTypes.ChatInput,
	options: [
		{
			name: "subscribe",
			description: "Subscribe to CTA Alerts",
			type: Discord.ApplicationCommandOptionTypes.SubCommand,
			options: [
				{
					name: "channel",
					description: "The channel to send alerts to",
					type: Discord.ApplicationCommandOptionTypes.Channel,
					required: false
				}
			]
		},
		{
			name: "unsubscribe",
			description: "Unsubscribe from CTA Alerts",
			type: Discord.ApplicationCommandOptionTypes.SubCommand,
		},
		{
			name: "list",
			description: "List active alerts",
			type: Discord.ApplicationCommandOptionTypes.SubCommand,
		}
	],
	defaultMemberPermissions: ["MANAGE_GUILD"]
});
bot.helpers.createGlobalApplicationCommand({
	name: "search_stations",
	description: "Search for CTA Stations",
	type: Discord.ApplicationCommandTypes.ChatInput,
	options: [
		{
			name: "query",
			description: "The search query",
			type: Discord.ApplicationCommandOptionTypes.String,
			required: true,
			minLength: 2
		}
	]
})
await Discord.startBot(bot);