const dotenv = require("dotenv");
dotenv.config();

const { Client, MessageEmbed } = require("discord.js");
const codechef = require("./contests/codechef").default;

const prefix = "$";
const client = new Client({
  allowedMentions: {
    parse: ["users", "roles"],
    repliedUser: true,
  },
  partials: ["MESSAGE"],
  intents: [
    "GUILDS",
    "GUILD_MESSAGES",
    "GUILD_PRESENCES",
    "GUILD_MEMBERS",
    "GUILD_MESSAGE_REACTIONS",
  ],
});

client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  // const channel = client.channels.cache.get(process.env.CP_CONTESTS_CHANNEL_ID);

  // Automatically Send Contest Reminders between 15-16 hours only once
  // setInterval(async () => {
  //   var hour = new Date().getHours();
  //   if (hour > 15 && hour < 16) {
  //     const data = await codechef();
  //     sendContestHandler(data, channel);
  //   }
  // }, 1000 * 60 * 60);
});

client.on("messageCreate", async (msg) => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;

  const args = msg.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  // test command
  if (command === "testing") {
    msg.channel.send(
      `Coding Contest Notifier Bot is running properly, Thanks ${msg.author.username}`
    );
  }

  // Send all codechef contests
  if (command === "codechef") {
    const channel = client.channels.cache.get(
      process.env.CP_CONTESTS_CHANNEL_ID
    );
    const data = await codechef();
    sendContestHandler(data, channel);
  }
});

const sendContestHandler = (data, channel) => {
  data.forEach((contest) => {
    const embedTemplate = new MessageEmbed()
      .setColor("#61ab70")
      .setTitle(contest.name)
      .setURL(contest.url)
      .setAuthor({
        name: contest.organizer,
        iconURL: contest.orgLogo,
      })
      .addFields(
        { name: "Date", value: contest.date },
        { name: "Time", value: contest.time, inline: true },
        { name: "Duration", value: contest.duration, inline: true }
      );

    channel.send({ embeds: [embedTemplate] });
  });
};

// setInterval(() => {
//   console.log("Code is running");
// }, 3000);

client.login(process.env.DISCORD_BOT_TOKEN);
