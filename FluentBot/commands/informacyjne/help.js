const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "help",
    aliases: ["pomoc", "h", "komendy"],
    category: "informacyjne",
    description: "Wysyła listę wszystkich komend.",
    run: async (client, message, args) => {
        // If there's an args found
        // Send the info of that command found
        // If no info found, return not found embed.
        if (args[0]) {
            return getCMD(client, message, args[0]);
        } else {
            const embed = new RichEmbed()
            .setAuthor(`Fluent | Pomoc`, client.user.displayAvatarURL, `http://fluentbot.pl`)
            .setColor('BLUE')
            .setDescription(`**🏠 - Kategoria Główna\n❓ - Informacyjne\n🛠️ - Moderacyjne\n😝 - Rozrywkowe**\n🔞 - **NSFW**`)
            .setFooter(`Zareaguj aby przejść do kategorii. Wpisz ${process.env.PREFIX}${module.exports.name} <nazwa komendy> aby zobaczyć więcej.`)
            message.channel.send(embed).then(embedMessage => {
                embedMessage.react("🏠").then(() => embedMessage.react("❓")).then(() => embedMessage.react("🛠️")).then(() => embedMessage.react("😝")).then(() => embedMessage.react("🔞"))
                const filter = (reaction, user) => {
                    return ['🏠', '❓', '🛠️', '😝', '🔞'].includes(reaction.emoji.name) && user.id === message.author.id;
                };
                const collector = embedMessage.createReactionCollector(filter, { time: 60000 })

                collector.on('collect', reaction => {
                    if (reaction.emoji.name === '🏠') {
                        embedMessage.edit(embed.setDescription(`**🏠 - Kategoria Główna\n❓ - Informacyjne\n🛠️ - Moderacyjne\n😝 - Rozrywkowe**\n🔞 - **NSFW**`));
                    }else if (reaction.emoji.name === '❓') {
                        embedMessage.edit(embed.setDescription(`${getAll(client, 0)}`));
                    } else if (reaction.emoji.name === '🛠️') {
                        embedMessage.edit(embed.setDescription(`${getAll(client, 1)}`));
                    } else if (reaction.emoji.name === '😝') {
                        embedMessage.edit(embed.setDescription(`${getAll(client, 3)}`));
                    } else if (reaction.emoji.name === '🔞') {
                        embedMessage.edit(embed.setDescription(`${getAll(client, 2)}`));
                    }
                    reaction.remove(message.author);
                });

                collector.on('end', () => {
                    embedMessage.clearReactions()
                    embedMessage.edit(embed.setFooter(`Kontrola reakcji wygasła. Użyj ponownie ${process.env.PREFIX + module.exports.name}`))
                });
            });
        }
    }
}

function getAll(client, number) {   
    // Map all the commands
    // with the specific category
    const commands = (category) => {
        return client.commands
            .filter(cmd => cmd.category === category)
            .map(cmd => `\`${process.env.PREFIX}${cmd.name}${cmd.usage ? ' ' + cmd.usage : ''}\`${cmd.description ? ' - ' + cmd.description : ''}`)
            .join("\n");
    }

    // Map all the categories
    const info = client.categories
        .map(cat => stripIndents`**${cat[0].toUpperCase() + cat.slice(1)}** \n${commands(cat)}`)
        //.reduce((string, category) => string + "\n" + category);

    return info[number];
}

function getCMD(client, message, input) {
    const embed = new RichEmbed()

    // Get the cmd by the name or alias
    const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()));
    
    let info = `Nie znaleziono informacji o komendzie **${input.toLowerCase()}**`;

    // If no cmd is found, send not found embed
    if (!cmd) {
        return message.channel.send(embed.setColor("RED").setDescription(info));
    }

    // Add all cmd info to the embed
    if (cmd.name) info = `**Nazwa komendy**: \`${cmd.name}\``;
    if (cmd.aliases) info += `\n**Aliasy**: ${cmd.aliases.map(a => `\`${a}\``).join(", ")}`;
    if (cmd.description) info += `\n**Opis**: ${cmd.description}`;
    if (cmd.usage) {
        info += `\n**Użycie**: ${cmd.usage}`;
        embed.setFooter(`Składnia: <> = wymagane, [] = opcjonalne`);
    }

    return message.channel.send(embed.setColor("GREEN").setDescription(info));
}