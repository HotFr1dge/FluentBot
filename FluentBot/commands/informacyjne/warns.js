const { RichEmbed } = require("discord.js");
const { getMember } = require("../../functions.js");

module.exports = {
    name: "ostrzeżenia",
    aliases: ["warns", "ostrzezenia"],
    category: "informacyjne",
    description: "Wysyła ilość ostrzeżeń.",
    usage: "[nick | id | wzmianka]",
    run: async (client, message, args, connection) => {

        const member = getMember(message, args.join(" "))

        const embed = new RichEmbed()
        .setAuthor(`Ostrzeżenia użytkownika ${member.displayName}`, `https://fluentbot.pl/img/danger.png`)
        .setColor('#ffc800')
        .setThumbnail(member.user.avatarURL)
        .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL}`)
        .setTimestamp();

        connection.connect(error => {
          if (error) throw error;
        });

        connection.query(`SELECT * FROM userdata WHERE user_id = '${member.id}' && guild_id = '${message.guild.id}'`, async (err, rows) => {
            if (err) throw err;
            if (!rows[0]) {
              var warns = 0
            } else {
              var warns = rows[0].warns;
            }
            embed.addField(`Ilość ostrzeżeń:`, warns);
            message.channel.send(embed);
            connection.end();
        });
    }
}