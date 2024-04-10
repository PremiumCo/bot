/*
import {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} from 'discord.js';
*/

const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const embed = (interaction) => {
    const closeConfirmEmbed = new EmbedBuilder()
        .setColor('#2f3137')
        .setTitle('Are you sure you want to close this ticket?')
        .setDescription('React to confirm below or cancel.');

    const closeConfirmOptions = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId('ticket:close')
            .setLabel('Confirm')
            .setStyle(ButtonStyle.Danger)
    );

    const ticketCreator = interaction.message.mentions.users.first().id;

    return {
        content: `<@${ticketCreator}>'s Ticket`,
        embeds: [closeConfirmEmbed],
        components: [closeConfirmOptions],
        ephemeral: true
    };
};

module.exports = embed;
