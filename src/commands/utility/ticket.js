//import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
//import ticketSetupEmbed from '../../tickets/embeds/ticketSetup';
//import { supportRoleId } from '../../../config.json';

const { SlashCommandBuilder } = require('discord.js');
const ticketSetupEmbed = require('../../tickets/embeds/ticketSetup');
const { supportRoleId } = require('../../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ticket')
        .setDescription('Creates a new ticket setup.'),
    async execute(interaction) {
        function errorEmbed(message) {
            return new EmbedBuilder()
                .setColor('#2f3137')
                .setDescription(message);
        }

        if (!interaction.member.roles.cache.has(supportRoleId))
            return interaction.reply({
                embeds: [
                    errorEmbed(
                        'You do not have permission to use this command.'
                    )
                ],
                ephemeral: true
            });

        // Prevents there from being a reply sent.
        interaction.deferReply();
        interaction.deleteReply();

        // Sends a message to the channel.
        interaction.channel.send(ticketSetupEmbed);
    }
};
