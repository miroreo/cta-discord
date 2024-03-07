import { Discord } from "../../../deps.ts";
import type { Command } from "./mod.ts";
import { Prisma, PrismaClient } from "../../../prisma/client/deno/edge.ts"
import * as utils from "../../utils.ts";

await utils.ensureEnvs(["DATABASE_URL"]);
const prisma = new PrismaClient({
    datasourceUrl: Deno.env.get("DATABASE_URL") as string,
});

export const command: Command = {
    name: "broadcast_alert",
    description: "Broadcast an alert to all subscribed servers of the bot",
    type: Discord.ApplicationCommandTypes.ChatInput,
    options: [
		{
			name: "alert",
			description: "Alert to broadcast",
			type: Discord.ApplicationCommandOptionTypes.String,
			required: true,
		},
	],
    defaultMemberPermissions: ["ADMINISTRATOR"],
    execute: async (b: Discord.Bot, i: Discord.Interaction, options: Discord.InteractionDataOption[]) => {
        const servers = await prisma.guilds.findMany({
            where: {
                has_alerts: true,                
            },
            select: {
                guild_id: true,
                alert_channel: true,
                guild_name: true
            }
        });
        const alert = options.find((o) => o.name === "alert")?.value as string;
        let finalContent = "";

        for(const server of servers) {
            if(!server.alert_channel) continue;
            finalContent += `Broadcasting alert to ${server.guild_name} (${server.guild_id})\n`;
            await b.helpers.sendMessage(server.alert_channel, {
                content: alert,
            });
        }
        await b.helpers.sendInteractionResponse(i.id, i.token, {
            type: Discord.InteractionResponseTypes.ChannelMessageWithSource,
            data: {
                content: finalContent,
            }
        });
    },
    guildId: "584874513750163476"
};

export default command;