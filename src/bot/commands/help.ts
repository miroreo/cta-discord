import { Command, commands } from "./mod.ts";
import { Discord } from "../../../deps.ts";
import * as utils from "../../utils.ts";

export const command: Command = {
  name: "help",
  description: "View the help menu",
  usage: "/help",
  type: Discord.ApplicationCommandTypes.ChatInput,
  execute: async (b: Discord.Bot, i: Discord.Interaction, _) => {
    return await b.helpers.sendInteractionResponse(i.id, i.token, {
      type: Discord.InteractionResponseTypes.ChannelMessageWithSource,
      data: {
        embeds: [{
          title: "CTA Discord Bot",
          description:
            "A Discord bot to get CTA train arrival times and alerts.",
          fields: [{
            name: "Commands",
            value: commands.map((c: Command) => {
              return `**${c.name}**: ${c.description}` +
                (c.usage ? `\nUsage: ${c.usage}` : "");
            }).join("\n"),
          }, {
            name: "Startup time",
            value: `<t:${Math.floor(utils.startTime / 1000)}>`,
          }, {
            name: "Source",
            value: "https://github.com/miroreo/cta-discord",
          }],
        }],
      },
    });
  },
};
export default command;
