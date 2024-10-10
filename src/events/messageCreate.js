const { Events } = require('discord.js');

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
<<<<<<< HEAD
        if (message.author.id === '12345678901') {
=======
        if (message.author.id === '12345678910') {
>>>>>>> 152693414c6c450049b7f33aaf544ac067820686
            await message.reply(
                "**rawr :3 you must bow down to the supreme leader like a good boy or you'll stay banished UwU**\nhttps://tenor.com/view/cute-sorry-anime-tears-gif-14764586"
            );
        }
    }
};
