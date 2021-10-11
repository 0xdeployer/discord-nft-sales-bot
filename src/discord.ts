import { format } from "date-fns";
import Discord, { Intents, TextChannel } from "discord.js";

export const discordSetup = (): Promise<TextChannel> => {
  const discordBot = new Discord.Client({
    intents: [Intents.FLAGS.GUILD_MESSAGES],
  });
  return new Promise<TextChannel>((resolve, reject) => {
    ["DISCORD_BOT_TOKEN", "DISCORD_CHANNEL_ID"].forEach((envVar) => {
      if (!process.env[envVar]) reject(`${envVar} not set`);
    });

    discordBot.login(process.env.DISCORD_BOT_TOKEN);
    discordBot.on("ready", async () => {
      const channel = await discordBot.channels.fetch(
        process.env.DISCORD_CHANNEL_ID as string
      );
      resolve(channel as TextChannel);
    });
  });
};

export const createMessage = (
  metadata: { name: string; image: string },
  value: string,
  buyer: string,
  seller: string,
  timestamp: string | number,
  contractAddress: string,
  tokenId: string
) =>
  new Discord.MessageEmbed()
    .setColor("#66ff82")
    .setTitle(`${metadata.name} sold!`)
    .setAuthor(
      "NFT Sales Bot",
      "https://lh3.googleusercontent.com/JwIqBA0ilWVKXhRMG7kWTqfSZWaDQtYPbgVAAVrtZ4l1FxTbrdWVSZaB2K3gwXU5TAR3sqB0_8H8dWysOTGtczNK7zaoOJcCYR9iir8=w600",
      "https://github.com/nftboi/discord-nft-sales-bot"
    )
    .addFields(
      { name: "Name", value: metadata.name },
      { name: "Amount", value: `${value} Ξ` },
      { name: "Buyer", value: buyer },
      { name: "Seller", value: seller },
      {
        name: "Block Time",
        value: format(
          new Date(parseInt(timestamp as string) * 1000),
          "MMM do y h:mm a"
        ),
      }
    )
    .setURL(`https://opensea.io/assets/${contractAddress}/${tokenId}`)
    .setImage(metadata.image);
