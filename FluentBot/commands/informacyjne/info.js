const { RichEmbed } = require("discord.js");

const { stripIndents } = require("common-tags");
const { getMember, getChannel, getRole, getEmoji, formatDate } = require("../../functions.js");

module.exports = {
    name: "info",
    aliases: ["informacje"],
    category: "informacyjne",
    description: "Wysyła podstawowe informacje.\nDostępne opcje: `kanał`, `użytkownik`, `rola`, `bot`, `serwer`",
    usage: "<opcja> [nazwa | id | wzmianka]",
    run: async (client, message, args, guild) => {

        if (!args[0]) {
            const embed = new RichEmbed()
            .setColor('#ea2d3f')
            .setAuthor(`Błędnie użyta komenda.`, `https://fluentbot.pl/img/error.png`)
            .setDescription(`Poprawny format: \`${process.env.PREFIX}${module.exports.name}${module.exports.usage ? ' ' + module.exports.usage : ''}\``)
            .setFooter(`Wpisz ${process.env.PREFIX}pomoc ${module.exports.name} aby zobaczyć więcej.`);
            return message.channel.send(embed).then(m => m.delete(5000) && message.delete(5000));
        }
        
        if (args[0] === 'kanał' || args[0] === 'kanal' || args[0] === 'channel') {
            const channel = getChannel(message, args.slice(1).join(" "));

            // Channel variables
            const created = formatDate(channel.createdAt);

            const embed = new RichEmbed()
            .setTitle("ℹ️ INFORMACJE O KANALE")
            .setColor('BLUE')
            .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL}`)
            .setTimestamp()
            .addField("__**Nazwa:**__", stripIndents`${channel.name}`, true)
            .addField("__**Kategoria:**__", stripIndents`${channel.parent.name}`, true)
            .addField("__**ID:**__", stripIndents`${channel.id}`, true)
            .addField("__**Data utworzenia:**__", stripIndents`${created}`, true)

            if (channel.type === 'text') {
                let channelCooldown = channel.rateLimitPerUser;
                if (channelCooldown == 0) {
                    channelCooldown = `Wyłączony`;
                } else if (channelCooldown < 60) {
                    channelCooldown = channelCooldown + "s";
                } else if (channelCooldown == 60) {
                    channelCooldown = `1min`;
                } else if (channelCooldown == 120) {
                    channelCooldown = `2min`;
                } else if (channelCooldown == 300) {
                    channelCooldown = `5min`;
                } else if (channelCooldown == 600) {
                    channelCooldown = `10min`;
                } else if (channelCooldown == 900) {
                    channelCooldown = `15min`;
                } else if (channelCooldown == 1800) {
                    channelCooldown = `30min`;
                } else if (channelCooldown == 3600) {
                    channelCooldown = `1h`;
                } else if (channelCooldown == 7200) {
                    channelCooldown = `2h`;
                } else if (channelCooldown == 21600) {
                    channelCooldown = `6h`;
                }
                embed.setThumbnail(`https://cdn4.iconfinder.com/data/icons/ecommerce-24-1/24/Ecommerce_Outline_Contact_Us_Chat-512.png`)
                .addField("__**NSFW:**__", stripIndents`${channel.nsfw ? "Tak" : "Nie"}`, true)
                .addField("__**Tryb powolny:**__", stripIndents`${channelCooldown}`, true)
            } else if (channel.type === 'voice') {
                embed.setThumbnail(`https://cdn1.iconfinder.com/data/icons/communication-01/32/Mic-512.png`)
                .addField("__**Bitrate:**__", stripIndents`${channel.bitrate}kbps`, true)
                .addField("__**Limit użytkowników:**__", stripIndents`${channel.userLimit === 0 ? "Brak limitu" : channel.userLimit}`, true)
            }

            message.channel.send(embed);
        } else if (args[0] === 'użytkownik' || args[0] ===  'uzytkownik' || args[0] ===  'user' || args[0] ===  'member') {
            const member = getMember(message, args.slice(1).join(" "));

            // Member variables
            const joined = formatDate(member.joinedAt);
            const roles = member.roles
                .filter(r => r.id !== message.guild.id)
                .map(r => r).join(", ") || 'Brak';
    
            // User variables
            const created = formatDate(member.user.createdAt);
    
            const embed = new RichEmbed()
                .setTitle("ℹ️ INFORMACJE O UŻYTKOWNIKU")
                .setThumbnail(`${member.user.displayAvatarURL}`)
                .setColor(member.displayHexColor === '#000000' ? '#ffffff' : member.displayHexColor)
                .addField("__**Nick:**__", stripIndents`${member.user.username}`, true)
                .addField("__**Tag:**__", stripIndents`#${member.user.discriminator}`, true)
                .addField("__**ID:**__", stripIndents`${member.user.id}`, true)
                .addField("__**Data utworzenia konta:**__", stripIndents`${created}`, true)
                .addField("__**Data dołaczenia na serwer:**__", stripIndents`${joined}`, true)
                .addField("__**Role:**__", stripIndents`${roles}`, false)
                .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL}`)
                .setTimestamp()
    
            message.channel.send(embed);
        } else if (args[0] === 'rola' || args[0] ===  'role' || args[0] ===  'ranga' || args[0] ===  'rank') {
            const role = getRole(message, args.slice(1).join(" "));

            const color = role.hexColor;
            const created = formatDate(role.createdAt);

            const embed = new RichEmbed()
                .setTitle("ℹ️ INFORMACJE O ROLI")
                .setColor(color)
                .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL}`)
                .setTimestamp()
                .addField("__**Nazwa:**__", `${role.name}`, true)
                .addField("__**Kolor:**__", `${color}`, true)
                .addField("__**ID:**__", `${role.id}`, true)
                .addField("__**Data utworzenia:**__", `${created}`, true)
                .addField("__**Możliwość wzmianki:**__", `${role.mentionable ? "Tak" : "Nie"}`, true)
                .addField("__**Wyświetlana oddzielnie:**__", `${role.hoist ? "Tak" : "Nie"}`, true)

            message.channel.send(embed);
        } else if (args[0] === 'bot') {

            let uptime = process.uptime();
            let days = Math.floor((uptime % 31536000) / 86400);
            let hours = Math.floor((uptime % 86400) / 3600);
            let minutes = Math.floor((uptime % 3600) / 60);
            let seconds = Math.round(uptime % 60);
            let botuptime = (days > 0 ? days + "d : " : "") + (hours > 0 ? hours + "g : " : "") + (minutes > 0 ? minutes + "m : " : "") + (seconds > 0 ? seconds + "s" : "")
        
            /*if (process.platform) {
                const platform = process.platform;
                if (platform === 'win32') result = 'Windows';
                else if (platform === 'aix') result = 'Aix';
                else if (platform === 'linux') result = 'Linux';
                else if (platform === 'darwin') result = 'Darwin';
                else if (platform === 'openbsd') result = 'OpenBSD';
                else if (platform === 'sunos') result = 'Solaris';
                else if (platform === 'freebsd') result = 'FreeBSD';
            }*/

            const package = require('../../package.json')
        
            const os = require('os')
            var usedMemGB = Math.round(((((os.totalmem() - os.freemem()) / 1024) / 1024) / 1024).toFixed(2));

            const embed = new RichEmbed()
                .setTitle("ℹ️ INFORMACJE O BOCIE")
                .setColor('BLUE')
                .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL}`)
                .setTimestamp()
                .addField("__**Czas działania:**__", `${botuptime}`, false)
                .addField("__**Ping:**__", `${Math.round(client.ping)}`, true)
                .addField("__**Software:**__", `Ubuntu 19.10`, true)
                .addField("__**Pamięć RAM:**__", `${usedMemGB}GB/2GB (${Math.round((usedMemGB) / 2 * 100)}%)`, true)
                .addField("__**Serwery:**__", `${client.guilds.size}`, true)
                .addField("__**Kanały:**__", `${client.channels.size}`, true)
                .addField("__**Użytkownicy:**__", `${client.users.size}`, true)
                .addField("__**Wersja Node.js:**__", `${process.version.slice(1)}`, true)
                .addField("__**Wersja Discord.js:**__", `${package.dependencies["discord.js"].slice(1)}`, true)

            message.channel.send(embed);
        } else if (args[0] === 'serwer' || args[0] === 'server') {
                const server = message.guild

                let region = server.region;
                if (region == `southafrica`) {
                    region = `Południowa Afryka`; 
                } else if (region == `hongkong`) {
                    region = `Hong Kong`;
                } else if (region == `europe`) {
                    region = `Europa`;
                } else if (region == `brazil`) {
                    region = `Brazylia`;
                } else if (region == `india`) {
                    region = `Indie`;
                } else if (region == `japan`) {
                    region = `Japonia`;
                } else if (region == `russia`) {
                    region = `Rosja`;
                } else if (region == `singapore`) {
                    region = `Singapur`;
                } else if (region == `sydney`) {
                    region = `Australia`;
                } else if (region == `us-central`) {
                    region = `Centralne Stany Zjednoczone`;
                } else if (region == `us-east`) {
                    region = `Wschodnie Stany Zjednoczone`;
                } else if (region == `us-south`) {
                    region = `Południowe Stany Zjednoczone`;
                } else if (region == `us-west`) {
                    region = `Zachodnie Stany Zjednoczone`;
                } else if (region == `eu-central`) {
					region = `Centralna Europa`;
				}

                embed = new RichEmbed()
                .setTitle(`ℹ️ INFORMACJE O SERWERZE`)
                .setColor('BLUE')
                .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL}`)
                .setTimestamp()
                .setThumbnail(`${server.iconURL ? server.iconURL : 'https://dummyimage.com/500x500/000/fff.png&text=' + server.nameAcronym}`)
                .addField("__**Nazwa:**__", `${server.name}`, true)
                .addField("__**ID:**__", `${server.id}`, true)
                .addField("__**Region:**__", `${region}`, true)
                .addField("__**Data utworzenia:**__", `${formatDate(server.createdAt)}`, true)
                .addField("__**Właściciel:**__", `${server.owner}`, true)
                .addField("__**Kanał AFK:**__", `${server.afkChannel ? server.afkChannel.name : `Brak kanału AFK`}`, true)
                .addField("__**Ilość członków:**__", `${server.memberCount}`, true)
                .addField("__**Ilość ról:**__", `${server.roles.array().length}`, true)
                .addField("__**Ilość kanałów:**__", `${server.channels.array().length}`, true)
                .addField("__**Ilość emoji:**__", `${server.emojis.array().length}`, true)

                message.channel.send(embed)
        } else {
            const embed = new RichEmbed()
            .setColor('#ea2d3f')
            .setAuthor(`Błąd!`, `https://fluentbot.pl/img/error.png`)
            .setDescription(`Nie znaleziono takiej opcji jak **${args[0]}**.`)
            .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL}`);
            return message.channel.send(embed).then(m => m.delete(5000));
        }
    }
}