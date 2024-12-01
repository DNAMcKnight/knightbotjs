import { getLinkedTags, getLinkedUser } from "../utils/connectToDB.js";
import { getPlayer } from "../utils/clashUtils.js";

export const PingCommand = {
  data: {
    name: "ping",
    description: "Replies with pong!",
    defaultPermission: true,
  },
  callback: async (interaction) => {
    await interaction.reply("pong!");
    return true;
  },
};

export const TestCommand = {
  data: {
    name: "test",
    description: "Welcome to test command!",
    defaultPermission: true,
  },
  callback: async (interaction) => {
    await interaction.deferReply();
    const tags = await getLinkedTags(interaction.user.id.toString());
    const names = [];
    for (let i = 0; i < tags.length; i++) {
      const playerData = await getPlayer(tags[i]);
      names.push(playerData.name);
    }
    await interaction.editReply(`results: ${names}`);
    return true;
  },
};
