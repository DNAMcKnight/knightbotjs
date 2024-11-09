import { PingCommand } from "../commands/core.js";

export const slashCommands = [PingCommand];

export const handleSlashCommand = async (interaction) => {
  if (!interaction.isCommand()) return;

  for (const command of slashCommands) {
    if (interaction.commandName === command.data.name) {
      await command.run(interaction);
    }
  }
};
