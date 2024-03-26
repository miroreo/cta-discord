import * as utils from "../utils.ts";
import { Discord } from "../../deps.ts";
import { handleCommands, removeUnusedCommands } from "./commands/mod.ts";
import { initCommands } from "./commands/mod.ts";
import { pollAlerts } from "./alerts.ts";

await utils.ensureEnvs(["DISCORD_BOT_TOKEN"]);
export const bot = Discord.createBot({
  token: Deno.env.get("DISCORD_BOT_TOKEN") as string,
  events: {
    ready() {
      utils.log.info("Bot is ready");
    },
    interactionCreate(b: Discord.Bot, i: Discord.Interaction) {
      if (
        i.type === Discord.InteractionTypes.ApplicationCommand ||
        i.type === Discord.InteractionTypes.MessageComponent
      ) {
        try {
          handleCommands(b, i);
        } catch (e) {
          utils.log.error(e);
        }
      }
    },
  },
});
await initCommands(bot);
// await removeUnusedCommands(bot);
const interval = setInterval(() => {
  pollAlerts(bot);
}, 10000);

await Discord.startBot(bot);
await Discord.editBotStatus(bot, {
  status: "online",
  activities: [{
    name: "CTA Trains",
    type: Discord.ActivityTypes.Watching,
    createdAt: Date.now(),
    details: "Watching the CTA Train Tracker",
    url: "https://www.transitchicago.com/",
  }],
});
