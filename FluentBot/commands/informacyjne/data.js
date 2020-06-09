const { RichEmbed } = require("discord.js");
const { getMember } = require("../../functions.js");

module.exports = {
    name: "dane",
    aliases: ["data"],
    category: "informacyjne",
    description: "Wysyła liczbę otryzmanych przytuleń, uderzeń.",
    usage: "[nick | id | wzmianka]",
    run: async (client, message, args, connection) => {

        const member = getMember(message, args.join(" "))

        const embed = new RichEmbed()
        .setAuthor(`Dane użytkownika ${member.displayName}`, `https://cdn3.iconfinder.com/data/icons/hardware-icons/128/usb-stick-512.png`)
        .setColor('#88c5cc')
        .setThumbnail(member.user.avatarURL)
        .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL}`)
        .setTimestamp();

        connection.connect(error => {
          if (error) throw error;
        });

        connection.query(`SELECT * FROM userdata WHERE user_id = '${member.id}' && guild_id = '${message.guild.id}'`, async (err, rows) => {
            if (err) throw err;
            if (!rows[0]) {
              var hugs = 0;
              var slaps = 0;
            } else {
              var hugs = rows[0].hugs;
              var slaps = rows[0].slaps;
            }
            embed
              .addField(`Ilość uderzeń:`, slaps, true)
              .addField(`Ilość przytuleń:`, hugs, true);
            message.channel.send(embed);
            connection.end();
        });
    }
}