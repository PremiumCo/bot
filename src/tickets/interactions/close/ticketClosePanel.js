import ticketClosePanelEmbed from '../../embeds/ticketClosePanel';

module.exports = {
    name: 'close-panel',
    async execute(interaction) {
        interaction.reply(ticketClosePanelEmbed);
    }
};
