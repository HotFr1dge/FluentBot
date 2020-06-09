const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const superagent = require('superagent');
const DabiImages = require("dabi-images");
const DabiClient = new DabiImages.Client();

module.exports = {
    name: "anal",
    category: "nsfw",
    description: "Treści dla dorosłych.",
    run: async (client, message, args) => {

        if (!message.channel.nsfw) {
            return message.channel.send(new RichEmbed().setAuthor(`Błąd`, `https://fluentbot.pl/img/error.png`).setDescription(`Tą komendę można używać tylko na kanałach NSFW.`).setColor('#ea2d3f').setTimestamp().setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL}`)).then(m => m.delete(5000) && message.delete(5000));
        }

        DabiClient.custom.do("https://www.pornpics.com/anal/", /https:\/\/img\.pornpics\.com\/[0-9]{3}\/[0-9]{4}-[0-9]{2}-[0-9]{2}\/[0-9]{6}_[0-9]{2}\.jpg/gm).then(matches => {
            let random = Math.floor(Math.random() * matches.length)
    
            const embed = new RichEmbed()
            .setAuthor(`ANAL`, `https://fluentbot.pl/img/nsfw.png`)
            .setColor("#ff4055")
            .setTimestamp()
            .setFooter(`${message.author.tag} | Powered by pornpics.com`, `${message.author.displayAvatarURL}`)
            .setImage(matches[random])
    
            message.channel.send(embed)
        }).catch(error => {
            console.log(error);
            return message.channel.send(new RichEmbed().setAuthor(`Błąd API`, `https://fluentbot.pl/img/error.png`).setDescription(`Wystąpił nieoczekiwany błąd API.`).setColor('#ea2d3f').setTimestamp().setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL}`));
        });
    }
}