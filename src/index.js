import { config } from "dotenv";
import { Client, IntentsBitField } from "discord.js";

config();

const token = process.env.TOKEN;
console.log(token);
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

client.on("interactionCreate", (interaciton) => {
  if (!interaciton.isChatInputCommand()) return;

  if (interaciton.commandName === 'ping') {
    interaciton.reply('pong!')
  }
});

client.on("messageCreate", (message) => {
  if (message.content === "hello") {
    message.reply("Hey!");
  }
});

client.login(token);
