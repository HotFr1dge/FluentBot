const { RichEmbed, MessageAttachment } = require("discord.js");
const { getMember } = require("../../functions.js");
const { stripIndents } = require("common-tags");
const superagent = require('superagent');

module.exports = {
    name: "down",
    description: "Taki obrazek ze strzałkami.",
    category: "rozrywkowe",
    usage: "<nick | id | wzmianka>",
    run: async (client, message, args) => {
        if (!args[0]) {
            const embed = new RichEmbed()
            .setColor('#ea2d3f')
            .setAuthor(`Błędnie użyta komenda.`, `https://fluentbot.pl/img/error.png`)
            .setDescription(`Poprawny format: \`${process.env.PREFIX}${module.exports.name}${module.exports.usage ? ' ' + module.exports.usage : ''}\``)
            .setFooter(`Wpisz ${process.env.PREFIX}pomoc ${module.exports.name} aby zobaczyć więcej.`);
            return message.channel.send(embed).then(m => m.delete(5000) && message.delete(5000));
        }

        const member = getMember(message, args.join(" "));
        const avatar = member.user.displayAvatarURL;

        const embed = new RichEmbed()
        .setAuthor(`DOWN`, `https://fluentbot.pl/img/fun.png`)
        .setColor('#166ee8')
        .setTimestamp()
        .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL}`)
        .setImage(encodeURI(`https://fluentbot.pl/api/arrows.php?img=${avatar}`))

        message.channel.send(embed)
    }
}