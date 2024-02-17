import { ticketCategory } from '../../../config.json';
import { EmbedBuilder } from 'discord.js';

import ticketNewChannelEmbed from '../embeds/ticketNewChannel';

module.exports = {
    name: 'create',
    async execute(interaction) {
        const ticketOptionsType = interaction.customId.split(':')[2];

        // list the questions, the results, and the ticket type

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

                // New Channel Embed
                c.send(ticketNewChannelEmbed(interaction, modalResults));

                // Ping the interaction user and then delete the message
                c.send(`<@${interaction.user.id}>`).then((m) => m.delete());
            });
    }
};
