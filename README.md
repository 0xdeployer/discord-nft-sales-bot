# NFT sales Discord Bot

An open source NFT sales bot for Discord.

This bot was created for the [Pixelglyph](https://opensea.io/collection/pixelglyphs) Discord Server as part of the Pixelglyph DAO.

![Pixelglyph](https://lh3.googleusercontent.com/ml0cfmNMyzKM9MD-_Sam4lIYKaHCf6dxiD4v3I2XJ-rfflABGteBQlDNO8g0LPvgkH6_fB22jry_me1VpCIjm0OgwumuVW_1pXnDhA=w350)

This bot was inspired by [0xEssential's OpenSea Discord Bot](https://github.com/0xEssential/opensea-discord-bot). Rather than polling OpenSea APIs, this package sets up an event listener and listens to transfer events directly from the blockchain and posts to a specified channel in your Discord server. It supports ETH and WETH sales.

**Creating a bot**

See the https://github.com/0xEssential/opensea-discord-bot README for a good explanation of setting up your bot in the Discord developer portal.

---

### **This package requires Node 16.6.0 or greater**

---

**Installation**

```
yarn install discord-nft-sales-bot
```

**Usage**

Simple example:

```js
import nftSalesBot from "discord-nft-sales-bot";

nftSalesBot({
  // Websocket connection to Ethereum)
  websocketURI: process.env.WEBSOCKET_URI,

  // NFT smart contract address
  contractAddress: process.env.CONTRACT_ADDRESS,

  // Bot token set up in Discord developer portal
  discordBotToken: process.env.DISCORD_BOT_TOKEN,

  // ID of channel (turn on Developer mode in Discord to get this)
  discordChannelId: process.env.DISCORD_CHANNEL_ID,
}).catch((e) => {
  // something went wrong
});
```

## Options

The default export takes one argument which is an object with the following keys and values:

- `websocketURI` - Required. This is a websocket connection to Ethereum. You can easily get one of these by signing up for [Infura](https://infura.io).
- `contractAddress` - Required. The smart contract address for your ERC-721 smart contract.
- `discordBotToken` - Required. The Discord bot token for you bot. Create an application within the [Discord developer portal](https://discord.com/developers/applications) and then create a bot within that application that can has permissions to post messages. You can reveal the token from the bot screen.
- `discordChannelId` - Required. The ID of the channel you want to bot to post in. You can get this by turning on Developer mode in Discord and then clicking the settings icon of the channel.
- `metadataCb` - Optional. A function that receives the raw NFT metadata as the first argument. Must return an object of the following type `{ name: string; image: string }`
