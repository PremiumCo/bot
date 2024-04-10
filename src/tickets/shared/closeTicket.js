//import { EmbedBuilder } from 'discord.js';
//import * as discordTranscripts from 'discord-html-transcripts';
//import { ticketLogsChannel } from '../../../config.json';

const { EmbedBuilder } = require('discord.js');
const discordTranscripts = require('discord-html-transcripts');
const logMessage = require('./logger');

async function closeTicket(interaction) {
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
        const attachment = await discordTranscripts.createTranscript(
            interaction.channel
        );

        logMessage(
            interaction,
            {
                embeds: [ticketClosedLogEmbed],
                files: [attachment]
            },
            'transcript'
        );

        interaction.channel.delete('Ticket closed.');
    } catch (error) {
        interaction.reply(
            'An error occured while attempting to close the ticket.'
        );
    }
}

module.exports = closeTicket;
