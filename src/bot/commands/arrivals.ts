import { generateArrivalsBoard } from "../../../arrivaldisplay/gen.ts";
import { Discord } from "../../../deps.ts";
import { getArrivalsForStation } from "../../cta/arrivals.ts";
import { getStation } from "../../cta/stations.ts";
import { searchStations } from "../../cta/stations.ts";
import type { Command } from "./mod.ts";

export const command: Command = {
	name: "arrivals",
	description: "Get the next arrivals for a CTA train station",
	usage: "/arrivals <station name>",
	type: Discord.ApplicationCommandTypes.ChatInput,
	options: [
		{
			name: "station",
			description: "Name (or search query) of CTA train station",
			type: Discord.ApplicationCommandOptionTypes.String,
			required: true,
		},
	],
	execute: async (b: Discord.Bot, i: Discord.Interaction, options) => {
		if(i.data!.customId?.startsWith("arrivals:refresh")) {
			const lastInteractionTimestamp = i.message!.editedTimestamp || i.message!.timestamp;
			const secondsSinceLastInteraction = Math.floor((Date.now() - lastInteractionTimestamp) / 1000);
			if (secondsSinceLastInteraction < 30) {
				return await b.helpers.sendInteractionResponse(i.id, i.token, {
					type: Discord.InteractionResponseTypes.ChannelMessageWithSource,
					data: {
						content: "Please wait at least 30 seconds before refreshing.",
						flags: Discord.ApplicationCommandFlags.Ephemeral,
					}
				});
			}
			const stationId = parseInt(i.data!.customId.split("/")[2]);
			return await generateBoard(b, i, stationId, options, true);
		} else if(i.data!.customId?.startsWith("arrivals:select")) {
			const stationId = parseInt(i.data!.values![0]) || 0;
			return await generateBoard(b, i, stationId, options, true);
		}
		const stationSearch = options[0].value as string;
		const stations = await searchStations(stationSearch);
		if(stations.length === 0) {
			return await b.helpers.sendInteractionResponse(i.id, i.token, {
				type: Discord.InteractionResponseTypes.ChannelMessageWithSource,
				data: {
					content: "No stations found for that query."
				}
			});
		}
		if(stations.length > 25) {
			return await b.helpers.sendInteractionResponse(i.id, i.token, {
				type: Discord.InteractionResponseTypes.ChannelMessageWithSource,
				data: {
					content: "Too many stations found for that query. Please refine your search."
				}
			});
		}
		if(stations.length > 1) {
			return await b.helpers.sendInteractionResponse(i.id, i.token, {
				type: Discord.InteractionResponseTypes.ChannelMessageWithSource,
				data: {
					components: [{
						type: Discord.MessageComponentTypes.ActionRow,
						components: [{
							type: Discord.MessageComponentTypes.SelectMenu,
							customId: "arrivals:select",
							placeholder: "Select a station",
							options: stations.map((s) => {
								return {
									label: s.name,
									value: s.id.toString(),
								};
							}),
							maxValues: 1,
						}]
					}],
					content: `Multiple stations found for that query. Please select one`
				}
			});
		}
		await generateBoard(b, i, stations[0].id, options);
	}
};

async function generateBoard(b: Discord.Bot, i: Discord.Interaction, stationId: number, options: Discord.InteractionDataOption[], update: boolean = false) {
	const station = getStation(stationId);
	const arrivals = await getArrivalsForStation(stationId);
	if(arrivals.length === 0) {
		return await b.helpers.sendInteractionResponse(i.id, i.token, {
			type: Discord.InteractionResponseTypes.ChannelMessageWithSource,
			data: {
				content: "No arrivals found for that station."
			}
		});
	}
	const lastFewArrivals = arrivals.sort((a, b) => a.arrivalTime.getTime() - b.arrivalTime.getTime()).slice(0, 8);
	const arrivalBoard = await generateArrivalsBoard(`Upcoming Arrivals at ${station}`, lastFewArrivals);
	return await b.helpers.sendInteractionResponse(i.id, i.token, {
		type: Discord.InteractionResponseTypes.UpdateMessage,
		data: {
			content: `Arrival Board Generated <t:${Math.floor(Date.now() / 1000)}:R>`,
			embeds: [{
				title: `Arrivals for ${arrivals[0].stationName}`,
				image: {
					url: "attachment://arrivals.png"
				}
			}],
			file: {
				blob: new Blob([arrivalBoard], {type: "image/png"}),
				name: "arrivals.png"
			},
			components: [{type: Discord.MessageComponentTypes.ActionRow, 
				components: [{
					type: Discord.MessageComponentTypes.Button,
					label: "Refresh",
					style: Discord.ButtonStyles.Primary,
					customId: `arrivals:refresh/stationId/${stationId}`,
				}]
			}]
		},
	});
}

export default command;