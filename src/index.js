//import 'dotenv/config';
require('dotenv').config();

const fs = require('fs');
const path = require('path');

//import fs from 'node:fs';
//import path from 'node:path';

const { fileURLToPath } = require('node:url');
const { dirname } = require('node:path');

/*
import {
    Client,
    Collection,
    GatewayIntentBits,
    ActivityType
} from 'discord.js';
*/

const {
    Client,
    Collection,
    GatewayIntentBits,
    ActivityType
} = require('discord.js');
const { get } = require('http');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
    presence: {
        status: 'online',
        activities: [
            {
                name: '🛠️ Maintenance ',
                type: ActivityType.Listening
            }
        ]
    }
});

//const __filename = fileURLToPath(import.meta.url);
//const __dirname = dirname(__filename);

// Command files
client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs
        .readdirSync(commandsPath)
        .filter((file) => file.endsWith('.js'));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(
                `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
            );
        }
    }
}

// Event files
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.login(process.env.TOKEN);
