import { ticketLogsChannel } from '../../../../config.json';
import { EmbedBuilder } from 'discord.js';

module.exports = {
    name: 'close',
    async execute(interaction) {
        const ticketClosedLogEmbed = new EmbedBuilder()
            .setColor('#2f3137')
            .setAuthor({
                name: `Ticket ${interaction.channel.name} closed by ${interaction.user.username}`,
                iconURL: interaction.user.displayAvatarURL()
            })
            .setFooter({
                text: 'Closed at'
            })
            .setTimestamp();

        await interaction.guild.channels
            .fetch(ticketLogsChannel)
            .then((channel) =>
                channel.send({
                    embeds: [ticketClosedLogEmbed]
                })
            );

        interaction.channel.delete('Ticket closed.');
    }
};
