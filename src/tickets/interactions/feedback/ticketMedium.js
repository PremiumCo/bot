const logMessage = require('../../shared/logger');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'feedback-medium',
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#2f3137')
            .setAuthor({
                name: `Feedback from ${interaction.user.username}`,
                iconURL: interaction.user.displayAvatarURL()
            })
            .setDescription('Decent satisfaction')
            .setTimestamp();

        logMessage(interaction, { embeds: [embed] }, 'feedback');

        await interaction.message.delete();

        interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor('#2f3137')
                    .setDescription(
                        'Thank you for your feedback! We are glad you had a good experience.'
                    )
            ]
        });
    }
};
