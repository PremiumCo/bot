// Import required modules
const { SlashCommandBuilder } = require('discord.js');
const os = require('os');

// Function to format uptime
function formatUptime(uptime) {
    const seconds = Math.floor(uptime % 60);
    const minutes = Math.floor((uptime / 60) % 60);
    const hours = Math.floor((uptime / 3600) % 24);
    const days = Math.floor(uptime / 86400);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('uptime')
        .setDescription('Displays bot uptime.'),
    async execute(interaction) {
        // Get system uptime
        const uptime = os.uptime();
        // Format uptime
        const formattedUptime = formatUptime(uptime);
        // Reply with the formatted uptime
        await interaction.reply(`Uptime: ${formattedUptime}`);
    }
};
