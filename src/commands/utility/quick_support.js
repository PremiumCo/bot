//import { SlashCommandBuilder } from 'discord.js';

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const responses = require('../../utils/responses.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quick_support')
        .setDescription('Answers to frequently asked questions')
        .addStringOption((option) =>
            option
                .setName('question')
                .setDescription('The question you want an answer to')
                .setRequired(true)
                .addChoices(
                    {
                        name: 'Streaming Enabled',
                        value: 'streaming_enabled'
                    },
                    {
                        name: 'Studio Testing',
                        value: 'studio_testing'
                    },
                    {
                        name: 'HTTP Enabled',
                        value: 'http_enabled'
                    }
                )
        ),
    async execute(interaction) {
        const question = interaction.options.getString('question');
        const answer = responses[question];

        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor('#2f3137')
                    .setTitle(answer.name)
                    .setDescription(answer.content)
            ]
        });
    }
};
