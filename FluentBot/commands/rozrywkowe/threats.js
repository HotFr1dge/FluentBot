const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const superagent = require('superagent');

module.exports = {
    name: "threats",
    aliases: ["zagrożenia", "zagrozenia"],
    category: "rozrywkowe",
    description: "Generuje mema z zagrożeniami.",
    usage: "<URL obrazu | wzmianka>",
    run: async (client, message, args) => {

        if (!args[0]) {
            const embed = new RichEmbed()
            .setColor('#ea2d3f')
            .setAuthor(`Błędnie użyta komenda.`, `https://fluentbot.pl/img/error.png`)
            .setDescription(`Poprawny format: \`${process.env.PREFIX}${module.exports.name}${module.exports.usage ? ' ' + module.exports.usage : ''}\``)
            .setFooter(`Wpisz ${process.env.PREFIX}pomoc ${module.exports.name} aby zobaczyć więcej.`);
            return message.channel.send(embed).then(m => m.delete(5000) && message.delete(5000));
        }

        if (message.mentions.members.array().length == 0) {
            var target = args.join(" ");
        } else {
            var target = message.mentions.members.first().user.displayAvatarURL;
        }

        let { body } = await superagent
        .get(encodeURI(`https://nekobot.xyz/api/imagegen?type=threats&url=${target}`)).catch(() => {
            return message.channel.send(new RichEmbed().setAuthor(`Błąd API`, `https://fluentbot.pl/img/error.png`).setDescription(`Wystąpił nieoczekiwany błąd API.`).setColor('#ea2d3f').setTimestamp().setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL}`));
        });

        const embed = new RichEmbed()
        .setAuthor(`ZAGROŻENIA`, `https://fluentbot.pl/img/fun.png`)
        .setColor('#166ee8')
        .setTimestamp()
        .setFooter(`${message.author.tag} | Powered by: nekobot.xyz`, `${message.author.displayAvatarURL}`)
        .setImage(body.message)

        message.channel.send(embed)
    }
}