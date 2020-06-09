const { RichEmbed } = require("discord.js");
const superagent = require('superagent');
const { getMember } = require("../../functions.js");
let cooldown = new Set()
let cdseconds = 60

module.exports = {
    name: "slap",
    aliases: ["uderz"],
    category: "rozrywkowe",
    description: "Uderza użytkownika.",
    usage: "<nick | id | wzmianka>",
    run: async (client, message, args, connection) => {

        if (!args[0]) {
            const embed = new RichEmbed()
            .setColor('#ea2d3f')
            .setAuthor(`Błędnie użyta komenda.`, `https://fluentbot.pl/img/error.png`)
            .setDescription(`Poprawny format: \`${process.env.PREFIX}${module.exports.name}${module.exports.usage ? ' ' + module.exports.usage : ''}\``)
            .setFooter(`Wpisz ${process.env.PREFIX}pomoc ${module.exports.name} aby zobaczyć więcej.`);
            return message.channel.send(embed).then(m => m.delete(5000) && message.delete(5000));
        }

        if (cooldown.has(message.author.id)) {
            return message.channel.send(new RichEmbed().setAuthor(`Błąd`, `https://fluentbot.pl/img/error.png`).setDescription(`Musisz poczekać aby użyć tej komendy ponownie.`).setColor('#ea2d3f').setTimestamp().setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL}`)).then(m => m.delete(5000) && message.delete(5000));
        }

        cooldown.add(message.author.id);

                const member = getMember(message, args.join(" "));

        if (member === message.member || member.user.bot) {
            return message.channel.send(new RichEmbed().setAuthor(`Błąd`, `https://fluentbot.pl/img/error.png`).setDescription(`Nie możesz uderzyć tego użytkownika.`).setColor('#ea2d3f').setTimestamp().setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL}`)).then(m => m.delete(5000) && message.delete(5000));
        }

        let { body } = await superagent
        .get(`https://nekos.life/api/v2/img/slap`).catch(() => {
            return message.channel.send(new RichEmbed().setAuthor(`Błąd API`, `https://fluentbot.pl/img/error.png`).setDescription(`Wystąpił nieoczekiwany błąd API.`).setColor('#ea2d3f').setTimestamp().setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL}`));
        });

        const embed = new RichEmbed()
        .setColor('#4095fc')
        .setAuthor(`${message.member.displayName} uderzył/a ${member.displayName}`)
        .setImage(body.url)
        .setTimestamp()
        .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL}`)

        connection.connect(error => {
            if (error) throw error;
        });

        connection.query(`SELECT * FROM userdata WHERE user_id = '${member.id}' && guild_id = '${message.guild.id}'`, (err, rows) => {
            if (err) throw err;
            let sql;
            if (rows.length < 1) {
                sql = `INSERT INTO userdata (guild_id, user_id, hugs, slaps, warns) VALUES ('${message.guild.id}', '${member.id}', 0, 1, 0)`;
                connection.query(sql, message.channel.send(embed))
            } else {
                let slaps = rows[0].slaps;
                sql = `UPDATE userdata SET slaps = ${slaps+1} WHERE user_id = '${member.id}' && guild_id = '${message.guild.id}'`;
                connection.query(sql, message.channel.send(embed))
            }
            connection.end();
        });

        setTimeout(() => {
            cooldown.delete(message.author.id)
        }, cdseconds * 1000);
    }
}