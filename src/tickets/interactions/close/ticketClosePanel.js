//import ticketClosePanelEmbed from '../../embeds/ticketClosePanel';

const ticketClosePanelEmbed = require('../../embeds/ticketClosePanel');

module.exports = {
    name: 'close-panel',
    async execute(interaction) {
        interaction.reply(ticketClosePanelEmbed);
    }
};
