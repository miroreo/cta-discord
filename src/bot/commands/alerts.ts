import { Discord, drizzle, drizzlePostgres, postgres } from "../../../deps.ts";
import type { Command } from "./mod.ts";
import * as utils from "../../utils.ts";
import { getActiveAlerts } from "../../cta/alerts.ts";
import { guilds } from "../../../db/schema.ts";

const config = await utils.ensureEnvs(["DATABASE_URL"]);
await utils.ensureEnvs(["DATABASE_URL"]);
const queryClient = postgres(Deno.env.get("DATABASE_URL") as string);
const db = drizzlePostgres(queryClient);

export const command: Command = {
  name: "alerts",
  description: "Subscribe to CTA Service Alerts",
  type: Discord.ApplicationCommandTypes.ChatInput,
  options: [
    {
      name: "subscribe",
      type: Discord.ApplicationCommandOptionTypes.SubCommand,
      description: "Subscribe to CTA train alerts",
      options: [{
        type: Discord.ApplicationCommandOptionTypes.Channel,
        name: "channel",
        description: "Channel to send alerts, defaults to current channel",
        required: false,
      }],
    },
    {
      name: "unsubscribe",
      type: Discord.ApplicationCommandOptionTypes.SubCommand,
      description: "Unsubscribe from CTA train alerts",
    },
    {
      name: "list",
      type: Discord.ApplicationCommandOptionTypes.SubCommand,
      description: "List active CTA rail service alerts",
    },
  ],
  execute: async (
    b: Discord.Bot,
    i: Discord.Interaction,
    options: Discord.InteractionDataOption[],
  ) => {
    switch (options[0]?.name) {
      case "subscribe":
        try {
          return await subscribeSubcommand(b, i, options);
        } catch (e) {
          utils.log.error(e);
          return await b.helpers.sendInteractionResponse(i.id, i.token, {
            type: Discord.InteractionResponseTypes.ChannelMessageWithSource,
            data: {
              content: "An error occurred while processing your request.",
              flags: Discord.ApplicationCommandFlags.Ephemeral,
            },
          });
        }
      case "unsubscribe": {
        try {
          return await unsubscribeSubcommand(b, i, options);
        } catch (e) {
          utils.log.error(e);
          return await b.helpers.sendInteractionResponse(i.id, i.token, {
            type: Discord.InteractionResponseTypes.ChannelMessageWithSource,
            data: {
              content: "An error occurred while processing your request.",
              flags: Discord.ApplicationCommandFlags.Ephemeral,
            },
          });
        }
      }
      case "list": {
        try {
          // await b.helpers.sendInteractionResponse(i.id, i.token, {
          // 	type: Discord.InteractionResponseTypes.DeferredChannelMessageWithSource,
          // 	data: {
          // 		content: "Fetching active alerts..."
          // 	}
          // });
          const alerts = await getActiveAlerts({
            planned: true,
            accessibility: false,
            routes: ["red", "blue", "g", "brn", "p", "y", "pink", "org"],
          }) || [];
          if (alerts.length === 0) {
            return await b.helpers.sendInteractionResponse(i.id, i.token, {
              type: Discord.InteractionResponseTypes.ChannelMessageWithSource,
              data: {
                content: "No active alerts at this time.",
              },
            });
          }
          // console.log(alerts);
          let alertList = alerts.map((a) =>
            `**${a.headline}**  <t:${
              Math.floor((a.eventStart!.valueOf()) / 1000)
            }:f> - ${
              a.TBD
                ? "TBD"
                : `<t:${Math.floor((a.eventEnd!.valueOf()) / 1000)}:f>`
            }\n${a.shortDescription}`
          ).join("\n\n");
          const clipped = alertList.length > 4000;
          alertList = clipped ? alertList.slice(0, 4000) : alertList;
          return await b.helpers.sendInteractionResponse(i.id, i.token, {
            type: Discord.InteractionResponseTypes.ChannelMessageWithSource,
            data: {
              embeds: [{
                title: "Active CTA Alerts",
                description: alertList,
              }],
              // content: `Active CTA Alerts:\n${alertList}${clipped ? "\n...and more" : ""}`
            },
          });
        } catch (e) {
          utils.log.error(e);
          return await b.helpers.sendInteractionResponse(i.id, i.token, {
            type: Discord.InteractionResponseTypes.ChannelMessageWithSource,
            data: {
              content: "An error occurred while processing your request.",
              flags: Discord.ApplicationCommandFlags.Ephemeral,
            },
          });
        }
      }
    }
  },
};

async function subscribeSubcommand(
  b: Discord.Bot,
  i: Discord.Interaction,
  options: Discord.InteractionDataOption[],
) {
  if (!i.guildId) {
    return await b.helpers.sendInteractionResponse(i.id, i.token, {
      type: Discord.InteractionResponseTypes.ChannelMessageWithSource,
      data: {
        content: "This command is not available in DMs.",
      },
    });
  }
  if (
    !Discord.calculatePermissions(i.member!.permissions! || BigInt(0)).includes(
      "MANAGE_GUILD",
    )
  ) {
    return await b.helpers.sendInteractionResponse(i.id, i.token, {
      type: Discord.InteractionResponseTypes.ChannelMessageWithSource,
      data: {
        content: "You need the `MANAGE_GUILD` permission to use this command.",
        flags: Discord.ApplicationCommandFlags.Ephemeral,
      },
    });
  }
  const channel = options[0].options?.find((o) => o.name === "channel")
    ?.value as bigint | undefined;
  const channelId = channel ? channel : i.channelId!;
  const guildId = i.guildId!;
  const guildRecord =
    (await db.select().from(guilds).where(drizzle.eq(guilds.guildId, guildId))
      .limit(1).execute())[0];
  if (!guildRecord) {
    await db.insert(guilds).values([{
      guildId: guildId,
      guildName: (await b.helpers.getGuild(guildId)).name ||
        "Unknown Guild Name",
      hasAlerts: true,
      alertChannel: channelId,
    }]).execute();
  } else if (!guildRecord?.hasAlerts) {
    await db.update(guilds).set({ hasAlerts: true, alertChannel: channelId })
      .where(drizzle.eq(guilds.guildId, guildId)).execute();
    // await prisma.guilds.update({
    // 	where: {
    // 		guild_id: guildId
    // 	},
    // 	data: {
    // 		has_alerts: true,
    // 		alert_channel: channelId
    // 	}
    // });
  } else if (guildRecord?.alertChannel === channelId) {
    return await b.helpers.sendInteractionResponse(i.id, i.token, {
      type: Discord.InteractionResponseTypes.ChannelMessageWithSource,
      data: {
        content:
          `Alerts are already enabled for this server in <#${guildRecord.alertChannel}>.`,
      },
    });
  } else if (guildRecord?.alertChannel !== channelId) {
    await db.update(guilds).set({ hasAlerts: true, alertChannel: channelId })
      .where(drizzle.eq(guilds.guildId, guildId)).execute();
    // await prisma.guilds.update({
    // 	where: {
    // 		guild_id: guildId
    // 	},
    // 	data: {
    // 		has_alerts: true,
    // 		alert_channel: channelId
    // 	}
    // });
    return await b.helpers.sendInteractionResponse(i.id, i.token, {
      type: Discord.InteractionResponseTypes.ChannelMessageWithSource,
      data: {
        content: `Alerts for this server have been changed to <#${channelId}>.`,
      },
    });
  }
  utils.log.error("Unknown error occurred in alerts.ts");
  return await b.helpers.sendInteractionResponse(i.id, i.token, {
    type: Discord.InteractionResponseTypes.ChannelMessageWithSource,
    data: {
      content: "Unknown error occurred. Please try again.",
    },
  });
}

async function unsubscribeSubcommand(
  b: Discord.Bot,
  i: Discord.Interaction,
  options: Discord.InteractionDataOption[],
) {
  if (!i.guildId) {
    return await b.helpers.sendInteractionResponse(i.id, i.token, {
      type: Discord.InteractionResponseTypes.ChannelMessageWithSource,
      data: {
        content: "This command is not available in DMs.",
        flags: Discord.ApplicationCommandFlags.Ephemeral,
      },
    });
  }
  if (
    !Discord.calculatePermissions(i.member!.permissions! || BigInt(0)).includes(
      "MANAGE_GUILD",
    )
  ) {
    return await b.helpers.sendInteractionResponse(i.id, i.token, {
      type: Discord.InteractionResponseTypes.ChannelMessageWithSource,
      data: {
        content: "You need the `MANAGE_GUILD` permission to use this command.",
        flags: Discord.ApplicationCommandFlags.Ephemeral,
      },
    });
  }
  const guildId = i.guildId!;
  const guildRecord =
    (await db.select().from(guilds).where(drizzle.eq(guilds.guildId, guildId))
      .limit(1).execute())[0];
  if (!guildRecord || !guildRecord.hasAlerts) {
    return await b.helpers.sendInteractionResponse(i.id, i.token, {
      type: Discord.InteractionResponseTypes.ChannelMessageWithSource,
      data: {
        content: "Alerts are not enabled for this server.",
        flags: Discord.ApplicationCommandFlags.Ephemeral,
      },
    });
  }
  await db.update(guilds).set({ hasAlerts: false, alertChannel: null }).where(
    drizzle.eq(guilds.guildId, guildId),
  ).execute();
  return await b.helpers.sendInteractionResponse(i.id, i.token, {
    type: Discord.InteractionResponseTypes.ChannelMessageWithSource,
    data: {
      content: "Alerts have been disabled for this server.",
      flags: Discord.ApplicationCommandFlags.Ephemeral,
    },
  });
}
export default command;
