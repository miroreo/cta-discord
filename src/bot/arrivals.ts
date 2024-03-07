import { Discord, log } from "../../deps.ts";
import {searchStations, stopsAtStation} from "../cta/stations.ts";
import { getArrivalsForStation, getArrivalsForStop, type Arrival } from "../cta/arrivals.ts";
import { generateArrivalsBoard } from "../../arrivaldisplay/gen.ts";

export const arrivalsForStation = async (b: Discord.Bot, i: Discord.Interaction) => {
	// mandate that the user selects a station
	if(!i.data?.options) {
		return await b.helpers.sendInteractionResponse(i.id, i.token, {
			type: Discord.InteractionResponseTypes.ChannelMessageWithSource,
			data: {
				content: "Please enter a station search query."
			}
		});
	}
	const stationSearch = i.data.options[0].value as string;
	const stations = await searchStations(stationSearch);
	if(stations.length === 0) {
		return await b.helpers.sendInteractionResponse(i.id, i.token, {
			type: Discord.InteractionResponseTypes.ChannelMessageWithSource,
			data: {
				content: "No stations found for that query."
			}
		});
	}
	if(stations.length > 1) {
		return await b.helpers.sendInteractionResponse(i.id, i.token, {
			type: Discord.InteractionResponseTypes.ChannelMessageWithSource,
			data: {
				content: `Multiple stations found for that query. Please refine your search.\n\n${stations.map(s => s.name).join(", ")}`
			}
		})
	}
	const station = stations[0];
	const stationStops = stopsAtStation(station.id);
	const arrivals = await getArrivalsForStation(station.id);
	if(arrivals.length === 0) {
		return await b.helpers.sendInteractionResponse(i.id, i.token, {
			type: Discord.InteractionResponseTypes.ChannelMessageWithSource,
			data: {
				content: "No arrivals found for that station."
			}
		});
	}
	const lastFewArrivals = arrivals.sort((a, b) => a.arrivalTime.getTime() - b.arrivalTime.getTime()).slice(0, 8);
	const arrivalBoard = await generateArrivalsBoard(`Upcoming Arrivals at ${station.name}`, lastFewArrivals);
	return await b.helpers.sendInteractionResponse(i.id, i.token, {
		type: Discord.InteractionResponseTypes.ChannelMessageWithSource,
		data: {
			embeds: [{
				title: `Arrivals for ${arrivals[0].stationName}`,
				image: {
					url: "attachment://arrivals.png"
				}
			}],
			file: {
				blob: new Blob([arrivalBoard], {type: "image/png"}),
				name: "arrivals.png"
			}
		}
	});
}
export const stopArrivals = async (b: Discord.Bot, i: Discord.Interaction) => {
	if(!i.data?.options) {
		return await b.helpers.sendInteractionResponse(i.id, i.token, {
			type: Discord.InteractionResponseTypes.ChannelMessageWithSource,
			data: {
				content: "Please enter a stop number."
			}
		});
	}
	const stopNumber = i.data.options[0].value as number;
	const arrivals = await getArrivalsForStop(stopNumber);
	if(arrivals.length === 0) {
		return await b.helpers.sendInteractionResponse(i.id, i.token, {
			type: Discord.InteractionResponseTypes.ChannelMessageWithSource,
			data: {
				content: "No arrivals found for that stop."
			}
		});
	};
	// await b.helpers.sendInteractionResponse(i.id, i.token, {
	// 	type: Discord.InteractionResponseTypes.DeferredChannelMessageWithSource,
	// 	data: {
	// 		content: "Generating image..."
	// 	}
	// });
	const arrivalBoard = await generateArrivalsBoard(arrivals[0].stopDescription, arrivals);
	return await b.helpers.sendInteractionResponse(i.id, i.token, {
		type: Discord.InteractionResponseTypes.ChannelMessageWithSource,
		data: {
			embeds: [{
				title: `Arrivals for ${arrivals[0].stationName}`,
				image: {
					url: "attachment://arrivals.png"
				}
			}],
			file: {
				blob: new Blob([arrivalBoard], {type: "image/png"}),
				name: "arrivals.png"
			}
		}
	});
}
const minutesUntil = (arrival: Date): number => {
	const now = new Date();
	const diff = arrival.getTime() - now.getTime();
	return Math.floor(diff / 60000);
}

// const arrivalImage