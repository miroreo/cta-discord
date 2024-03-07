import type { Command } from "./mod.ts";
import { Discord } from "../../../deps.ts";
import { searchStations } from "../../cta/stations.ts";
export const command: Command = {
	name: "station_search",
	description: "Search for a CTA train station",
	usage: "/station_search <search query>",
	type: Discord.ApplicationCommandTypes.ChatInput,
	options: [
		{
			name: "search",
			description: "Search query for CTA train stations",
			type: Discord.ApplicationCommandOptionTypes.String,
			required: true,
		},
	],
	execute: async (b: Discord.Bot, i: Discord.Interaction, options) => {
		const searchQuery = options.find((o) => o.name === "search")?.value as string;
		if(searchQuery.length < 2) {
			return await b.helpers.sendInteractionResponse(i.id, i.token, {
				type: Discord.InteractionResponseTypes.ChannelMessageWithSource,
				data: {
					content: "Search query must be at least 2 characters long.",
					flags: Discord.ApplicationCommandFlags.Ephemeral
				}
			});
		}
		const stations = await searchStations(searchQuery);
		if(stations.length === 0) {
			return await b.helpers.sendInteractionResponse(i.id, i.token, {
				type: Discord.InteractionResponseTypes.ChannelMessageWithSource,
				data: {
					content: "No stations found for that search query."
				}
			});
		}
		const stationList = stations.map((s) => s.name).join("\n");
		return await b.helpers.sendInteractionResponse(i.id, i.token, {
			type: Discord.InteractionResponseTypes.ChannelMessageWithSource,
			data: {
				content: `Stations found for "${searchQuery}":\n${stationList}`
			}
		});
	}
};
export default command;