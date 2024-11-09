import { config } from "dotenv";
import { REST, Routes } from "discord.js";
config();

const commands = [
  {
    name: "ping",
    description: "Replies with pong!",
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("Registering slash commands...");
    if (process.env.DEBUG === "1") {
      console.log("Registering Guild slash commands...");
      await rest.put(
        Routes.applicationGuildCommands(
          process.env.CLIENT_ID,
          process.env.GUILD_ID
        ),
        { body: commands }
      );
    } else {
      await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID), {
        body: commands,
      });
    }

    console.log("Command registerd successfully!");
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
})();
