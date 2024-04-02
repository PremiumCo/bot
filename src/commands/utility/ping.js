import { SlashCommandBuilder } from 'discord.js';

//import { supabase } from '../../utils/supabase';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction) {
        await interaction.reply(`Pong!`);
    }
};
