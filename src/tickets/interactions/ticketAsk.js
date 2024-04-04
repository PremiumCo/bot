/*
import { ticketCategory } from '../../../config.json';
import {
    EmbedBuilder,
    ModalBuilder,
    Events,
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder
} from 'discord.js';

import ticketSetupEmbed from '../embeds/ticketSetup';
import ticketNewChannelEmbed from '../embeds/ticketNewChannel';
*/

const { ticketCategory } = require('../../../config.json');

const { EmbedBuilder, ModalBuilder, Events, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

const ticketSetupEmbed = require('../embeds/ticketSetup');
const ticketNewChannelEmbed = require('../embeds/ticketNewChannel');

module.exports = {
    name: 'ask',
    async execute(interaction) {
        const ticketType = interaction.values[0];

        const questions = {
            support: [
                {
                    label: 'What product(s) are you having trouble with?',
                    style: TextInputStyle.Short,
                    placeholder: 'Product Name'
                },
                {
                    label: 'Are you testing in studio?',
                    style: TextInputStyle.Short
                },
                {
                    label: 'Is HTTPS enabled?',
                    style: TextInputStyle.Short
                },
                {
                    label: 'Do you own the game?',
                    style: TextInputStyle.Short
                },
                {
                    label: 'Any further details we should know?',
                    style: TextInputStyle.Paragraph,
                    placeholder: 'Please describe your issue.'
                }
            ],
            question: [
                {
                    label: 'What product(s) do you have a question about?',
                    style: TextInputStyle.Short,
                    placeholder: 'Product Name'
                },
                {
                    label: 'What is your question?',
                    style: TextInputStyle.Paragraph,
                    placeholder: 'Please describe your question in detail.'
                }
            ],
            transfer: [
                {
                    label: 'What product(s) would you like to transfer?',
                    placeholder: 'Product Name',
                    style: TextInputStyle.Short
                },
                {
                    label: 'Who would you like to transfer to?',
                    style: TextInputStyle.Short,
                }
            ],
            other: [
                {
                    label: 'What is your question?',
                    style: TextInputStyle.Paragraph,
                    placeholder: 'Please describe your question in detail.'
                }
            ]
        };

        const modal = new ModalBuilder()
            .setCustomId(`ticket:create:${ticketType}`)
            .setTitle(`Create Ticket`);

        function getQuestions(ticketType) {
            return questions[ticketType].map((question) => {
                return new ActionRowBuilder().addComponents(
                    new TextInputBuilder()
                        .setCustomId(question.label)
                        .setLabel(question.label)
                        .setStyle(question.style)
                        .setPlaceholder(
                            question.placeholder ? question.placeholder : ''
                        )
                        .setMaxLength(
                            question.style === TextInputStyle.Paragraph
                                ? 1000
                                : 100
                        )
                );
            });
        }

        modal.addComponents(getQuestions(ticketType));

        await interaction.showModal(modal).then(async () => {
            const ticketInteractionMessage =
                await interaction.channel.messages.fetch(
                    interaction.message.id
                );

            // Update the message with a new StringSelectMenu
            ticketInteractionMessage.edit(ticketSetupEmbed);
        });
    }
};
