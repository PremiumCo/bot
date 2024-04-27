//import closeTicket from '../../shared/closeTicket';

const closeTicket = require('../../shared/closeTicket');
const ticketFeedbackEmbed = require('../../embeds/ticketFeedback');

module.exports = {
    name: 'close',
    async execute(interaction) {
        const ticketCreator = interaction.message.mentions.users.first().id || "User Left";

        if (interaction.user.id != ticketCreator) {
            if (interaction.user.id == "User Left") return;

            try {
                await interaction.client.users.send(
                    ticketCreator,
                    ticketFeedbackEmbed(ticketCreator, interaction.user.id)
                );
            } catch {
                console.log(`${ticketCreator} has disabled DMs, unable to send feedback.`);
            }
        }

        await closeTicket(interaction);
    }
};
