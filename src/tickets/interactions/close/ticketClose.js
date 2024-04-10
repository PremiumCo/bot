//import closeTicket from '../../shared/closeTicket';

const closeTicket = require('../../shared/closeTicket');
const ticketFeedbackEmbed = require('../../embeds/ticketFeedback');

module.exports = {
    name: 'close',
    async execute(interaction) {
        const ticketCreator = interaction.message.mentions.users.first().id;
        
        if (interaction.user.id != ticketCreator) {
            await interaction.client.users.send(
                ticketCreator,
                ticketFeedbackEmbed(ticketCreator, interaction.user.id)
            );
        }

        await closeTicket(interaction);
    }
};
