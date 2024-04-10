const {
    ticketLogsChannel,
    ticketFeedbackChannel,
    ticketTranscriptChannel
} = require('../../../config.json');

const logMessage = async (interaction, message, logType) => {
    let logChannel = ticketLogsChannel;

    if (logType === 'feedback') {
        logChannel = ticketFeedbackChannel;
    } else if (logType === 'transcript') {
        logChannel = ticketTranscriptChannel;
    }

    await interaction.guild.channels
        .fetch(logChannel)
        .then(channel =>
            channel.send(message)
        );
};

module.exports = logMessage;
