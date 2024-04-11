const { EmbedBuilder } = require('discord.js');
const embed = require('../../embeds/ticketNewChannel');

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

async function getUserData(discordID) {
    const API_Server = 'https://api.onpointrblx.com/vendr/v2';
    const API_Endpoint = `/users/getinfo/discord/${discordID}`;

    const response = await fetch(
        `${API_Server}${API_Endpoint}?apitoken=${process.env.VENDR_API_KEY}`
    );

    const data = await response.json();

    if (data.error) {
        return console.error(data.error);
    }

    return data;
}

let productTable;

module.exports = {
    name: 'owned-products',
    async execute(interaction) {
        const ticketCreator = interaction.message.mentions.users.first().id;
        const userData = await getUserData(ticketCreator);

        if (userData.Licences == undefined) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor('#2f3137')
                        .setDescription(`No products owned by <@${ticketCreator}>`)
                ],
                ephemeral: true
            });
        }

        if (productTable === undefined) {
            productTable = await getProductData();
        }

        let ownedProducts = [];

        // Delete later?
        console.log(ownedProducts)

        userData.Licences.forEach((licence) => {
            if (productTable.hasOwnProperty(licence.Product)) {
                ownedProducts.push(productTable[licence.Product]);
            }
        });

        return interaction.reply({
            embeds: [
                new EmbedBuilder().setColor('#2f3137').addFields({
                    name: 'Products',
                    value: ownedProducts
                        .map((product) => `- ${product}`)
                        .join('\n')
                })
            ],
            ephemeral: true
        });
    }
};