import { Discord, log } from "../../../deps.ts"; 
import { discordLog } from "../../../logging.ts";
import arrivals  from "./arrivals.ts";
import help from "./help.ts";
import stationSearch from "./station_search.ts";
import alerts from "./alerts.ts";
import broadcast from "./broadcast_alert.ts"
import * as utils from "../../../utils.ts";
import { bot } from "../bot.ts";

export const commands = [alerts, arrivals, help, stationSearch, broadcast]
export const handleCommands = async (b: Discord.Bot, i: Discord.Interaction) => {
	utils.log.info("Handling command " + i.data?.name + " " + i.data?.customId);
	if(!i.data || (!i.data.name && !i.data.customId)) return;
	if(i.data.customId) {
		const commandName = i.data.customId.split(":")[0];
		
		const command = commands.find(c => c.name === commandName);
		if(!commandName || !command) {
			return await b.helpers.sendInteractionResponse(i.id, i.token, {
				type: Discord.InteractionResponseTypes.ChannelMessageWithSource,
				data: {
					content: "Invalid command",
					flags: Discord.ApplicationCommandFlags.Ephemeral,
				}
			});
		}
		return await command.execute(b, i, []);
	}
	const command = commands.find((c) => c.name === i.data!.name);
	if(!command) {
		utils.log.info("Invalid command");
		return;
	}
	if(command.guildId && !i.guildId) {
		return b.helpers.sendInteractionResponse(i.id, i.token, {
			type: Discord.InteractionResponseTypes.ChannelMessageWithSource,
			data: {
				content: "This command must be used in a server.",
			}
		});
	}
	if(command.guildId && i.guildId != command.guildId) {
		return b.helpers.sendInteractionResponse(i.id, i.token, {
			type: Discord.InteractionResponseTypes.ChannelMessageWithSource,
			data: {
				content: "This command is not available in this server.",
			}
		});
	}
	const options = await validateOptions(b, i, command);
	if(!options && command.options) return;
	try {
		command.execute(b, i, options || []);
	}
	catch (err) {
		utils.log.error(err);
	}
}
const validateOptions = async (b: Discord.Bot, i: Discord.Interaction, command: Command) => {
	const options = i.data?.options;
	// verify that any required options for command are present
	if(command.options?.some((o) => o.required && !options?.find((opt) => opt.name === o.name))) {
		return await b.helpers.sendInteractionResponse(i.id, i.token, {
			type: Discord.InteractionResponseTypes.ChannelMessageWithSource,
			data: {
				content: "Missing required options",
			}
		});
	}
	// verify that any options present are valid for the command
	if(!options) return;
	for(const option of options) {
		const commandOption = command.options?.find((o) => o.name === option.name);
		if(!commandOption) {
			return await b.helpers.sendInteractionResponse(i.id, i.token, {
				type: Discord.InteractionResponseTypes.ChannelMessageWithSource,
				data: {
					content: `The option ${option.name} is not valid for this command`,
				}
			});
		}
	}
	// verify that any options present are of the correct type
	for(const option of options) {
		const commandOption = command.options?.find((o) => o.name === option.name);
		if(!commandOption) continue;
		if(commandOption.type === Discord.ApplicationCommandOptionTypes.Integer && typeof option.value !== "number") {
			return await b.helpers.sendInteractionResponse(i.id, i.token, {
				type: Discord.InteractionResponseTypes.ChannelMessageWithSource,
				data: {
					content: `The option ${option.name} must be a number`,
				}
			});
		}
		if(commandOption.type === Discord.ApplicationCommandOptionTypes.String && typeof option.value !== "string") {
			return await b.helpers.sendInteractionResponse(i.id, i.token, {
				type: Discord.InteractionResponseTypes.ChannelMessageWithSource,
				data: {
					content: `The option ${option.name} must be a string`,
				}
			});
		}
	}
	// return the options object if all checks pass
	return options;
}
export const initCommands = async (b: Discord.Bot) => {
	const registeredCommands = await Discord.getGlobalApplicationCommands(b);
	const commandNames = registeredCommands.map((c) => c.name);
	for(const command of commands) {
		if(!commandNames.includes(command.name)) {
			await Discord.createGlobalApplicationCommand(b, command);
		} else {
			command.options?.forEach(async (option) => {
				const existingOption = registeredCommands.find((c) => c.name === command.name)?.options?.find((o) => o.name === option.name);
				if(!existingOption || existingOption?.type !== option.type || existingOption?.required !== option.required)		
					utils.log.info("Updating command " + command.name + " with new options");
					await Discord.editGlobalApplicationCommand(
						b, 
						registeredCommands.find(c => c.name=== command.name)?.id || "", 
						{
							options: command.options,
							...command
						});
				});
			}
	}
}
export const removeUnusedCommands = async (b: Discord.Bot) => {
	const registeredCommands = await Discord.getGlobalApplicationCommands(b);
	for(const [ id, command ] of registeredCommands) {
		if(commands.find(c => c.name === command.name)) {
			await Discord.deleteGlobalApplicationCommand(b, id);
		}
	}
}

export type Command = Discord.CreateSlashApplicationCommand & {
	execute: (bot: Discord.Bot, interaction: Discord.Interaction, options: Discord.InteractionDataOption[]) => void;
	guildId?: Discord.BigString;
	usage?: string;
}

export default commands;