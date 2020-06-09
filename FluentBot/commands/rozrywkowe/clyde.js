const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const superagent = require('superagent');

module.exports = {
    name: "clyde",
    category: "rozrywkowe",
    description: "Generuje tekst wysłany jako clyde",
    usage: "<tekst>",
    run: async (client, message, args) => {
        if (!args[0]) {
            const embed = new RichEmbed()
            .setColor('#ea2d3f')
            .setAuthor(`Błędnie użyta komenda.`, `https://fluentbot.pl/img/error.png`)
            .setDescription(`Poprawny format: \`${process.env.PREFIX}${module.exports.name}${module.exports.usage ? ' ' + module.exports.usage : ''}\``)
            .setFooter(`Wpisz ${process.env.PREFIX}pomoc ${module.exports.name} aby zobaczyć więcej.`);
            return message.channel.send(embed).then(m => m.delete(5000) && message.delete(5000));
        }

        let { body } = await superagent
        .get(encodeURI(`https://nekobot.xyz/api/imagegen?type=clyde&text=${args.join(" ")}`)).catch(() => {
            return message.channel.send(new RichEmbed().setAuthor(`Błąd API`, `https://fluentbot.pl/img/error.png`).setDescription(`Wystąpił nieoczekiwany błąd API.`).setColor('#ea2d3f').setTimestamp().setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL}`));
        });

        const embed = new RichEmbed()
        .setAuthor(`CLYDE`, `https://fluentbot.pl/img/fun.png`)
        .setColor('#166ee8')
        .setTimestamp()
        .setFooter(`${message.author.tag} | Powered by: nekobot.xyz`, `${message.author.displayAvatarURL}`)
        .setImage(body.message)

        message.channel.send(embed)
    }
}