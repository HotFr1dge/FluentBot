const { RichEmbed } = require("discord.js");

module.exports = {
    name: "say",
    aliases: ["mów","mow","powiedz"],
    category: "moderacyjne",
    description: "Pisanie wiadomości za pomocą bota.",
    usage: "<tekst>",
    run: async (client, message, args) => {
        if(message.deletable) message.delete();

        if (!message.member.hasPermission("MANAGE_MESSAGES"))
            return message.reply("❌ Nie masz uprawnień do użycia tej komendy!").then(m => m.delete(5000) && message.delete(5000));

        if (args.length < 1) {
            const embed = new RichEmbed()
            .setColor('#ea2d3f')
            .setAuthor(`Błędnie użyta komenda.`, `https://fluentbot.pl/img/error.png`)
            .setDescription(`Poprawny format: \`${process.env.PREFIX}${module.exports.name}${module.exports.usage ? ' ' + module.exports.usage : ''}\``)
            .setFooter(`Wpisz ${process.env.PREFIX}pomoc ${module.exports.name} aby zobaczyć więcej.`);
            return message.channel.send(embed).then(m => m.delete(5000) && message.delete(5000));
        } else {
            message.channel.send(args.join(" "));
        }
    }
}