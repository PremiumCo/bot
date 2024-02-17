import closeTicket from '../../shared/closeTicket';

module.exports = {
    name: 'close',
    async execute(interaction) {
        await closeTicket(interaction);
    }
};
