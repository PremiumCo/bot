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
            `Thanks for creating a ticket. You will be assisted shortly by one of our Team Members. \n\n Please remember to NOT Ping support team. We will respond to your ticket in the order it was made. \n\n Please do not close your own ticket! It bugs our system.`
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
        content: `<@${interaction.user.id}> <@&841785398997155900>`,
        embeds: [newChannelEmbed],
        components: [new ActionRowBuilder().addComponents(newChannelOptions, productButton)]
    };
};

module.exports = embed;
