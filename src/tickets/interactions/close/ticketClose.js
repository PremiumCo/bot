import { closeTicket } from '../../shared/closeTicket';

module.exports = {
    name: 'close',
    async execute(interaction) {
        interaction.deferReply();
        await closeTicket(interaction);
    }
};
