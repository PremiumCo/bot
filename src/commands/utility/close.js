import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { ticketCategory } from '../../../config.json';
import closeTicket from '../../tickets/shared/closeTicket'

module.exports = {
    data: new SlashCommandBuilder()
        .setName('close')
        .setDescription('Closes a ticket'),
    async execute(interaction) {
        function errorEmbed(message) {
            return new EmbedBuilder()
                .setColor('#2f3137')
                .setDescription(message);
        }

        if (interaction.channel.parentId !== ticketCategory)
            return interaction.reply({
                embeds: [
                    errorEmbed(
                        'This command can only be used in a ticket channel.'
                    )
                ],
                ephemeral: true
            });
        
        interaction.deferReply();
        await closeTicket(interaction);
    }
};
