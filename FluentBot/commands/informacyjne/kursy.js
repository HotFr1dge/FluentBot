const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const superagent = require('superagent');
const { formatTime } = require("../../functions.js");

module.exports = {
    name: "kurs",
    aliases: ["kursy","kursy-walut", "kurs-walut"],
    category: "informacyjne",
    description: "Wysyła aktualny kurs walut.",
    run: async (client, message, args) => {

        let { body } = await superagent
        .get('http://api.nbp.pl/api/exchangerates/tables/a?format=json').catch(() => {
            return message.channel.send(new RichEmbed().setAuthor(`Błąd API`, `https://fluentbot.pl/img/error.png`).setDescription(`Nie można odczytać danych.`).setColor('#ea2d3f').setTimestamp().setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL}`));
        });

        const embed = new RichEmbed()
            .setAuthor(`Aktualne kursy walut`, `https://fluentbot.pl/img/nbp.jpg`)
            .setTimestamp()
            .setFooter(`${message.author.tag} | Powered by: nbp.pl`, `${message.author.displayAvatarURL}`)
            .setColor('#00706a')
            .addField(`${body[0].rates[1].currency} [${body[0].rates[1].code}]`, `${body[0].rates[1].mid}`, true) //USD
            .addField(`${body[0].rates[7].currency} [${body[0].rates[7].code}]`, `${body[0].rates[7].mid}`, true) //EUR
            .addField(`${body[0].rates[10].currency} [${body[0].rates[10].code}]`, `${body[0].rates[10].mid}`, true) //GBP
            .addField(`${body[0].rates[9].currency} [${body[0].rates[9].code}]`, `${body[0].rates[9].mid}`, true) //CHF
            .addField(`${body[0].rates[13].currency} [${body[0].rates[13].code}]`, `${body[0].rates[13].mid}`, true) //CZK
            .addField(`${body[0].rates[14].currency} [${body[0].rates[14].code}]`, `${body[0].rates[14].mid}`, true) //DKK
            .addField(`${body[0].rates[16].currency} [${body[0].rates[16].code}]`, `${body[0].rates[16].mid}`, true) //NOK
            .addField(`${body[0].rates[17].currency} [${body[0].rates[17].code}]`, `${body[0].rates[17].mid}`, true) //SEK
            .addField(`${body[0].rates[11].currency} [${body[0].rates[11].code}]`, `${body[0].rates[11].mid}`, true) //UAH
            .addField(`${body[0].rates[29].currency} [${body[0].rates[29].code}]`, `${body[0].rates[29].mid}`, true) //RUB
            .addField(`${body[0].rates[33].currency} [${body[0].rates[33].code}]`, `${body[0].rates[34].mid}`, true) //CNY
            .addField(`${body[0].rates[12].currency} [${body[0].rates[12].code}]`, `${body[0].rates[12].mid}`, true) //JPY

            
        message.channel.send(embed)

    }
}