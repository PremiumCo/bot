import {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} from 'discord.js';

const closeConfirmEmbed = new EmbedBuilder()
    .setColor('#2f3137')
    .setTitle('Are you sure you want to close this ticket?')
    .setDescription('React to confirm below or cancel.');

const closeConfirmOptions = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
        .setCustomId('ticket:close')
        .setLabel('Confirm')
        .setStyle(ButtonStyle.Danger)
    /*
    new ButtonBuilder()
        .setCustomId('ticket:close-cancel')
        .setLabel('Cancel')
        .setStyle(ButtonStyle.Secondary)
    */
);

const embed = {
    embeds: [closeConfirmEmbed],
    components: [closeConfirmOptions],
    ephemeral: true
};

module.exports = embed;
