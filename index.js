const Discord = require("discord.js");
const client = new Discord.Client({
  disableEveryone: true
});

const db = require('quick.db');
const queue = new Map();
const fs = require("fs");

const config = require("./config.json");
const color = config.color
const prefix = config.prefix;

const chalk = require('chalk');
const Enmap = require("enmap");

const defaultSettings = {
  calmmode: false,
  familyfriendly: false,
  ranking: false
}

const ms = require("parse-ms");

client.leveling = new Enmap({name: "leveling"});
client.settings = new Enmap({
  name: "settings",
  fetchAll: false,
  autoFetch: true,
  cloneLevel: 'deep'
});

let guildSize = client.guilds.size;

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir("./commands/fun/", (err, files) => {
    
  if(err) console.error((err));
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0) return;
  
    jsfile.forEach((f, i) => {
        delete require.cache[require.resolve(`./commands/fun/${f}`)]
        let props = require(`./commands/fun/${f}`)
        client.commands.set(props.help.name, props);
        props.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);   
    });
  });
});

fs.readdir("./commands/tickets/", (err, files) => {
    
  if(err) console.error((err));
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0) return;
  
    jsfile.forEach((f, i) => {
        delete require.cache[require.resolve(`./commands/tickets/${f}`)]
        let props = require(`./commands/tickets/${f}`)
        client.commands.set(props.help.name, props);
        props.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);   
    });
  });
});

fs.readdir("./commands/user/", (err, files) => {
    
  if(err) console.error((err));
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0) return;
  
    jsfile.forEach((f, i) => {
        delete require.cache[require.resolve(`./commands/user/${f}`)]
        let props = require(`./commands/user/${f}`)
        client.commands.set(props.help.name, props);
        props.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);   
    });
  });
});


fs.readdir("./commands/game/", (err, files) => {
    
  if(err) console.error((err));
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0) return;
  
    jsfile.forEach((f, i) => {
        delete require.cache[require.resolve(`./commands/game/${f}`)]
        let props = require(`./commands/game/${f}`)
        client.commands.set(props.help.name, props);
        props.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);   
    });
  });
});

fs.readdir("./commands/music/", (err, files) => {
    
  if(err) console.error((err));
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0) return;
  
    jsfile.forEach((f, i) => {
        delete require.cache[require.resolve(`./commands/music/${f}`)]
        let props = require(`./commands/music/${f}`)
        client.commands.set(props.help.name, props);
        props.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);   
    });
  });
});

fs.readdir("./commands/config/", (err, files) => {
    
  if(err) console.error((err));
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0) return;
  
    jsfile.forEach((f, i) => {
        delete require.cache[require.resolve(`./commands/config/${f}`)]
        let props = require(`./commands/config/${f}`)
        client.commands.set(props.help.name, props);
        props.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);   
    });
  });
});

fs.readdir("./commands/mod/", (err, files) => {
    
  if(err) console.error((err));
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0) return;
  
    jsfile.forEach((f, i) => {
        delete require.cache[require.resolve(`./commands/mod/${f}`)]
        let props = require(`./commands/mod/${f}`)
        client.commands.set(props.help.name, props);
        props.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);   
    });
  });
});

fs.readdir("./commands/misc/", (err, files) => {
    
  if(err) console.error((err));
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0) return;
  
    jsfile.forEach((f, i) => {
        delete require.cache[require.resolve(`./commands/misc/${f}`)]
        let props = require(`./commands/misc/${f}`)
        client.commands.set(props.help.name, props);
        props.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);   
    });
  });
});

fs.readdir("./commands/server/", (err, files) => {
    
  if(err) console.error((err));
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0) return;
  
    jsfile.forEach((f, i) => {
        delete require.cache[require.resolve(`./commands/server/${f}`)]
        let props = require(`./commands/server/${f}`)
        client.commands.set(props.help.name, props);
        props.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);   
    });
  });
});

fs.readdir("./commands/dev/", (err, files) => {
    
  if(err) console.error((err));
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0) return;
  
    jsfile.forEach((f, i) => {
        delete require.cache[require.resolve(`./commands/dev/${f}`)]
        let props = require(`./commands/dev/${f}`)
        client.commands.set(props.help.name, props);
        props.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);   
    });
  });
});

fs.readdir("./events/", (async function (err, files) {
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  
  jsfile.forEach(file => {
    const eventName = file.split(".")[0];
    const event = new(require(`./events/${file}`))(client);
  
    client.on(eventName, (...args) => event.run(...args));
    const mod = require.cache[require.resolve(`./events/${file}`)];
    delete require.cache[require.resolve(`./events/${file}`)];
    const index = mod.parent.children.indexOf(mod);
    if (index !== -1) mod.parent.children.splice(index, 1);
  });
}))

client.on("message", async message => {
  
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  
  if(!message.content.startsWith(prefix)) return;
  let messageArray = message.content.split(/\s+/g);
  let command = messageArray[0];
  let args = messageArray.slice(1);

  if(!command.startsWith(prefix)) return;
  
    if (client.aliases.has(command.slice(prefix.length).toLowerCase())) {
        client.commands.get(client.aliases.get(command.slice(prefix.length).toLowerCase())).run(client, message, args, prefix, queue)
    }
        
    if (client.commands.has(command.slice(prefix.length).toLowerCase())) {
       client.commands.get(command.slice(prefix.length).toLowerCase()).run(client, message, args, prefix, queue)
    }
})

client.on("guildDelete", guild => {
  client.settings.delete(guild.id);
  client.leveling.delete(guild.id);
});

client.on('guildMemberAdd', member => {

  db.fetch(`wChannel_${member.guild.id}`).then(i => {
    
    if (!i || i === null) return;
    
  db.fetch(`wMessage_${member.guild.id}`).then(msg => {
    
   let log = member.guild.channels.get(i);
   if (!log) return;
    
   log.send(`${msg}`)
    
  })
  })
  
})

client.on('guildMemberAdd', member => {

  db.fetch(`vclog_${member.guild.id}`, "off").then(check => {
    if (check === "off") return;
  })
  
  db.fetch(`vclog1_${member.guild.id}`).then(one => {
  db.fetch(`vclog2_${member.guild.id}`).then(two => {
  db.fetch(`vclog3_${member.guild.id}`).then(three => {

    if(one && two && three == null) {
      return db.set(`vclog_${member.guild.id}`, "off");
    }
    
    if(one == null) return;
    if(two == null) return;
    if(three == null) return;

  let members = member.guild.members.size;
  member.guild.channels.get(`${one}`).setName(`Member Count: ${members}`)
  let humans = member.guild.members.filter(m => !m.user.bot).size;
   member.guild.channels.get(`${two}`).setName(`Human Count: ${humans}`)
  let bots = member.guild.members.filter(m => m.user.bot).size;
  member.guild.channels.get(`${three}`).setName(`Bot Count: ${bots}`)
  })
  })
  }) 

})

client.on('guildMemberRemove', member => {
  
  db.fetch(`vclog_${member.guild.id}`, "off").then(check => {
    if (check === "off") return;
  })
  
  db.fetch(`vclog1_${member.guild.id}`).then(one => {
  db.fetch(`vclog2_${member.guild.id}`).then(two => {
  db.fetch(`vclog3_${member.guild.id}`).then(three => {

    if(one && two && three == null) {
      return db.set(`vclog_${member.guild.id}`, "off");
    }
    
    if(one == null) return;
    if(two == null) return;
    if(three == null) return;
            
  let members = member.guild.members.size;
  member.guild.channels.get(`${one}`).setName(`Member Count: ${members}`)
  let humans = member.guild.members.filter(m => !m.user.bot).size;
  member.guild.channels.get(`${two}`).setName(`Human Count: ${humans}`)
  let bots = member.guild.members.filter(m => m.user.bot).size;
  member.guild.channels.get(`${three}`).setName(`Bot Count: ${bots}`)
  })
  })
  })
  
})

client.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  const defaultSettings = {
  calmmode: false,
  familyfriendly: false,
  ranking: false
  }
  
  client.settings.ensure(message.guild.id, defaultSettings);
  
 let swear = client.settings.get(message.guild.id, "familyfriendly"); 
 if (swear === true) {
  
 let embed = new Discord.RichEmbed() 
 .setAuthor(message.author.username, message.author.displayAvatarURL)
  
 let swearWords = [
   "bitch", 
   "ass", 
   "fuck"]
 if (swearWords.includes(message.content)) {
   message.delete()
   embed.setColor(color)
   embed.setDescription('<:ManeDeny:508609685859991553> • Profanity is not permitted in this discord.')
   return message.channel.send({embed: embed})
 } }
  
 let current = client.settings.get(message.guild.id, "calmmode");
 if (current === true) {
  
  if (message.content === "(╯°□°）╯︵ ┻━┻" || message.content === "/tableflip") return message.channel.send(`┬─┬ ノ( ゜-゜ノ)  ᴄᴀʟᴍ ᴅᴏᴡɴ`)
   
 }
})

client.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  
  let time = 120000;
  let cool = await db.fetch(`time_${message.author.id}`);
    
   if (client.settings.get(message.guild.id, "ranking") == false) {
  
   return;
    
   }
      
   else {

  if (time !== null && time - (Date.now() - cool) > 0) {
  let timeObj = ms(time - (Date.now() - cool)); 
    return; 
    
  } else {
    
  // Ranking System
  const key = `${message.guild.id}-${message.author.id}`;
  client.leveling.ensure(key, {
    user: message.author.id,
    guild: message.guild.id,
    xp: 0,
    level: 1
  });
  db.set(`time_${message.author.id}`, Date.now());
  let randomXP = Math.floor(Math.random() * 7) + 1; // This gives me a random number 1-7
  client.leveling.math(key, "+", randomXP, "xp");
  
  const embedForRank = new Discord.RichEmbed()
  .setColor(config.color);
  
    if (client.leveling.get(key, "level") * 100 <= client.leveling.get(key, "xp")) {
      let nextLevel = client.leveling.get(key, "level") + 1
      // embedForRank.setDescription(`You've leveled up to level **${nextLevel}**! Isn't that dandy?`);
      // message.author.send({embed: embedForRank})
      client.leveling.set(key, nextLevel, "level"); 
    }
  }
}
  
  // > End of Ranking System
  
})

client.on("message", async message => {
  
let user = message.guild.member(message.mentions.users.first())
let check = await db.fetch(`afkmessage_${message.author.id}`, {
 target: '.statment' 
})
  
if (check !== null) {
  
  if (message.content.includes('.afk')) return;
  
  db.delete(`afkmessage_${message.author.id}`)
  
  return message.author.send(`Your AFK status has been removed.`)
  
} else if (!user) {
  return;
}else if (message.channel.type !== "dm" && message.channel.type !== "group" && message.content.includes('<@'+user.id+'>') || message.content.includes('<@!'+user.id+'>')) {  
    
  let statement = await db.fetch(`afkmessage_${user.id}`, {
            target: '.statement'
  })

  if (statement === null) return;
  
  let embed = new Discord.RichEmbed()
  .setColor(color)
  .setAuthor(user.user.tag, user.user.displayAvatarURL)
  .setDescription(`**${user.user.username}** is AFK: ${statement}`)
    
  if (statement) return message.channel.send({embed: embed}) 
  }
  
})

client.on('message', (message) => {
  
  if(message.channel.type == "dm" || message.channel.type == "group") return;
  if(message.guild == null) return;
  if(message.author.bot) return;
  
  db.fetch(`adMessage_${message.guild.id}`).then(ad => {
    
   if (!ad) return;
    
   if (ad === "off") {
  
   return;
    
   }
      
   else if (ad === "on"){
  
    db.fetch(`logsChannel_${message.guild.id}`).then(channel => {
    let log = message.guild.channels.get(channel)
          
    if (message.content.startsWith("+play")) return;
    if (message.content.startsWith("+Play")) return;

    if(message.content.match(/\b(?:https?:\/\/)?discord(?:app)?\.(?:com\/invite\/|gg)+\/*([A-Za-z_0-9]+)/g)) {
      
  let manageBot = new Discord.RichEmbed()
  .setAuthor(`${client.user.tag}`, client.user.displayAvatarURL)
  .setColor(color)
  .setDescription("**<:ManeDeny:508609685859991553> Insufficient Permissions (Adblock)**\n\nI am missing - > `MANAGE MESSAGES`")

  if(!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) return message.channel.send({embed: manageBot});
      
    if(message.member.hasPermission("ADMINISTRATOR")) return;
      
    message.delete().then(m => {
        
    let advert = new Discord.RichEmbed()
    .setAuthor(`Link • Detection`, `${message.author.avatarURL}`)
    .setColor(color)
    .setTimestamp()
    .setDescription(`**Link sent by <@${message.author.id}>**\n\n***Invite Link (Advert)***`)
    .setFooter(`ID: ${message.author.id}`);
        
    if (!log) return;
    log.send(advert)
        
      })
                                       
    } else {
                            
    if(message.content.match(/\bhttps?:\/\/\S+/i)) {
      
    if(message.member.hasPermission("ADMINISTRATOR")) return;
      
  let manageBo = new Discord.RichEmbed()
  .setAuthor(`${client.user.tag}`, client.user.displayAvatarURL)
  .setColor(color)
  .setDescription("**<:ManeDeny:508609685859991553> Insufficient Permissions (Adblock)**\n\nI am missing - > `MANAGE MESSAGES`")

  if(!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) return message.channel.send({embed: manageBo});

    message.delete().then(m => {
        
    let adver = new Discord.RichEmbed()
    .setAuthor(`Link • Detection`, `${message.author.avatarURL}`)
    .setColor(color)
    .setTimestamp()
    .setDescription(`**Link sent by <@${message.author.id}>**\n\n***Browser Link (Advert)***`)
    .setFooter(`ID: ${message.author.id}`);
    
    if (!log) return;
    log.send(adver)
      })
    }
    }
   })
   }
    })
});

//client.login(token);