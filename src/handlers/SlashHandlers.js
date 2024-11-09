import { PingCommand } from "../commands/core.js";
import { SyncCommand } from "../commands/sync.js";
import { UnsyncCommand } from "../commands/unsync.js";

export const slashCommands = [
  PingCommand,
  SyncCommand,
  UnsyncCommand
];



export const handleSlashCommand = async (interaction) => {
  if (!interaction.isCommand()) return;

  for (const cmd of slashCommands) {
    if (interaction.commandName === cmd.data.name) {
      await cmd.run(interaction);
    }
  }
};
