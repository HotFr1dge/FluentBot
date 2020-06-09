const { Canvas } = require('canvas-constructor');
const { Attachment } = require('discord.js');
const { resolve, join } = require("path"); // This is to get a font file.
const fetch = require('node-fetch');
const { getMember, rand } = require("../../functions.js");

const imageUrlRegex = /\?size=2048$/g;
const placeholder = new Map();

module.exports = {
    name: "rank",
    aliases: ["level", "poziom"],
    category: "rozrywkowe",
    description: "Wysyła aktualny poziom użytkownika.",
    usage: "[nick | id | wzmianka]",
    run: async (client, message, args, connection) => {
      const member = getMember(message, args.join(" "));

      connection.connect(error => {
        if (error) throw error;
      });

      connection.query(`SELECT * FROM xp WHERE user_id = '${member.id}' && guild_id = '${message.guild.id}'`, async (err, rows) => {
          if (err) throw err;
          if (!rows[0]) {
            var xp = 0;
            var lvl = 0;
          } else {
            var xp = rows[0].xp;
            var lvl = rows[0].level;
          }
          try {
            const buffer = await profile(message, member, lvl, xp);
            const filename = `profile-${member.id}.jpg`;
            const attachment = new Attachment(buffer, filename);
            await message.channel.send(attachment);
          } catch (error) {
            client.logger.error(error.stack);
            return message.channel.send(`An error ocurred: **${error.message}**`);
          }
          connection.end();
      });
    }
}

async function profile(message, member, lvl, exp) {

  try {
    const result = await fetch(member.user.displayAvatarURL.replace(imageUrlRegex, '?size=128'));
    if (!result.ok) throw new Error('Failed to get the avatar!');
    const avatar = await result.buffer();

    const random = rand(0,2);
    if (random == 0) {
      var bg_img = `https://cdn.mee6.xyz/plugins/levels/cards/backgrounds/4cc81b4c-c779-4999-9be0-8a3a0a64cbaa.jpg`;
    } else if (random == 1) {
      var bg_img = `https://cdn.mee6.xyz/plugins/levels/cards/backgrounds/c9ac0859-d134-473c-94df-e90f780b06a5.jpg`;
    } else if (random == 2) {
      var bg_img = `https://cdn.mee6.xyz/plugins/levels/cards/backgrounds/0b6c7fe0-20c2-4aba-bd8e-2cdf57ee3e32.jpg`;
    }
    
    const result2 = await fetch(bg_img);
    if (!result2.ok) throw new Error('Failed to get the avatar!');
    const bg = await result2.buffer();

    const name = member.displayName.length > 30 ? member.displayName.substring(0, 17) + '...'
      : member.displayName;

    const member_color = member.displayHexColor;

    Canvas.registerFont(resolve(join(__dirname, "../../JosefinSans.ttf")), "Discord");

    let points_size = exp / 10 / 100 * 660;
    if (points_size < 20) {
      points_size = 0;
    }

    return new Canvas(1000, 300)
      .addImage(bg, 0, 0, 1000, 300)
      .createBeveledClip(30, 30, 940, 240, 5)
      .setColor("rgba(0, 0, 0, 0.3)")
      .fill()
      .setShadowColor('rgba(22, 22, 22, 1)')
      .setShadowOffsetY(5)
      .setShadowBlur(10)
      .setColor("rgba(44, 47, 51, 1)")
      .addCircle(155, 150, 94)
      .addCircularImage(avatar, 156, 150, 96)
      .save()
      .createBeveledClip(270, 190, 670, 46, 100)
      .setColor('#23272A')
      .fill()
      .createBeveledClip(275, 195, points_size === 0 ? 0.001 : points_size, 36, 100)
      .setColor(member_color)
      .fill()
      .restore()
      .setTextAlign('left')
      .setTextFont('26pt Josefin Sans')
      .setColor('#FFFFFF')
      .addText(name, 290, 180)
      .setTextAlign('right')
      .addText(`Level: ${lvl.toLocaleString()}`, 950, 70)
      .setTextFont('18pt Josefin Sans')
      .addText(`EXP: ${exp.toLocaleString()}/1000`, 930, 185)
      .toBuffer();
  } catch (error) {
    await message.channel.send(`An error occurred: **${error.message}**`);
  }
}