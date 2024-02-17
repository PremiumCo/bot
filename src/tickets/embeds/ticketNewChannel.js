import {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} from 'discord.js';

const embed = (interaction, modalResults) => {
    const newChannelEmbed = new EmbedBuilder()
        .setColor('#2f3137')
        .setTitle('New Ticket Created')
        .setDescription(
            `Thanks for creating a ticket. You will be assisted shortly.`
        )
        .addFields(
            modalResults.map((result) => ({
                name: result.label,
                value: result.value
            }))
        )
        .setFooter({
            text: `${interaction.user.username}'s ticket`,
            iconURL: interaction.user.displayAvatarURL()
        })
        .setTimestamp()
        .setImage(
            'https://us-east-1.tixte.net/uploads/nov.has.rocks/pbanner.png'
        );

    const newChannelOptions = new ButtonBuilder()
        .setCustomId('ticket:close-panel')
        .setLabel('Close Ticket')
        .setStyle(ButtonStyle.Secondary);

    return {
        embeds: [newChannelEmbed],
        components: [new ActionRowBuilder().addComponents(newChannelOptions)]
    };
};

module.exports = embed;
