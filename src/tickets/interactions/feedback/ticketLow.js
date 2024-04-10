const logMessage = require('../../shared/logger');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'feedback-low',
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#ED4245')
            .setAuthor({
                name: `Feedback from ${interaction.user.username}`,
                iconURL: interaction.user.displayAvatarURL()
            })
            .setDescription('Low satisfaction')
            .setTimestamp();

        logMessage(interaction, { embeds: [embed] }, 'feedback');

        await interaction.message.delete();

        interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor('#ED4245')
                    .setDescription(
                        'Thank you for your feedback! We are sorry you had a poor experience.'
                    )
            ]
        });
    }
};