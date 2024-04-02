/*
import {
    EmbedBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
    ActionRowBuilder
} from 'discord.js';
*/

const { EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } = require('discord.js');

const troubleshooterEmbed = new EmbedBuilder()
    .setColor('#2f3137')
    .setTitle('Troubleshooter')
    .setDescription(
        'We heavily suggest reviewing these common issues. Note that our products **do not work** in Roblox Studio.'
    );

const embed = {
    embeds: [troubleshooterEmbed]
};

module.exports = embed;
