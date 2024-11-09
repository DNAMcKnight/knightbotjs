import { config } from "dotenv";
import { REST, Routes } from "discord.js";
config();

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("Started removing application commands...");

    if (process.env.DEBUG === "1") {
      // Debug mode: Remove commands from specific guild
      console.log("Debug mode: Removing guild commands...");
      await rest.put(
        Routes.applicationGuildCommands(
          process.env.CLIENT_ID,
          process.env.GUILD_ID
        ),
        { body: [] } // Empty array removes all commands
      );
      console.log("Successfully removed all guild commands!");
    } else {
      // Production mode: Remove global commands
      console.log("Production mode: Removing global commands...");
      await rest.put(
        Routes.applicationCommands(process.env.CLIENT_ID),
        { body: [] } // Empty array removes all commands
      );
      console.log("Successfully removed all global commands!");
    }
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }

  console.log("Command removal process completed.");
})();
