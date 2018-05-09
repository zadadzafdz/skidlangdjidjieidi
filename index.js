const fs = require('fs');
const Discord = require('discord.js');
const bot = new Discord.Client();

bot.on('ready',() => {
    console.log(`Je suis connecté `)
})

bot.on("guildMemberAdd", member => {
let bienvenue_embed = new Discord.RichEmbed()

.addField(`Member Join`, member.user.username+ ` à rejoin le serveur`)
.setColor("RANDOM")
.setThumbnail(member.user.avatarURL)
.setFooter(member.id+" "+member.user.tag)
.addField("Discriminator", "#"+member.user.discriminator)
.addField("Date de creation du compte", member.user.createdAt)
bot.channels.find("id", "436225950485839881").send(bienvenue_embed)

})

bot.on("guildMemberLeave", member => {
    let aurevoir_embed = new Discord.RichEmbed()
    .addField("Member Leave", member.user.username+ `à quitter le serveur, quel pd :hap:`)
    .setColor("RANDOM")
    .setThumbnail(member.user.avatarURL)
    .setFooter(member.id+" "+member.user.tag)
    .addField("Discriminator", "#"+member.user.discriminator)
    .addField("Date de creation du compte", member.user.createdAt)
    .addField("Dernier message qu'il a envoyer + Id du message", member.user.lastMessageID+" "+member.user.lastMessage)
    bot.channels.find("id", "436225950485839881".send(aurevoir_embed))
})

bot.on("message", message => { 
   
    var args = message.content.split(" ").slice(1)
    if(message.content.startsWith("t!hackban")){
        
        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`**:x: Tu n'as pas assez de droit pour bannir**`)
  
          var reason = args.join(" ") || "none";
  
         message.guild.ban(args[0], reason).then(user => {
              message.channel.send("**"+ `${user.tag || user.id || args[0]}` + " à été hackban**");
         }).catch(err => {
            message.channel.send(":x: Erreur, je n'ai pas réussi a le bannir :x:");
  
         })           
  
    }
  });

bot.on("message", message => {
    if(message.content.startsWith("t!avatar")) {
        let membere = message.mentions.members.first()
        let avatar_embed = new Discord.RichEmbed()
        .setAuthor("Avatar")
        .setColor("RANDOM")
        .setImage(membere.user.avatarURL)
        .setFooter(" Thomas Bot ! (:")
        return message.channel.send(avatar_embed)
    }
})

bot.on("message", message => {
    if(message.content.startsWith("t!say")) {
    if(message.deletable) {
    message.delete()}
var text = message.content.split(" ").slice(1).join(" ")
if(!text){
    messsage.channel.send("Tu ne m'as pas donner un message à répéter :x:")
}
let embed = new Discord.RichEmbed();
embed.setColor("RANDOM")
.setDescription(text)
message.channel.sendEmbed(
    embed, {
      disableEveryone: true
    }
  );
}
})

bot.on("message", message => {
    if (message.content.startsWith('t!renameall')) {
        if(message.deletable){
            message.delete()
        }
        if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`**:x: Tu n'as pas assez de droit pour gérer le serveur !**`)
        name1 = message.content.split(" ").slice(1).join(" ")
        message.guild.members.forEach(member => {
            if(member.setNickname(name1));
            
        })
    }
})

bot.on("message", message => {
    if(message.content.startsWith("t!help")) {
        let help_embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setTitle("COMMANDES")
        .addField("t!renameall", "Rename toutes les personnes du serveur, vous devez avoir la permission de gérer le serveur")
        .addField("t!hackban", "Ban un membre via son id, le membre peut ne pas être sur le serv (vous devez avoir la permission de bannir des jours)")
        .addField("t!avatar","Vous permet de récupérer la pdp d'un joueur ! ")
        .addField("t!say", "Fais répéter un message au bot")
        .setFooter("Thomas Bot ! (:")
        return message.channel.send(help_embed)
    }
})

bot.login(process.env.BOT_TOKEN)
