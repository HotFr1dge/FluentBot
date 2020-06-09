const { RichEmbed } = require("discord.js");

module.exports = {
    name: "ban",
    aliases: ["zbanuj","banuj"],
    category: "moderacyjne",
    description: "Banuje użytkownika na serwerze.",
    usage: "<id | wzmianka> [powód]",
    run: async (client, message, args) => {

        if (!message.member.hasPermission("BAN_MEMBERS")) 
            return message.reply("❌ Nie masz uprawnień do użycia tej komendy!").then(m => m.delete(5000) && message.delete(5000));

        if (!args[0]) {
            const embed = new RichEmbed()
            .setColor('#ea2d3f')
            .setAuthor(`Błędnie użyta komenda.`, `https://fluentbot.pl/img/error.png`)
            .setDescription(`Poprawny format: \`${process.env.PREFIX}${module.exports.name}${module.exports.usage ? ' ' + module.exports.usage : ''}\``)
            .setFooter(`Wpisz ${process.env.PREFIX}pomoc ${module.exports.name} aby zobaczyć więcej.`);
            return message.channel.send(embed).then(m => m.delete(5000) && message.delete(5000));
        }


        if (args[1]) {
            var powód = args.slice(1).join(" ");
        }

        const member = message.mentions.members.first() || message.guild.members.get(args[0]);

        if (!member) {
            const embed = new RichEmbed()
            .setColor('#ea2d3f')
            .setAuthor(`Błąd.`, `https://fluentbot.pl/img/error.png`)
            .setDescription(`Nie znaleziono takiego użytkownika.`)
            .setTimestamp()
            .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL}`)
            return message.channel.send(embed).then(m => m.delete(5000) && message.delete(5000));
        }

        if (member.bannable) {
            member.ban(powód).then((member) => {
                const embed = new RichEmbed()
                .setAuthor(`ZBANOWANO!`, `https://fluentbot.pl/img/ban.png`)
                .setThumbnail(member.user.avatarURL)
                .setTimestamp()
                .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL}`)
                .setColor('#e2574c')
                .setDescription(`${message.author} zbanował/a ${member}`)
                powód ? embed.addField(`Powód:`, powód, false) : "";

                message.channel.send(embed);
            }).catch(() => {
                message.channel.send(new RichEmbed().setAuthor(`Błąd`, `https://fluentbot.pl/img/error.png`).setDescription(`Wystąpił nieoczekiwany błąd.`).setColor('#ea2d3f').setTimestamp().setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL}`)).then(m => m.delete(5000) && message.delete(5000));
            });
        } else {
            message.channel.send(new RichEmbed().setAuthor(`Błąd`, `https://fluentbot.pl/img/error.png`).setDescription(`Nie możesz zbanować tego użytkownika.`).setColor('#ea2d3f').setTimestamp().setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL}`)).then(m => m.delete(5000) && message.delete(5000));
        }

    }
}