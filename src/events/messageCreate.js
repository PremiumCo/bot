const { Events } = require('discord.js');

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        // See if the interaction is from someone with the id 407317071857188884
        if (message.author.id === '407317071857188884') {
            message.reply(
                '**This man is corrupt. Do not trust what he says.**'
            );
        }
    }
};
