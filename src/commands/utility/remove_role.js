const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('removerole')
        .setDescription('Removes a role from a user and sends a termination message')
        .addUserOption(option => 
            option.setName('user')
                .setDescription('The user to remove the role from')
                .setRequired(true))
        .addRoleOption(option => 
            option.setName('role')
                .setDescription('The role to remove')
                .setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const role = interaction.options.getRole('role');

        // Fetch the member object from the guild
        const member = await interaction.guild.members.fetch(user.id);

        if (!member) {
            return interaction.reply({ content: 'User not found!', ephemeral: true });
        }

        if (!role) {
            return interaction.reply({ content: 'Role not found!', ephemeral: true });
        }

        // Check if the bot has the right permissions
        if (!interaction.guild.members.me.permissions.has('MANAGE_ROLES')) {
            return interaction.reply({ content: 'I do not have permission to manage roles.', ephemeral: true });
        }

        // Check if the role is lower than the bot's highest role
        if (role.position >= interaction.guild.members.me.roles.highest.position) {
            return interaction.reply({ content: 'I cannot remove this role as it is higher or equal to my highest role.', ephemeral: true });
        }

        try {
            await member.roles.remove(role);

            // Send a professional DM to the user about their termination
            await user.send(`
                **Dear ${user.username},**

                We regret to inform you that your role of **${role.name}** has been removed, and you are no longer with the company. This decision was made in accordance with company policies.

                If you have any questions or need further clarification, please feel free to reach out.

                We wish you all the best in your future endeavors.

                **Best regards,**  
                Premium Platforming
            `);
            
            // Optionally, send a confirmation message in the interaction channel
            await interaction.reply({ content: `Removed role ${role.name} from <@${user.id}> and notified them via DM.`, ephemeral: true });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error removing the role or sending a DM.', ephemeral: true });
        }
    },
};
