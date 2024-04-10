/*
import {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} from 'discord.js';
*/

const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const embed = (interaction, modalResults) => {
    const newChannelEmbed = new EmbedBuilder()
        .setColor('#2f3137')
        .setTitle('New Ticket Created')
        .setDescription(
            `Thanks for creating a ticket. You will be assisted shortly.`
        )
        .addFields(
            modalResults.map((result) => ({
                name: result.label,
                value: result.value
            }))
        )
        .setFooter({
            text: `${interaction.user.username}'s ticket`,
            iconURL: interaction.user.displayAvatarURL()
        })
        .setTimestamp()
        .setImage(
            'https://us-east-1.tixte.net/uploads/nov.has.rocks/pbanner.png'
    );

    const newChannelOptions = new ButtonBuilder()
        .setCustomId('ticket:close-panel')
        .setLabel('Close Ticket')
        .setStyle(ButtonStyle.Secondary);
    
    const productButton = new ButtonBuilder()
        .setCustomId('ticket:owned-products')
        .setLabel('Owned Products')
        .setStyle(ButtonStyle.Secondary);

    return {
        content: `<@${interaction.user.id}>`,
        embeds: [newChannelEmbed],
        components: [new ActionRowBuilder().addComponents(newChannelOptions, productButton)]
    };
};

module.exports = embed;
