import { Discord, drizzle, drizzlePostgres, postgres } from "../../../deps.ts";
import type { Command } from "./mod.ts";
import * as utils from "../../utils.ts";
import { guilds } from "../../../db/schema.ts";
await utils.ensureEnvs(["DATABASE_URL"]);
const queryClient = postgres(Deno.env.get("DATABASE_URL") as string);
const db = drizzlePostgres(queryClient);

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
        const servers = await db.select().from(guilds).where(drizzle.eq(guilds.hasAlerts, true)).execute()
        const alert = options.find((o) => o.name === "alert")?.value as string;
        let finalContent = "";

        for(const server of servers) {
            if(!server.alertChannel) continue;
            finalContent += `Broadcasting alert to ${server.guildName} (${server.guildId})\n`;
            await b.helpers.sendMessage(server.alertChannel, {
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