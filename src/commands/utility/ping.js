import { SlashCommandBuilder } from 'discord.js';

//import { supabase } from '../../utils/supabase';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction) {
        /*
        const products = supabase.from('products').select('name');

        const { data, error } = await products
        */

        await interaction.reply(`Pong!`);
    }
};
