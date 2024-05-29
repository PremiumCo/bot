/*
import {
    EmbedBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
    ActionRowBuilder
} from 'discord.js';
*/

const { EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } = require('discord.js');

const ticketEmbed = new EmbedBuilder()
    .setColor('#2f3137')
    .setTitle('Create a ticket')
    .setDescription('React below to create a new ticket.')
    .setImage('https://us-east-1.tixte.net/uploads/nov.has.rocks/pbanner.png');

const ticketOptions = new StringSelectMenuBuilder()
    .setCustomId('ticket:ask')
    .setPlaceholder('Select ticket type')
    .addOptions([
        new StringSelectMenuOptionBuilder()
            .setLabel('Product Help Support')
            .setValue('support')
            .setDescription('Support for any product related issues.'),
        new StringSelectMenuOptionBuilder()
            .setLabel('Product Questions')
            .setValue('question')
            .setDescription('Questions about products.'),
        new StringSelectMenuBuilder()
        .setLabel('Product(s) Transfers')
        .setValue('transfer')
        .setDescription('Transfer Prodcuts from one account to another.'),
        new StringSelectMenuOptionBuilder()
            .setLabel('Product Purchasing')
            .setValue('purchase')
            .setDescription(
                'Purchasing products with USD or other currencies.'),
         new StringSelectMenuOptionBuilder()
                .setLabel('Partnership Application')
                .setValue('partnership')
                .setDescription('Apply to become a partner.'),
        new StringSelectMenuOptionBuilder()
            .setLabel('Other')
            .setValue('other')
            .setDescription('Any other type of ticket.')
        
    ]);

const embed = {
    embeds: [ticketEmbed],
    components: [new ActionRowBuilder().addComponents(ticketOptions)]
};

module.exports = embed;
