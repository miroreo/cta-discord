import * as db from "./db.ts";
import * as utils from "./src/utils.ts";
import { Discord, loadEnv, log } from "./deps.ts";
import {
  getBadRunNumbers,
  outOfPlaceTrains,
  updatePositions,
} from "./src/cta/positions.ts";
import { getActiveAlerts } from "./src/cta/alerts.ts";
import { searchStations } from "./src/cta/stations.ts";
import { TrainLine } from "./types.ts";
import { Alert } from "./src/cta/alerts.ts";
import { Arrival, getArrivalsForStation } from "./src/cta/arrivals.ts";
import { getStation } from "./src/cta/stations.ts";
import { discordLog, initLog } from "./logging.ts";
import { arrivalsForStation, stopArrivals } from "./src/bot/arrivals.ts";

initLog();
discordLog.debug("Bot Starting...");

await utils.ensureEnvs(["CTA_API_KEY", "DISCORD_TOKEN"]);

const DISCORD_TOKEN = Deno.env.get("DISCORD_TOKEN");

if (!DISCORD_TOKEN) {
  discordLog.error("No Discord token found in environment");
  Deno.exit(1);
}

const bot = Discord.createBot({
  token: DISCORD_TOKEN,
  intents: Discord.Intents.Guilds | Discord.Intents.GuildMessages |
    Discord.Intents.MessageContent,
  events: {
    ready() {
      log.info("Successfully connected to gateway");
    },
    async interactionCreate(b, i) {
      if (i.data?.name === "ping") {
        log.info(
          `Received ping from ${i.user.username}#${i.user.discriminator} (${i.user.id})`,
        );
        return await b.helpers.sendInteractionResponse(
          i.id,
          i.token,
          {
            type: Discord.InteractionResponseTypes.ChannelMessageWithSource,
            data: {
              content: "Pong!",
              flags: Discord.ApplicationCommandFlags.Ephemeral,
            },
          },
        );
      }
      trainDataHandler(b, i);
      stationDataHandler(b, i);
      // if(i.data?.name === "broadcast_alert") {
      // 	if(i.user.id != 156126755646734336n) {
      // 		log.getLogger("errors").error(`Unauthorized user ${i.user.id.toString()} attempted to broadcast alert`);
      // 		return await b.helpers.sendInteractionResponse(i.id, i.token, {
      // 			type: Discord.InteractionResponseTypes.ChannelMessageWithSource,
      // 			data: {
      // 				content: "You are not authorized to use this command.",
      // 				flags: Discord.ApplicationCommandFlags.Ephemeral,
      // 			}
      // 		})
      // 	}
      // 	const alert = i.data.options?.[0]?.value as string;
      // 	const subscribers = await db.getSubscribers();
      // 	try {
      // 		subscribers.forEach(async (sub) => {
      // 			if(!sub.alertChannel) return;
      // 			b.helpers.sendMessage(sub.alertChannel, {
      // 				embeds: [{
      // 					title: "Alert",
      // 					description: alert,
      // 				}]
      // 			});
      // 		});
      // 	} catch (err) {
      // 		discordLog.error(err);
      // 	}
      // 	return await b.helpers.sendInteractionResponse(i.id, i.token, {
      // 		type: Discord.InteractionResponseTypes.ChannelMessageWithSource,
      // 		data: {
      // 			content: `Alert broadcast to ${subscribers.length} servers.`
      // 		}
      // 	});
      // }
    },
  },
});

// This makes the bot appear as a mobile device
bot.gateway.manager.gatewayConfig.properties = {
  os: "Discordeno",
  browser: "Discord iOS",
  device: "Discordeno",
};

const trainDataHandler = async (b: Discord.Bot, i: Discord.Interaction) => {
  if (i.data?.name === "getbadruns") {
    log.info(
      `Received getbadruns command from ${i.user.username}#${i.user.discriminator} (${i.user.id})`,
    );
    const { response, embeds } = await getBadRuns();
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
                  customId: "getbadruns_refresh",
                },
              ],
            },
          ],
        },
      },
    );
  }
  if (i.data?.customId === "getbadruns_refresh") {
    const { response, embeds } = await getBadRuns();
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
                customId: "getbadruns_refresh",
              },
            ],
          },
        ],
      },
    });
  }
};
const stationDataHandler = async (b: Discord.Bot, i: Discord.Interaction) => {
  const MAX_RESULTS = 25;
  if (i.data?.name === "search_stations") {
    const query = i.data.options?.[0]?.value as string;
    const stations = searchStations(query);
    if (stations.length === 0) {
      return await b.helpers.sendInteractionResponse(i.id, i.token, {
        type: Discord.InteractionResponseTypes.ChannelMessageWithSource,
        data: {
          content: `No stations found for "${query}"`,
          flags: Discord.ApplicationCommandFlags.Ephemeral,
        },
      });
    }
    const response = `Station Search results for "${query}":\n` +
      stations.map((s) => `${s.name} (id: ${s.id})`).join("\n");
    return await b.helpers.sendInteractionResponse(i.id, i.token, {
      type: Discord.InteractionResponseTypes.ChannelMessageWithSource,
      data: {
        embeds: [{
          title: `Station Search results for "${query}"`,
          fields: stations.map((s) => {
            return {
              name: s.name,
              value: `id: \`${s.id}\``,
            };
          }),
          color: 0x00a1de,
        }],
      },
    });
  }
  // if(i.data?.name === "arrivals") {
  // 	const stationId = i.data.options?.[0]?.value as number;
  // 	let arrivals = await getArrivalsForStation(stationId);
  // 	console.log(arrivals);
  // 	if(arrivals.length > MAX_RESULTS) {
  // 		let shortenedArrivals = [];
  // 		arrivals.sort((a, b) => a.arrivalTime.valueOf() - b.arrivalTime.valueOf());
  // 		for(let i = 0; i < MAX_RESULTS; i++) {
  // 			shortenedArrivals.push(arrivals[i]);
  // 		}
  // 		arrivals = shortenedArrivals;
  // 	}
  // 	return await b.helpers.sendInteractionResponse(i.id, i.token, {
  // 		type: Discord.InteractionResponseTypes.ChannelMessageWithSource,
  // 		data: {
  // 			embeds: [{
  // 				title: `Arrivals at ${getStation(stationId)} (id: ${stationId})`,
  // 				color: 0x00a1de,
  // 				fields: arrivals?.map(a => {
  // 					return {
  // 						name: `${utils.trainLineString(a.route)} Line Train ${a.trainNumber} to ${a.destination.stationName}`,
  // 						value: `${getArrivalText(a)}`
  // 					}
  // 				})
  // 			}],
  // 		}
  // 	});
  // }
  // if(i.data?.name === "station_arrivals") {
  // 	arrivalsForStation(b, i);
  // }
  // if(i.data?.name === "stop_arrivals") {
  // 	stopArrivals(b, i);
  // }
};
const getArrivalText = (arrival: Arrival): string => {
  let returnVal = "";
  if (
    new Date(arrival.arrivalTime.valueOf() - Date.now()).getMinutes() <= 2 ||
    arrival.isApproaching
  ) {
    console.log(arrival);
    returnVal = "Due";
  } // if(arrival.isScheduled) return "Scheduled <t:" + Math.floor(arrival.arrivalTime.valueOf()/1000) + ":R>";
  else if (arrival.isDelayed) returnVal = "Delayed";
  else returnVal = `<t:${Math.floor(arrival.arrivalTime.valueOf() / 1000)}:R>`;
  if (arrival.isScheduled) returnVal = returnVal + " (Scheduled)";
  return returnVal;
};

const pollAlerts = async () => {
  log.info("Polling for alerts");
  const alerts = await getActiveAlerts({
    planned: true,
    accessibility: false,
    routes: ["red", "blue", "g", "brn", "p", "y", "pink", "org"],
  }) || [];
  alerts.forEach(async (alert) => {
    await handleAlert(alert);
  });
  // console.log(alerts);
};
setInterval(pollAlerts, 10000);

const handleAlert = async (alert: Alert) => {
  const currentAlertId = await db.getKV("last_alert_id");
  const hasBeenPublished = await db.getAlertPublished(alert.alertId);
  if (alert.alertId > parseInt(currentAlertId || "0") || !hasBeenPublished) {
    const count = await pushAlert(alert);
    await db.setKV("last_alert_id", alert.alertId.toString());
    await db.pushAlertToDatabase({
      alertId: alert.alertId,
      headline: alert.headline,
      shortDescription: alert.shortDescription,
      guid: alert.guid,
      publishedTo: count,
    });
  }
};

export const pushAlert = async (alert: Alert) => {
  let published = 0;
  const subscribers = await db.getSubscribers();
  subscribers.forEach(async (sub) => {
    if (!sub.alertChannel) return;
    bot.helpers.sendMessage(sub.alertChannel, {
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
    }).then((msg) => {
      log.info(`Published alert to ${sub.guildName} in #${sub.alertChannel}`);
      published++;
    }).catch((e) => {
      console.error(e);
    });
  });
  return published;
};

const getBadRuns = async () => {
  const pos = await updatePositions();
  const badTrains = getBadRunNumbers(pos);
  let response = "";
  badTrains.forEach((train) => {
    response = response +
      `${train.trainNumber} is a ${
        utils.trainLineString(train.route)
      } Line train.\n`;
  });
  if (badTrains.length === 0) {
    response = "No trains have mismatched numbers!\n";
  }
  const outOfPlace = outOfPlaceTrains(pos);
  outOfPlace.forEach((train) => {
    response = response +
      `${train.trainNumber} is out of place. ${
        utils.trainLineString(train.route)
      } Line train approaching ${train.nextStation?.stopName}\n`;
  });
  if (outOfPlace.length === 0) {
    response = response + "No trains are out of place!\n";
  }
  response = response + `Updated: <t:${Math.floor(Date.now() / 1000)}:R>\n`;
  const embeds = badTrains?.map((train) => {
    return {
      color: utils.lineColor(train.route),
      title: `Train ${train.trainNumber}`,
      fields: [
        {
          name: "Line",
          value: `${utils.trainLineString(train.route)}`,
        },
        {
          name: "Next Stop",
          value: `${train.nextStation?.stopName}`,
        },
        {
          name: "Destination",
          value: `${train.destination.stationName}`,
        },
      ],
      description: `This train has the wrong run number for its line.`,
    } as Discord.Embed;
  }).concat(outOfPlace.map((train) => {
    return {
      color: utils.lineColor(train.route),
      title: `Train ${train.trainNumber}`,
      fields: [
        {
          name: "Line",
          value: `${utils.trainLineString(train.route)}`,
        },
        {
          name: "Next Stop",
          value: `${train.nextStation?.stopName}`,
        },
        {
          name: "Destination",
          value: `${train.destination.stationName}`,
        },
      ],
      description: `This train is out of place.`,
    } as Discord.Embed;
  }));
  return {
    response,
    embeds,
  };
};

// Another way to do events
bot.events.messageCreate = function (b, message) {
  // console.log(message.content);
};

bot.helpers.createGlobalApplicationCommand({
  name: "ping",
  description: "Replies with Pong!",
  options: [],
});
bot.helpers.createGlobalApplicationCommand({
  name: "getbadruns",
  description: "Gets trains with bad run numbers",
  type: Discord.ApplicationCommandTypes.ChatInput,
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
          required: false,
        },
      ],
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
    },
  ],
  defaultMemberPermissions: ["MANAGE_GUILD"],
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
      minLength: 2,
    },
  ],
});
bot.helpers.createGlobalApplicationCommand({
  name: "arrivals",
  description: "Get train arrivals at a station",
  type: Discord.ApplicationCommandTypes.ChatInput,
  options: [
    {
      name: "station_id",
      description:
        "The station id (can be found with the /search_stations command)",
      type: Discord.ApplicationCommandOptionTypes.Integer,
      required: false,
    },
  ],
});
bot.helpers.createGlobalApplicationCommand({
  name: "station_arrivals",
  description: "Get train arrivals at a station",
  type: Discord.ApplicationCommandTypes.ChatInput,
  options: [
    {
      name: "station",
      description: "The station to get arrivals for",
      type: Discord.ApplicationCommandOptionTypes.String,
      required: true,
    },
  ],
});
bot.helpers.createGlobalApplicationCommand({
  name: "stop_arrivals",
  description: "Get train arrivals at a stop",
  type: Discord.ApplicationCommandTypes.ChatInput,
  options: [
    {
      name: "stop",
      description: "The stop to get arrivals for",
      type: Discord.ApplicationCommandOptionTypes.Integer,
      required: true,
    },
  ],
});

bot.helpers.createGuildApplicationCommand({
  name: "broadcast_alert",
  description: "Broadcast an alert to all subscribed servers",
  type: Discord.ApplicationCommandTypes.ChatInput,
  options: [
    {
      name: "alert",
      description: "The alert to broadcast",
      type: Discord.ApplicationCommandOptionTypes.String,
      required: true,
    },
  ],
  defaultMemberPermissions: ["ADMINISTRATOR"],
}, "584874513750163476");

await Discord.startBot(bot);
await Discord.editBotStatus(bot, {
  status: "online",
  activities: [{
    name: "CTA Trains",
    type: Discord.ActivityTypes.Watching,
    createdAt: Date.now(),
  }],
});
