const {
    ticketLogsChannel,
    ticketFeedbackChannel,
    ticketTranscriptChannel,
    guildId
} = require('../../../config.json');

const logMessage = async (interaction, message, logType) => {
    let logChannel = ticketLogsChannel;

    if (logType === 'feedback') {
        logChannel = ticketFeedbackChannel;
    } else if (logType === 'transcript') {
        logChannel = ticketTranscriptChannel;
    }

    const guild = await interaction.client.guilds.fetch(guildId);

    await guild.channels
        .fetch(logChannel)
        .then(channel =>
            channel.send(message)
        );
};

module.exports = logMessage;
