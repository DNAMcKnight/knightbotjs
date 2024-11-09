import { config } from "dotenv";
import { Client, IntentsBitField } from "discord.js";
import { handleSlashCommand } from "./handlers/SlashHandlers.js";

config();

const token = process.env.TOKEN;
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", (ctx) => {
  console.log(`${ctx.user.tag} is ready!`);
});

client.on("interactionCreate", handleSlashCommand);

// client.on("messageCreate", (message) => {
//   if (message.content === "hello") {
//     message.reply("Hey!");
//   }
// });

process.on("uncaughtException", (error) => {
  console.log(error.stack);
});

client.login(token);
