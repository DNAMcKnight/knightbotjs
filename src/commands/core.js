const run = async (command) => {
  await command.reply("pong!");
  return true;
};

export const PingCommand = {
  data: {
    name: "ping",
    description: "Replies with pong!",
    defaultPermission: true,
  },
  run,
};
