//import closeTicket from '../../shared/closeTicket';

const closeTicket = require('../../shared/closeTicket');
const ticketFeedbackEmbed = require('../../embeds/ticketFeedback');

module.exports = {
    name: 'close',
    async execute(interaction) {
        if (interaction.user.id != ticketCreator) {
            const ticketCreator = interaction.message.mentions.users.first().id;
            
            await interaction.client.users.send(
                ticketCreator,
                ticketFeedbackEmbed(ticketCreator, interaction.user.id)
            );
        }

        await closeTicket(interaction);
    }
};
