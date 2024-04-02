//import fs from 'node:fs';
//import path from 'node:path';
//import { readdir } from 'node:fs/promises';

//import { Events } from 'discord.js';

const fs = require('fs');
const path = require('path');
const { readdir } = require('fs').promises;

const { Events } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (
            !interaction.customId ||
            !interaction.customId.startsWith('ticket:')
        )
            return;
        //const ticketType = interaction.customId.slice('ticket:'.length);

        const ticketType = interaction.customId.split(':')[1];

        // Recursively gets all directories
        const ticketInteractionPath = path.join(
            __dirname,
            '../tickets/interactions'
        );
        const files = await readdir(ticketInteractionPath, { recursive: true });

        const ticketInteractionFiles = files
            .filter((file) => file.endsWith('.js'))
            .map((filename) => `${ticketInteractionPath}/${filename}`);

        for (const file of ticketInteractionFiles) {
            const ticketInteraction = require(file);
            if (ticketInteraction.name === ticketType) {
                ticketInteraction.execute(interaction);
            }
        }
    }
};
