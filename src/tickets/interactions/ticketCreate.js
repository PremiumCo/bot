//import { ticketCategory, supportRoleId } from '../../../config.json';
//import { EmbedBuilder } from 'discord.js';

//import ticketNewChannelEmbed from '../embeds/ticketNewChannel';

const { ticketCategory, supportRoleId } = require('../../../config.json');
const { EmbedBuilder } = require('discord.js');

const ticketNewChannelEmbed = require('../embeds/ticketNewChannel');
const responses = require('../../utils/responses.json');

module.exports = {
    name: 'create',
    async execute(interaction) {
        const ticketOptionsType = interaction.customId.split(':')[2];

        const modalResults = [];

        interaction.fields.fields.map((field) => {
            modalResults.push({
                label: field.customId,
                value: field.value
            });
        });

        interaction.guild.channels
            .create({
                name: `${ticketOptionsType}-${interaction.user.username}`,
                // Category ID
                parent: ticketCategory,
                permissionOverwrites: [
                    {
                        id: interaction.user.id,
                        allow: [
                            'ViewChannel',
                            'SendMessages',
                            'ReadMessageHistory'
                        ]
                    },
                    {
                        id: interaction.guild.roles.everyone,
                        deny: ['ViewChannel']
                    },
                    {
                        id: supportRoleId,
                        allow: [
                            'ViewChannel',
                            'SendMessages',
                            'ReadMessageHistory'
                        ]
                    }
                ]
            })
            .then(async (c) => {
                // Ticket Opened Message
                const ticketCreationReplyEmbed = new EmbedBuilder()
                    .setColor('#2f3137')
                    .setAuthor({
                        name: 'Ticket Created',
                        iconURL:
                            'https://us-east-1.tixte.net/uploads/nov.has.rocks/a3.png'
                    })
                    .setDescription(
                        `Your ticket has been created, jump to <#${c.id}>`
                    );

                interaction.reply({
                    embeds: [ticketCreationReplyEmbed],
                    ephemeral: true
                });

                // Send new channel message
                c.send(ticketNewChannelEmbed(interaction, modalResults));

                // Autoresponses
                if (ticketOptionsType != 'support') return;

                function autoRespond(prop, answerName, keywords) {
                    const userResponse = prop.value.toLowerCase();

                    if (keywords.includes(userResponse)) {
                        const answer = responses[answerName];

                        c.send({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor('#2f3137')
                                    .setTitle(answer.name)
                                    .setDescription(answer.content)
                            ]
                        });
                    }
                }

                autoRespond(modalResults[1], 'studio_testing', ['yes', 'yea', 'true', 'positive']);
                autoRespond(modalResults[2], 'streaming_enabled', ['yes', 'yea', 'true', 'positive']);
                autoRespond(modalResults[2], 'http_enabled', ['no', 'nope', 'nah', 'negative', 'false']);
                autoRespond(modalResults[3], 'game_ownership', ['no', 'nope', 'nah', 'negative', 'false']);
            });
    }
};
