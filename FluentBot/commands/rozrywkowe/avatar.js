const { RichEmbed } = require("discord.js");
const { getMember } = require("../../functions.js");

module.exports = {
    name: "awatar",
    aliases: ["avatar"],
    category: "rozrywkowe",
    description: "Wysyła awatar użytkownika oraz link do niego.",
    usage: "[nick | id | wzmianka]",
    run: async (client, message, args) => {
       const member = getMember(message, args.join(" "))
       const embed = new RichEmbed()
       .setAuthor(`Awatar użytkownika ${member.user.tag} (link)`, member.user.displayAvatarURL, member.user.displayAvatarURL)
       .setImage(member.user.displayAvatarURL)
       .setColor(member.displayHexColor === '#000000' ? '#ffffff' : member.displayHexColor)
       .setTimestamp()
       .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL}`)
       message.channel.send(embed)
    }
}