//import { ticketCategory, supportRoleId } from '../../../config.json';
//import { EmbedBuilder } from 'discord.js';

//import ticketNewChannelEmbed from '../embeds/ticketNewChannel';

const { ticketCategory, supportRoleId } = require('../../../config.json');
const { EmbedBuilder } = require('discord.js');

const ticketNewChannelEmbed = require('../embeds/ticketNewChannel');

const fetch = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args));

async function getProductData() {
    const API_Server = 'https://api.onpointrblx.com/vendr/v2';
    const API_Endpoint = '/hubs/getinfo';

    const response = await fetch(
        `${API_Server}${API_Endpoint}?apitoken=${process.env.VENDR_API_KEY}`
    );

    const data = await response.json();

    if (data.error) {
        return console.error(data.error);
    }

    const productTable = {};

    data.Products.forEach((product) => {
        productTable[product._id] = product.Name;
    });

    return productTable;
}

let productTable;

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
                c.send(`<@${interaction.user.id}>`).then((m) => m.delete());

                // Get the users owned products from api
                const API_Server = 'https://api.onpointrblx.com/vendr/v2';
                const API_Endpoint = `/users/getinfo/discord/${interaction.user.id}`;

                const response = await fetch(
                    `${API_Server}${API_Endpoint}?apitoken=${process.env.VENDR_API_KEY}`
                );

                const data = await response.json();

                if (data.error) {
                    return console.error(data.error);
                }

                if (data.Licences.length === 0) {
                    return c.send('No products found for this user.');
                }

                if (productTable === undefined) {
                    productTable = await getProductData();
                }

                let ownedProducts = [];

                data.Licences.forEach(licence => {
                    if (productTable.hasOwnProperty(licence.Product)) {
                        ownedProducts.push(productTable[licence.Product]);
                    }
                });

                return c.send(
                    `> **Owned Products:**\n${ownedProducts.map((product) => `> - ${product}`).join('\n')}`
                );

            /*
                            {
                name: 'Owned Products',
                value: ownedProducts ? ownedProducts.map((product) => `- ${product.name}`).join('\n') : 'None'
            }
            */
            });
    }
};
