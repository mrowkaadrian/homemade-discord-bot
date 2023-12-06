import { commandList } from '../interaction/commands/commandList.js';
import logger from '../logging/logger.js';

export default function getCommands(client = undefined) {
	const commandsJSON = [];

	for (const command of commandList) {
		if (client) {
			if (command.data && command.execute) {
				client.commands.set(command.data.name, command);
			}
			else {
				logger.warn(`The command ${command.data.name} is missing a required property.`);
			}
		}
		else {
			commandsJSON.push(command.data.toJSON());
		}
	}

	return commandsJSON;
}