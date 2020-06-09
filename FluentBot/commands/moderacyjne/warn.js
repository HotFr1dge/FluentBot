const { RichEmbed } = require("discord.js");

module.exports = {
    name: "warn",
    aliases: ["ostrzeż","ostrzez"],
    category: "moderacyjne",
    description: "Ostrzeżenie użytkownika.",
    usage: "<id | wzmianka> [powód]",
    run: async (client, message, args, connection) => {

        if (!message.member.hasPermission("MANAGE_MESSAGES")) 
        return message.reply("❌ Nie masz uprawnień do użycia tej komendy!").then(m => m.delete(5000) && message.delete(5000));

        if (!args[0]) {
            const embed = new RichEmbed()
            .setColor('#ea2d3f')
            .setAuthor(`Błędnie użyta komenda.`, `https://fluentbot.pl/img/error.png`)
            .setDescription(`Poprawny format: \`${process.env.PREFIX}${module.exports.name}${module.exports.usage ? ' ' + module.exports.usage : ''}\``)
            .setFooter(`Wpisz ${process.env.PREFIX}pomoc ${module.exports.name} aby zobaczyć więcej.`);
            return message.channel.send(embed).then(m => m.delete(5000) && message.delete(5000));
        }

        if (args[1]) {
            var powód = args.slice(1).join(" ");
        }

        const member = message.mentions.members.first() || message.guild.members.get(args[0]);

        if (!member) {
            const embed = new RichEmbed()
            .setColor('#ea2d3f')
            .setAuthor(`Błąd.`, `https://fluentbot.pl/img/error.png`)
            .setDescription(`Nie znaleziono takiego użytkownika.`)
            .setTimestamp()
            .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL}`)
            return message.channel.send(embed).then(m => m.delete(5000) && message.delete(5000));
        }

        if (member === message.member || member.user.bot) {
            return message.channel.send(new RichEmbed().setAuthor(`Błąd`, `https://fluentbot.pl/img/error.png`).setDescription(`Nie możesz ostrzec tego użytkownika.`).setColor('#ea2d3f').setTimestamp().setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL}`)).then(m => m.delete(5000) && message.delete(5000));
        }

        const embed = new RichEmbed()
        .setAuthor(`DODANO OSTRZEŻENIE`, `https://fluentbot.pl/img/danger.png`)
        .setDescription(`${message.author} ostrzegł/a ${member}`)
        .setThumbnail(member.user.avatarURL)
        .setTimestamp()
        .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL}`)
        .setColor('#ffc800')
        powód ? embed.addField(`Powód:`, powód, false) : "";

        connection.connect(error => {
            if (error) throw error;
        });

        connection.query(`SELECT * FROM userdata WHERE user_id = '${member.id}' && guild_id = '${message.guild.id}'`, (err, rows) => {
            if (err) throw err;
            let sql;
            if (rows.length < 1) {
                sql = `INSERT INTO userdata (guild_id, user_id, hugs, slaps, warns) VALUES ('${message.guild.id}', '${member.id}', 0, 0, 1)`;
                connection.query(sql, message.channel.send(embed))
            } else {
                let warns = rows[0].warns;
                sql = `UPDATE userdata SET warns = ${warns+1} WHERE user_id = '${member.id}' && guild_id = '${message.guild.id}'`;
                connection.query(sql, message.channel.send(embed))
            }
            connection.end();
        });
    }
}