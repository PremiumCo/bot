import { SlashCommandBuilder } from 'discord.js';
import ticketSetupEmbed from '../../tickets/embeds/ticketSetup';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ticket')
        .setDescription('Replies with Pong!'),
    async execute(interaction) {
        // Prevents there from being a reply sent.
        interaction.deferReply();
        interaction.deleteReply();

        // Sends a message to the channel.
        interaction.channel.send(ticketSetupEmbed);
    }
};
