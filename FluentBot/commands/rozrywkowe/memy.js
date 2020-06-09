const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const superagent = require('superagent');

module.exports = {
    name: "memy",
    aliases: ["mem", "meme"],
    category: "rozrywkowe",
    description: "Wysyła losowego mema.",
    run: async (client, message, args) => {
        let { body } = await superagent
        .get(`https://rezzuapi.glitch.me/polskiememy`).catch(() => {
            return message.channel.send(new RichEmbed().setAuthor(`Błąd API`, `https://fluentbot.pl/img/error.png`).setDescription(`Wystąpił nieoczekiwany błąd API.`).setColor('#ea2d3f').setTimestamp().setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL}`));
        });

        const embed = new RichEmbed()
        .setAuthor(`LOSOWY MEM`)
        .setColor('RANDOM')
        .setTimestamp()
        .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL}`)
        .setImage(body.memy)

        message.channel.send(embed)
    }
}