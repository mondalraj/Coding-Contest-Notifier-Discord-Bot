import { Client } from "discord.js";
import { IntentOptions } from "./config/IntentOptions";

(async () => {
  const BOT = new Client({intents: IntentOptions});

  await BOT.login(process.env.DISCORD_BOT_TOKEN);
})();
