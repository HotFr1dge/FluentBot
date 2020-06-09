const { Client, Collection, RichEmbed } = require("discord.js");
const { config } = require("dotenv");
const { rand } = require("./functions.js");
const fs = require("fs");
const DBL = require("dblapi.js");
var mysql = require('mysql');
let cooldown = new Set()

const client = new Client({
    disableEveryone: true
});

const dbl = new DBL('TOKEN', client)

client.commands = new Collection();
client.aliases = new Collection();

client.categories = fs.readdirSync("./commands/");

config({
    path: __dirname + "/.env"
});

["command"].forEach(handlers => {
    require(`./handlers/${handlers}`)(client);
});

client.on("ready", () => {

    console.log("Bot is ready!");

    setInterval(function(){ 
        if (client.ping <= 150) {
            client.user.setPresence({
                status: "online"
            });
        } else if (client.ping <= 300) {
            client.user.setPresence({
                status: "idle"
            });
        } else {
            client.user.setPresence({
                status: "dnd"
            });
        }
    }, 10000);

    setInterval(function(){ 
        client.user.setPresence({
            game: {
                name: `${process.env.PREFIX}help | @${client.user.username}`,
                type: "WATCHING"
            }
        });
        setTimeout(function(){ 
            client.user.setPresence({
                game: {
                    name: `fluentbot.pl`,
                    type: "WATCHING"
                }
            });
        }, 15000);
    }, 25000);

    setInterval(() => {
        dbl.postStats(client.guilds.size);
    }, 1800000);
});

client.on("message", async message => {
    const prefix = process.env.PREFIX;

    if (message.author.bot) return;
    if (!message.guild) return;
    if (message.isMentioned(client.user) && !message.content.startsWith(prefix)) message.channel.send(new RichEmbed().setColor("#388bc7").setDescription(`Witaj ${message.author}!\nMój prefix to \`${process.env.PREFIX}\`\nAby zobaczyć wszystkie komendy wpisz \`${process.env.PREFIX}pomoc\``));
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'phpmyadmin',
        password : '',
        database : 'fluent'
    });
    if (!message.content.startsWith(prefix)) {
        if (cooldown.has(message.author.id)) return;

        cooldown.add(message.author.id);

        var randomNumber;
        if (message.content.length < 300) {
            randomNumber = rand(3, 10)
        } else if (message.content.length < 1000) {
            randomNumber = rand(10, 20)
        } else if (message.content.length > 1000) {
            randomNumber = Math.round(message.content.length / 20)
        }
    
        if (message.tts || message.attachments.array().length > 0) {
            randomNumber = randomNumber + 10;
        }

        connection.connect(error => {
            if (error) throw error;
        });
    
        connection.query(`SELECT * FROM xp WHERE user_id = '${message.author.id}' && guild_id = '${message.guild.id}'`, (err, rows) => {
            if (err) throw err;
            let sql;
            if(rows.length < 1) {
                sql = `INSERT INTO xp (guild_id, user_id, xp, level) VALUES ('${message.guild.id}', '${message.author.id}', ${randomNumber}, 0)`;
                connection.query(sql)
            } else {
                let xp = rows[0].xp;
                let lvl = rows[0].level;
                if (xp + randomNumber > 1000) {
                    sql = `UPDATE xp SET xp = ${(xp + randomNumber) - 1000}, level = ${lvl+1} WHERE user_id = '${message.author.id}' && guild_id = '${message.guild.id}'`;
                    connection.query(sql, message.channel.send(`${message.author} awansowałeś/aś na poziom ${lvl+1}`))
                } else {
                    sql = `UPDATE xp SET xp = ${xp + randomNumber} WHERE user_id = '${message.author.id}' && guild_id = '${message.guild.id}'`;
                    connection.query(sql)
                }
            }
            connection.end();
        });
    
        setTimeout(() => {
            cooldown.delete(message.author.id)
        }, 10 * 1000);
    } else {
        if (!message.member) message.member = await message.guild.fetchMember(message);

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();
    
        if (cmd.length === 0) return;
        let command = client.commands.get(cmd);
        if (!command) command = client.commands.get(client.aliases.get(cmd));
        if (command) 
            command.run(client, message, args, connection);
    
    }
});

client.login(process.env.TOKEN)