const dotenv = require("dotenv");
dotenv.config();

const Discord = require("discord.js");
const prefix = "$";
const client = new Discord.Client({
  allowedMentions: {
    parse: ["users", "roles"],
    repliedUser: true,
  },
  intents: [
    "GUILDS",
    "GUILD_MESSAGES",
    "GUILD_PRESENCES",
    "GUILD_MEMBERS",
    "GUILD_MESSAGE_REACTIONS",
  ],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (msg) => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;

  const args = msg.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  // test command
  if (command === "test") {
    msg.channel.send("Coding Contest Notifier Bot is running properly!");
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
