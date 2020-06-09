const { RichEmbed } = require("discord.js");

module.exports = {
    name: "clear",
    aliases: ["wyczyść","wyczysc"],
    category: "moderacyjne",
    description: "Masowo usuwa wiadomości z kanału.",
    usage: "<liczba wiadomości>",
    run: async (client, message, args) => {

        if(!message.member.hasPermission("MANAGE_MESSAGES")) 
            return message.reply("❌ Nie masz uprawnień do użycia tej komendy!").then(m => m.delete(5000) && message.delete(5000));

        if(!args[0]) {
            const embed = new RichEmbed()
            .setColor('#ea2d3f')
            .setAuthor(`Błędnie użyta komenda.`, `https://fluentbot.pl/img/error.png`)
            .setDescription(`Poprawny format: \`${process.env.PREFIX}${module.exports.name}${module.exports.usage ? ' ' + module.exports.usage : ''}\``)
            .setFooter(`Wpisz ${process.env.PREFIX}pomoc ${module.exports.name} aby zobaczyć więcej.`);
            return message.channel.send(embed).then(m => m.delete(5000) && message.delete(5000));
        }

        if(isNaN(parseInt(args[0]))) {
            message.channel.send(new RichEmbed().setAuthor(`Błąd`, `https://fluentbot.pl/img/error.png`).setDescription("Podany argument nie jest liczbą!").setColor('#ea2d3f').setTimestamp().setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL}`)).then(m => m.delete(5000));
        } else {
            if(message.deletable) message.delete().then (() => {
                message.channel.bulkDelete(args[0]).then(() => {
                    const embed = new RichEmbed()
                    .setColor('#e2574c')
                    .setAuthor(`WYCZYSZCZONO!`, `https://fluentbot.pl/img/clean.png`)
                    .setDescription(`Usunięto **${args[0]}** wiadomości.`)
                    .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL}`)
                    message.channel.send(embed);
                }).catch(() => {
                    message.channel.send(new RichEmbed().setAuthor(`Błąd`, `https://fluentbot.pl/img/error.png`).setDescription(`Wystąpił nieoczekiwany błąd.`).setColor('#ea2d3f').setTimestamp().setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL}`)).then(m => m.delete(5000) && message.delete(5000));
                });
            });
        }
    }
}