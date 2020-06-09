const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { getMember } = require("../../functions.js");
const superagent = require('superagent');

module.exports = {
    name: "lis",
    aliases: ["fox"],
    category: "rozrywkowe",
    description: "Wysyła losowe zdjęcie lisa.",
    run: async (client, message, args) => {
        let { body } = await superagent
        .get(`https://some-random-api.ml/img/fox`).catch(() => {
            return message.channel.send(new RichEmbed().setAuthor(`Błąd API`, `https://fluentbot.pl/img/error.png`).setDescription(`Wystąpił nieoczekiwany błąd API.`).setColor('#ea2d3f').setTimestamp().setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL}`));
        });

        const embed = new RichEmbed()
        .setAuthor(`LOSOWE ZDJĘCIE LISA`, `https://fluentbot.pl/img/fox.png`)
        .setColor('#1f84ab')
        .setTimestamp()
        .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL}`)
        .setImage(body.link)

        message.channel.send(embed)
    }
}