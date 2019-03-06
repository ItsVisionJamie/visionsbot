const Discord = require("discord.js");
const db = require('quick.db');
const client = new Discord.Client({ disableEveryone: true });
const fs = require("fs");

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

const config = require("./config.json");

const color = config.color;
const prefix = config.prefix;

fs.readdir("./cmds/", (err, files) => {
    
  if(err) console.error((err));
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0) { return; }
  
    jsfile.forEach((f, i) => {
        delete require.cache[require.resolve(`./cmds/${f}`)]
        let props = require(`./cmds/${f}`)
        console.log(`${i + 1}: ${f} loaded!`);
        client.commands.set(props.help.name, props);
        props.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);   
    });
  });
});

client.on("message", async message => {
  
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  
  if(!message.content.startsWith(prefix)) return;
  let messageArray = message.content.split(/\s+/g);
  let command = messageArray[0];
  let args = messageArray.slice(1);

  if(!command.startsWith(prefix)) return;
  
    if (client.aliases.has(command.slice(prefix.length).toLowerCase())) {
        client.commands.get(client.aliases.get(command.slice(prefix.length).toLowerCase())).run(client, message, args, color, prefix)
    }
        
    if (client.commands.has(command.slice(prefix.length).toLowerCase())) {
       client.commands.get(command.slice(prefix.length).toLowerCase()).run(client, message, args, color, prefix)
    }
})

client.on("ready", async () => {     
  console.log("           ")
  console.log("           ")
  console.log("           ")
  console.log("           ")
  console.log(`        • ${client.user.tag} •      `)
  console.log("       Cruise™ Production      ")
  
  client.user.setStatus(`dnd`);
  client.user.setGame(`Locked`)
})

client.on('raw', async event => {
 
  if (event.t === 'MESSAGE_REACTION_ADD' || event.t == "MESSAGE_REACTION_REMOVE"){
  const { d: data } = event;
  
  //message channel
  const channel = await client.channels.get(data.channel_id);
  if (channel.id !== "520242159752970249") return;
  //check message
  const message = await channel.fetchMessage(data.message_id);
  //user
  let user = message.guild.members.get(data.user_id);
  //channel type
  if (message.channel.type != 'text') return;
  //emotes
  const emojiKey = await (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
  const reaction = await message.reactions.get(emojiKey);
    
  //emote check
  if (data.emoji.name !== '✅') return;

  if (user.id !== client.user.id){   
  
    let role = message.guild.roles.find(r => r.name === "Verified");
    let member = message.guild.members.get(user.id);

     if (event.t === "MESSAGE_REACTION_ADD"){
       member.addRole(role);
     } else {
       member.removeRole(role);
     }
  }
  }//end
    
});

//client.login(TOKEN);

