module.exports = {
    getMember: function(message, toFind = '') {
        toFind = toFind.toLowerCase();

        let target = message.guild.members.get(toFind);
        
        if (!target && message.mentions.members)
            target = message.mentions.members.first();

        if (!target && toFind) {
            target = message.guild.members.find(member => {
                return member.displayName.toLowerCase().includes(toFind) ||
                member.user.tag.toLowerCase().includes(toFind)
            });
        }
            
        if (!target) 
            target = message.member;
            
        return target;
    },

    getChannel: function(message, toFind = '') {
        toFind = toFind.toLowerCase();

        let target = message.guild.channels.get(toFind);
        
        if (!target && message.mentions.channels)
            target = message.mentions.channels.first();

        if (!target && toFind) {
            target = message.guild.channels.find(channel => {
                return channel.name.toLowerCase().includes(toFind)
            });
        }
            
        if (!target) 
            target = message.channel;
            
        return target;
    },

    getRole: function(message, toFind = '') {
        toFind = toFind.toLowerCase();

        let target = message.guild.roles.get(toFind);
        
        if (!target && message.mentions.roles)
            target = message.mentions.roles.first();

        if (!target && toFind) {
            target = message.guild.roles.find(role => {
                return role.name.toLowerCase().includes(toFind)
            });
        }
            
        if (!target) 
            target = message.member.highestRole;
            
        return target;
    },

    formatDate: function(date) {
        return `${(date.getDate() < 10) ? '0' +  date.getDate() : date.getDate()}.${(date.getMonth()+1 < 10) ? '0' + (date.getMonth()+1) : date.getMonth()+1}.${date.getFullYear()}`
        //return new Intl.DateTimeFormat('pl-PL').format(date)
    }, 

    formatTime: function(date) {
        return `${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`
        //return new Intl.DateTimeFormat('pl-PL').format(date)
    },

    rand: function( min, max ) {
        min = parseInt( min, 10 );
        max = parseInt( max, 10 );
    
        if ( min > max ){
            var tmp = min;
            min = max;
            max = tmp;
        }
    
        return Math.floor( Math.random() * ( max - min + 1 ) + min );
    }

}