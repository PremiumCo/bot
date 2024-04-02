//import closeTicket from '../../shared/closeTicket';

const { closeTicket } = require('../../shared/closeTicket');

module.exports = {
    name: 'close',
    async execute(interaction) {
        await closeTicket(interaction);
    }
};
