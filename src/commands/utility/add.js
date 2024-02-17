import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { ticketCategory, supportRoleId } from '../../../config.json';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('add')
        .setDescription('Adds user to ticket')
        .addUserOption((option) =>
            option
                .setName('user')
                .setDescription('The user to add to the ticket')
                .setRequired(true)
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

        const userInTicket = interaction.channel.permissionOverwrites.cache.get(
            interaction.options.getUser('user').id
        );

        if (userInTicket)
            return interaction.reply({
                embeds: [errorEmbed('User is already in the ticket.')],
                ephemeral: true
            });

        const user = interaction.options.getUser('user');

        const addedUserEmbed = new EmbedBuilder()
            .setColor('#2f3137')
            .setAuthor({
                name: `Added ${user.username} to the ticket.`,
                iconURL: user.displayAvatarURL()
            })
            .setTimestamp();

        interaction.channel.permissionOverwrites.edit(user, {
            ViewChannel: true,
            SendMessages: true,
            ReadMessageHistory: true
        });

        interaction.reply({
            embeds: [addedUserEmbed]
        });
    }
};
