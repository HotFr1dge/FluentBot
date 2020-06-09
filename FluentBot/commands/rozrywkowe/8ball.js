const { RichEmbed } = require("discord.js");
const { getMember } = require("../../functions.js");
const superagent = require('superagent');

module.exports = {
    name: "8ball",
    aliases: ["kryształowa-kula", "kryształowakula", "eightball"],
    category: "rozrywkowe",
    description: "Kryształowa kula odpowiada na twoje pytanie.",
    usage: "<pytanie>",
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
        .get(`https://fluentbot.pl/api/randomize.php?plik=https://pastebin.com/raw/fAQpPCaC`).catch(() => {
           return message.channel.send(new RichEmbed().setAuthor(`Błąd API`, `https://fluentbot.pl/img/error.png`).setDescription(`Wystąpił nieoczekiwany błąd API.`).setColor('#ea2d3f').setTimestamp().setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL}`));
        });

        const embed = new RichEmbed()
        .setAuthor(`KRYSZTAŁOWA KULA`, `https://fluentbot.pl/img/eigth8ball.png`)
        .addField(`Pytanie:`, `${args.join(" ")}`)
        .addField(`Odpowiedź:`, `${body.random}`)
        .setColor('#231f20')
        .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL}`)
        .setTimestamp();

        message.channel.send(embed);
    }
}