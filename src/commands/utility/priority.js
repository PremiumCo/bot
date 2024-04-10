//import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
//import { ticketCategory, supportRoleId } from '../../../config.json';

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const {
    ticketCategory,
    supportRoleId,
    managementRoleId,
    ownershipAssistantRoleId,
    ownerRoleId
} = require('../../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('priority')
        .setDescription('Sets the priority of a ticket')
        .addStringOption((option) =>
            option
                .setName('priority')
                .setDescription('The priority of the ticket')
                .setRequired(true)
                .addChoices(
                    { name: 'Low - Any Team Member', value: 'low' },
                    { name: 'Medium - Ownership Assist/Management', value: 'medium' },
                    { name: 'High - Ownership', value: 'high' }
                )
        ),
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

        if (interaction.channel.parentId !== ticketCategory)
            return interaction.reply({
                embeds: [
                    errorEmbed(
                        'This command can only be used in a ticket channel.'
                    )
                ],
                ephemeral: true
            });

        const priority = interaction.options.getString('priority');

        // make it so that the priority uses green, yellow, and red emojis

        const priorityEmojis = {
            low: '🟢',
            medium: '🟡',
            high: '🔴'
        };

        if (
            interaction.channel.name.startsWith('🟢') ||
            interaction.channel.name.startsWith('🟡') ||
            interaction.channel.name.startsWith('🔴')
        ) {
            interaction.channel.setName(
                `${priorityEmojis[priority]}-${interaction.channel.name.slice(2)}`
            );
        } else {
            interaction.channel.setName(
                `${priorityEmojis[priority]}-${interaction.channel.name}`
            );
        }

        // Change which roles have permission to access the ticket.
        // Low priority should be supportRoleId, medium should be ownershipAssistantRoleId and managementRoleId, and high should be ownerRoleId
        // Remove permission for the others when changed

        if (priority === 'low') {
            interaction.channel.permissionOverwrites.create(supportRoleId, {
                ViewChannel: true,
                SendMessages: true,
                ReadMessageHistory: true
            });

            interaction.channel.permissionOverwrites.delete(ownershipAssistantRoleId);
            interaction.channel.permissionOverwrites.delete(managementRoleId);
            interaction.channel.permissionOverwrites.delete(ownerRoleId);
        }

        if (priority === 'medium') {
            interaction.channel.permissionOverwrites.create(ownershipAssistantRoleId, {
                ViewChannel: true,
                SendMessages: true,
                ReadMessageHistory: true
            });
            interaction.channel.permissionOverwrites.create(managementRoleId, {
                ViewChannel: true,
                SendMessages: true,
                ReadMessageHistory: true
            });

            interaction.channel.permissionOverwrites.delete(supportRoleId);
            interaction.channel.permissionOverwrites.delete(ownerRoleId);
        }

        if (priority === 'high') {
            interaction.channel.permissionOverwrites.create(ownerRoleId, {
                ViewChannel: true,
                SendMessages: true,
                ReadMessageHistory: true
            });

            interaction.channel.permissionOverwrites.delete(supportRoleId);
            interaction.channel.permissionOverwrites.delete(ownershipAssistantRoleId);
            interaction.channel.permissionOverwrites.delete(managementRoleId);
        }

        interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor('#2f3137')
                    .setDescription(
                        `Priority set to \`${priorityEmojis[priority]} ${priority}\``
                    )
            ],
            ephemeral: true
        });
    }
};