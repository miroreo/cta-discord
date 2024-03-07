import { Discord } from "../../../deps.ts";
import type { Command } from "./mod.ts";
import * as utils from "../../utils.ts";
export const command: Command = {
    name: "uptime",
    description: "Get the uptime of the bot",
    type: Discord.ApplicationCommandTypes.ChatInput,
    execute: async (b: Discord.Bot, i: Discord.Interaction) => {
        const uptimeSeconds = Math.floor((Date.now() - utils.startTime) / 1000);
        const days = Math.floor(uptimeSeconds / 86400);
        const hours = Math.floor((uptimeSeconds % 86400) / 3600);
        const minutes = Math.floor((uptimeSeconds % 3600) / 60);
        const seconds = Math.floor(uptimeSeconds % 60);
        return await b.helpers.sendInteractionResponse(i.id, i.token, {
            type: Discord.InteractionResponseTypes.ChannelMessageWithSource,
            data: {
                content: `Uptime: ${days}d ${hours}h ${minutes}m ${seconds}s`
            }
        });
    }
}
export default command;