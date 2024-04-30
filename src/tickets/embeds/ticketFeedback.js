const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const embed = (ticketCreator, ticketCloser) => {
    const feedbackEmbed = new EmbedBuilder(ticketCreator, ticketCloser)
        .setColor('#2f3137')
        .setTitle('Ticket Closed')
        .setDescription(
            'Thank you for reaching out to us. We hope we were able to assist you.\n\nWe would appreciate it if you could take a moment to provide feedback on your experience with the buttons below. Please leave a honest review so we can work on a better team!'
        )
        .setFields(
            {
                name: 'Opened by',
                value: `<@${ticketCreator}>`,
                inline: true
            },
            {
                name: 'Closed by',
                value: `<@${ticketCloser}>`,
                inline: true
            }
        )
        .setTimestamp();

    // Satisfaction feedback buttons

    const embedOptions = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId('ticket:feedback-low')
            .setEmoji('🙁')
            .setLabel('Could be better')
            .setStyle(ButtonStyle.Danger),
        new ButtonBuilder()
            .setCustomId('ticket:feedback-medium')
            .setEmoji('🙂')
            .setLabel('Decent')
            .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
            .setCustomId('ticket:feedback-high')
            .setEmoji('😃')
            .setLabel('Excellent')
            .setStyle(ButtonStyle.Success)
    );

    return {
        embeds: [feedbackEmbed],
        components: [embedOptions],
        fetchReply: true
    };
};

module.exports = embed;
