const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const superagent = require('superagent');

module.exports = {
    name: "koala",
    category: "rozrywkowe",
    description: "Wysyła losowe zdjęcie koali.",
    run: async (client, message, args) => {
        let { body } = await superagent
        .get(`https://some-random-api.ml/img/koala`).catch(() => {
            return message.channel.send(new RichEmbed().setAuthor(`Błąd API`, `https://fluentbot.pl/img/error.png`).setDescription(`Wystąpił nieoczekiwany błąd API.`).setColor('#ea2d3f').setTimestamp().setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL}`));
        });

        const embed = new RichEmbed()
        .setAuthor(`LOSOWE ZDJĘCIE KOALI`, `https://fluentbot.pl/img/koala.png`)
        .setColor('#324a5e')
        .setTimestamp()
        .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL}`)
        .setImage(body.link)

        message.channel.send(embed)
    }
}