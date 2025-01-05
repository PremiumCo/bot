const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const {
    ticketCategory,
    supportRoleId,
    managementRoleId,
    ownershipAssistantRoleId,
    ownerRoleId
} = require('../../../config.json');

// Priority emojis and corresponding roles
const priorityEmojis = { low: '🟢', medium: '🟡', high: '🔴' };
const rolePermissions = {
    low: [supportRoleId],
    medium: [ownershipAssistantRoleId, managementRoleId],
    high: [ownerRoleId]
};

const RATE_LIMIT_DELAY = 2000; // 2 seconds delay between actions

module.exports = {
    data: new SlashCommandBuilder()
        .setName('priority')
        .setDescription('Sets the priority of a ticket')
        .addStringOption((option) =>
            option.setName('priority')
                .setDescription('The priority of the ticket')
                .setRequired(true)
                .addChoices(
                    { name: 'Low - Any Team Member', value: 'low' },
                    { name: 'Medium - Ownership Assist/Management', value: 'medium' },
                    { name: 'High - Ownership', value: 'high' }
                )
        ),

    async execute(interaction) {
        const { member, channel, options, user } = interaction;
        const priority = options.getString('priority');

        // Check for permissions
        if (!member.roles.cache.has(supportRoleId)) {
            console.log('User lacks permission to use the command.');
            return interaction.reply({ 
                embeds: [createEmbed('You do not have permission to use this command.')], 
                ephemeral: true 
            });
        }

        // Check if in the correct category
        if (channel.parentId !== ticketCategory) {
            console.log('Command used outside of ticket channel.');
            return interaction.reply({ 
                embeds: [createEmbed('This command can only be used in a ticket channel.')], 
                ephemeral: true 
            });
        }

        try {
            updateChannelName(channel, priority);
            await delay(RATE_LIMIT_DELAY); // Delay to prevent rate limiting
            await updatePermissions(channel, priority);
            await delay(RATE_LIMIT_DELAY); // Delay to prevent rate limiting
            await sendPriorityNotification(channel, priority, user);
            await delay(RATE_LIMIT_DELAY); // Delay to prevent rate limiting

            await interaction.reply({
                embeds: [createEmbed(`Priority set to \`${priorityEmojis[priority]} ${priority}\``)],
                ephemeral: true
            });
        } catch (error) {
            console.error('Error while executing priority command:', error);
            await interaction.reply({
                embeds: [createEmbed('An error occurred while setting the priority.')],
                ephemeral: true
            });
        }
    }
};

function createEmbed(description, color = '#2f3137') {
    return new EmbedBuilder().setColor(color).setDescription(description);
}

function updateChannelName(channel, priority) {
    const emoji = priorityEmojis[priority];
    const name = channel.name.startsWith('🟢') || channel.name.startsWith('🟡') || channel.name.startsWith('🔴')
        ? `${emoji}-${channel.name.slice(2)}`
        : `${emoji}-${channel.name}`;
    
    channel.setName(name)
        .then(() => console.log(`Updated channel name to: ${name}`))
        .catch(error => console.error('Failed to update channel name:', error));
}

async function updatePermissions(channel, priority) {
    const allowedRoles = rolePermissions[priority];
    const allRoles = [supportRoleId, ownershipAssistantRoleId, managementRoleId, ownerRoleId];

    for (const role of allRoles) {
        try {
            await channel.permissionOverwrites[allowedRoles.includes(role) ? 'create' : 'delete'](role, {
                ViewChannel: true,
                SendMessages: true,
                ReadMessageHistory: true
            });
        } catch (error) {
            console.error(`Failed to update permissions for role ${role}:`, error);
        }
    }
}

async function sendPriorityNotification(channel, priority, user) {
    const rolesToMention = rolePermissions[priority].map(roleId => `<@&${roleId}>`).join(', ');
    const embedColor = priority === 'high' ? 'Red' : priority === 'medium' ? 'Orange' : 'Green';

    const embed = new EmbedBuilder()
        .setColor(embedColor)
        .setTitle('Priority Status Changed')
        .setDescription(`${rolesToMention}, ${user} has made this ticket ${priority} priority!`);

    try {
        await channel.send({
            content: rolesToMention,
            embeds: [embed]
        });
        console.log('Sent priority notification.');
    } catch (error) {
        console.error('Failed to send priority notification:', error);
    }
}

// Utility function to create a delay
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
