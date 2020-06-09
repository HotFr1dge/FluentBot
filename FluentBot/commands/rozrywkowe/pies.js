const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const superagent = require('superagent');

module.exports = {
    name: "pies",
    aliases: ["dog"],
    category: "rozrywkowe",
    description: "Wysyła losowe zdjęcie psa.",
    run: async (client, message, args) => {
        let { body } = await superagent
        .get(`https://some-random-api.ml/img/dog`).catch(() => {
            return message.channel.send(new RichEmbed().setAuthor(`Błąd API`, `https://fluentbot.pl/img/error.png`).setDescription(`Wystąpił nieoczekiwany błąd API.`).setColor('#ea2d3f').setTimestamp().setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL}`));
        });

        const embed = new RichEmbed()
        .setAuthor(`LOSOWE ZDJĘCIE PSA`, `https://fluentbot.pl/img/dog.png`)
        .setColor('#f2cf61')
        .setTimestamp()
        .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL}`)
        .setImage(body.link)

        message.channel.send(embed)
    }
}