import { Discord } from "../../../deps.ts";
import { Command } from "./mod.ts";
import {updatePositions} from "../../cta/positions.ts";
import {getBadRunNumbers, outOfPlaceTrains} from "../../cta/positions.ts";
import * as utils from "../../utils.ts";

export const command: Command = {
	name: "getbadruns",
	description: "Check for trains that are not running correctly",
	type: Discord.ApplicationCommandTypes.ChatInput,
	execute: async (b: Discord.Bot, i: Discord.Interaction) => {
		let updating = false;
		if(i.data?.customId === "getbadruns:refresh") {
			updating = true;
		}
		const pos = await updatePositions();
		const badTrains = getBadRunNumbers(pos);
		let response = "";
		badTrains.forEach((train) => {
			response = response + `${train.trainNumber} is a ${utils.trainLineString(train.route)} Line train.\n`;
		});
		if(badTrains.length === 0) {
			response = "No trains have mismatched numbers!\n";
		}
		const outOfPlace = outOfPlaceTrains(pos);
		outOfPlace.forEach(train => {
			response = response + `${train.trainNumber} is out of place. ${utils.trainLineString(train.route)} Line train approaching ${train.nextStation?.stopName}\n`;
		})
		if(outOfPlace.length === 0) {
			response = response + "No trains are out of place!\n";
		}
		response = response + `Updated: <t:${Math.floor(Date.now() / 1000)}:R>\n`
		const embeds = badTrains?.map(train => {
			return {
				color: utils.lineColor(train.route),
				title: `Train ${train.trainNumber}`,
				fields: [
					{
						name: "Line",
						value: `${utils.trainLineString(train.route)}`
					},
					{
						name: "Next Stop",
						value: `${train.nextStation?.stopName}`,
					},
					{
						name: "Destination",
						value: `${train.destination.stationName}`
					}
				],
				description: `This train has the wrong run number for its line.`
			} as Discord.Embed
		}).concat(outOfPlace.map(train => {
			return {
				color: utils.lineColor(train.route),
				title: `Train ${train.trainNumber}`,
				fields: [
					{
						name: "Line",
						value: `${utils.trainLineString(train.route)}`
					},
					{
						name: "Next Stop",
						value: `${train.nextStation?.stopName}`,
					},
					{
						name: "Destination",
						value: `${train.destination.stationName}`
					}
				],
				description: `This train is out of place.`
			} as Discord.Embed
		}));
		return await b.helpers.sendInteractionResponse(
			i.id,
			i.token,
			{
				type: updating 
							? Discord.InteractionResponseTypes.UpdateMessage 
							: Discord.InteractionResponseTypes.ChannelMessageWithSource,
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
									customId: "getbadruns:refresh"
								}
							]
						}
					]
					
				}
			}
		);
			// return await b.helpers.sendInteractionResponse(i.id, i.token, {
			// 	type: Discord.InteractionResponseTypes.ChannelMessageWithSource,
			// 	data: {
			// 		content: "This command is not yet implemented.",
			// 		flags: Discord.ApplicationCommandFlags.Ephemeral
			// 	}
			// });
	}
};
export default command;