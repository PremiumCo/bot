const { Events } = require('discord.js');

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
<<<<<<< HEAD
=======
        // See if the interaction is from someone with the id 407317071857188884 
>>>>>>> 14f26dcd5f0702836233ab261dfc00ac32b57a4f
        if (message.author.id === '407317071857188884') {
            await message.reply(
                "**rawr :3 you must bow down to the supreme leader like a good boy or you'll stay banished UwU**\nhttps://tenor.com/view/cute-sorry-anime-tears-gif-14764586"
            );
        }
    }
};
