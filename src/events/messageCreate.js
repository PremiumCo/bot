const { Events } = require('discord.js');

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        if (
            message.author.id === '407317071857188884'
        ) {
            await message.reply(
                "**rawr :3 you must bow down to the supreme leader like a good boy or you'll stay banished UwU**\nhttps://tenor.com/view/cute-sorry-anime-tears-gif-14764586"
            );
        }
    }
};
