const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { ticketCategory, supportRoleId } = require('../../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ticket_delay')
        .setDescription('Notifies existing tickets of a delay in response.'),
    async execute(interaction) {
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
        
        // Send a message to every channel in the ticket category, except for the one named support

        const channels = interaction.guild.channels.cache.filter(
            (channel) => channel.parentId === ticketCategory && channel.name !== 'support'
        );

        channels.forEach((channel) => {
            channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor('#2f3137')
                        .setTitle('We are currently experiencing a high volume of tickets')
                        .setDescription('We\'re working hard to get to your ticket as soon as possible. Thank you for your patience.')
                ]
            });
        });

        interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor('#2f3137')
                    .setDescription('Notified all tickets of the delay in response.')
            ],
            ephemeral: true
        });
    }
};
