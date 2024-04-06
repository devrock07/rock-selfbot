const {
    Client,
    WebhookClient
  } = require("discord.js-selfbot-v13");
  const fs = require('fs');
  const {
    token,
    prefix,
    allowedUserIDs
  } = require("./config");
  const client = new Client();
  const commands = [];
  client.on("ready", () => {
    console.log("Logged in as " + client.user.tag);
  });
  client.on("messageCreate", _0x3c7987 => {
    if (!_0x3c7987.author || _0x3c7987.author.bot) {
      return;
    }
    if (!_0x3c7987.content.startsWith(prefix)) {
      return;
    }
    const _0x108385 = _0x3c7987.content.slice(prefix.length).trim().split(/ +/);
    const _0x457fbb = _0x108385.shift().toLowerCase();
    const _0x440256 = commands.find(_0xa7fe14 => _0xa7fe14.name === _0x457fbb);
    if (!_0x440256) {
      return;
    }
    if (!allowedUserIDs.includes(_0x3c7987.author.id)) {
      return _0x3c7987.channel.send("You are not allowed to use this command.")["catch"](console.error);
    }
    _0x440256.execute(_0x3c7987.channel, _0x3c7987, client, _0x108385);
    console.log("Spawned " + _0x457fbb + " command ✅");
  });
  fs.readdirSync("./commands").filter(_0x4ba747 => _0x4ba747.endsWith(".js")).forEach(_0x210856 => {
    const _0x28ade0 = require("./commands/" + _0x210856);
    commands.push(_0x28ade0);
    console.log("Loaded command: " + _0x28ade0.name);
  });
  client.login(token);