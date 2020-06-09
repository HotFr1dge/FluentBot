const { RichEmbed } = require('discord.js');

module.exports = {
    name: "leaderboard",
    aliases: ["ranking"],
    category: "rozrywkowe",
    description: "Wysyła aktualny ranking serwera.",
    run: async (client, message, args, connection) => {
      connection.connect(error => {
          if (error) throw error;
      });

      connection.query(`SELECT user_id, level, xp FROM xp WHERE guild_id = '${message.guild.id}' ORDER BY \`xp\`.\`level\` DESC, \`xp\`.\`xp\` DESC LIMIT 10`, async (err, rows) => {
          if (err) throw err;
          if (!rows[0]) {
            return message.channel.send(`Ranking nie jest jeszcze dostępny!`);
          } else {
            var lUser = rows.map(z=>z.user_id);
            var lLvl = rows.map(y=>y.level);
            var lXp = rows.map(x=>x.xp);

            var leadOutp = lUser.map(function(a,b){
              let s = b + 1;
              return[s + '. <@' + a + '> LVL ' + lLvl[b] + ' : XP ' + lXp[b]];
            })
            var leadOut = leadOutp.join("\n");
          }
          const embed = new RichEmbed()
          .setColor(0x00AE86)
          .setThumbnail(message.guild.iconURL ? message.guild.iconURL : 'https://dummyimage.com/500x500/000/fff.png&text=' + message.guild.nameAcronym)
          .setAuthor(`Ranking dla ${message.guild.name}`, `https://cdn3.iconfinder.com/data/icons/seo-flat-curve-bg/614/22_-_SEO_Performance-512.png`)
          .setDescription(`${leadOut}`)
          message.channel.send({embed: embed});
          connection.end();
      });
    }
}