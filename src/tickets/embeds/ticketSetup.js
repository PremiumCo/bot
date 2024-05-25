/*
import {
    EmbedBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
    ActionRowBuilder
} from 'discord.js';
*/

const { EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, MessageFlags } = require('discord.js');

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
        new StringSelectMenuOptionBuilder()
            .setLabel('License Transfers')
            .setValue('transfer')
            .setDescription('Transfering your product licenses to other accounts.'),
        new StringSelectMenuOptionBuilder()
            .setLabel('Applications')
            .setValue('app')
            .setDescription('Application-related tickets.'),
        new StringSelectMenuOptionBuilder()
            .setLabel('Other')
            .setValue('other')
            .setDescription('Any other type of ticket.')
    ]);

// make the embed silent

const embed = {
    embeds: [ticketEmbed],
    components: [new ActionRowBuilder().addComponents(ticketOptions)],
    flags: [MessageFlags.SuppressNotifications]
};

module.exports = embed;
