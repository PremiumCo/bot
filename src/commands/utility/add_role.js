const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('giverole')
        .setDescription('Assigns a role to a user')
        .addUserOption(option => 
            option.setName('user')
                .setDescription('The user to assign the role to')
                .setRequired(true))
        .addRoleOption(option => 
            option.setName('role')
                .setDescription('The role to assign')
                .setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const role = interaction.options.getRole('role');

        // Fetch the member object from the guild
        const member = await interaction.guild.members.fetch(user.id);

        // Check if the bot's member object is defined
        const botMember = interaction.guild.members.me;

        if (!member) {
            return interaction.reply({ content: 'User not found!', ephemeral: true });
        }
        
        if (!role) {
            return interaction.reply({ content: 'Role not found!', ephemeral: true });
        }

        // Check if the bot has the right permissions
        if (!botMember.permissions.has('MANAGE_ROLES')) {
            return interaction.reply({ content: 'I do not have permission to manage roles.', ephemeral: true });
        }

        // Check if the role is lower than the bot's highest role
        if (role.position >= botMember.roles.highest.position) {
            return interaction.reply({ content: 'I cannot assign this role as it is higher or equal to my highest role.', ephemeral: true });
        }

        try {
            await member.roles.add(role);
            await interaction.reply({ content: `Assigned role ${role.name} to <@${user.id}>`, ephemeral: true });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error assigning the role.', ephemeral: true });
        }
    },
};
