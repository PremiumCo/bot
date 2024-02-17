import { ticketLogsChannel } from '../../../../config.json';
import { EmbedBuilder } from 'discord.js';

import * as discordTranscripts from 'discord-html-transcripts';

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

        try {
            const attachment = await discordTranscripts.createTranscript(interaction.channel);

            await interaction.guild.channels
                .fetch(ticketLogsChannel)
                .then((channel) =>
                    channel.send({
                        embeds: [ticketClosedLogEmbed],
                        files: [attachment]
                    })
                );

            interaction.channel.delete('Ticket closed.');
        } catch (error) {
            interaction.reply('An error occured while attempting to close the ticket.')
        }
    }
};
