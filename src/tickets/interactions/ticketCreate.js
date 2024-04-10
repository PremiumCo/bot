//import { ticketCategory, supportRoleId } from '../../../config.json';
//import { EmbedBuilder } from 'discord.js';

//import ticketNewChannelEmbed from '../embeds/ticketNewChannel';

const { ticketCategory, supportRoleId } = require('../../../config.json');
const { EmbedBuilder } = require('discord.js');

const ticketNewChannelEmbed = require('../embeds/ticketNewChannel');

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

                // Ping the interaction user and then delete the message
                //c.send(`<@${interaction.user.id}>`).then((m) => m.delete());

            /*
                            {
                name: 'Owned Products',
                value: ownedProducts ? ownedProducts.map((product) => `- ${product.name}`).join('\n') : 'None'
            }
            */
            });
    }
};
