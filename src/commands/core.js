import { getLinkedTags, getLinkedUser } from "../connectToDB.js";

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
    const discordId = await getLinkedTags(interaction.user.id.toString());
    await interaction.editReply(`results: ${discordId}`);
    return true;
  },
};
