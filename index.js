require('dotenv').config();

const express = require('express')
const path = require('path')
const irish = require('./irish');
const PORT = process.env.PORT || 5000

const { Routes } = require('discord-api-types/v9');

const { Client, Intents } = require('discord.js');


//const app = express();

/*app.get('/api/count', (req, res) => {
  date = new Date()
  while (date.getDay() != 6) {
    date.setDate(date.getDate() + 1)
  }
  irish.countAvailableTables(8, date).then((data) => {
    res.json({open:data, date:date.toDateString()});
  })
})

app.listen(PORT, () => console.log(`Listening on ${PORT}`))
*/

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});


client.on("messageCreate", (message) => {
  if (message.content.startsWith("ping")) {
    console.log(message.author);
    message.channel.send("pong!");
  }
});

irish.ev.on("change", (data) => {
  if(data.number == 5 || data.number == 3 || data.number == 1) {
    client.channels.cache.get("739807740691248897").send(`Only ${data.number} tables available on ${data.date.toDateString()}`);
  }
  client.users.cache.get("304699475757236224").send(`${data.number} tables available on ${data.date.toDateString()}`);
  console.log(data);
});

irish.ev.on("update", (data) => {
  console.log("update:" + JSON.stringify(data));
});


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.users.fetch("304699475757236224");
});

//355343782012780544 xFall
//688038286387839173 Mathias Garstenauer
//304699475757236224 Benjamin Bachmayr


client.login(process.env.DISCORD_TOKEN);


