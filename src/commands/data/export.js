const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');
const fs = require('fs');

const BATCH_SIZE = 2067; // Number of users to process at a time for testing
const PROCESSED_USERS_FILE = 'processedUsers.json'; // File to store processed user IDs

let processedUsers = new Set(); // To track processed user IDs

// Load previously processed user IDs from the file
if (fs.existsSync(PROCESSED_USERS_FILE)) {
  const existingProcessedUsers = JSON.parse(fs.readFileSync(PROCESSED_USERS_FILE, 'utf-8'));
  processedUsers = new Set(existingProcessedUsers);
}

// Utility function to delay execution
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('export_test_users')
    .setDescription('Fetch and export a limited number of users without filtering by Hub ID'),

  async execute(interaction) {
    await interaction.deferReply(); // Acknowledge the command

    try {
      const allMembers = await fetchAllMembers(interaction.guild);
      console.log(`Fetched ${allMembers.length} members. Fetching data...`);

      // Limit the processing to the first 10 members
      const totalUsers = Math.min(allMembers.length, BATCH_SIZE);
      const allUserData = [];

      console.log(`Processing up to ${totalUsers} members:`);

      const fetchPromises = allMembers.slice(0, totalUsers).map(async (member) => {
        if (processedUsers.has(member.id)) {
          console.log(`Skipping already processed user: ${member.user.tag} (${member.id})`);
          return; // Skip if this user has already been processed
        }

        console.log(`Fetching data for: ${member.user.tag} (${member.id})`);

        const userData = await fetchUserData(member.id);
        if (userData) {
          console.log(`Data received for ${member.user.tag}:`, userData);

          // Add the user data to the array
          allUserData.push({ discordId: member.id, ...userData });
          processedUsers.add(member.id); // Mark this user as processed
        } else {
          console.log(`No data received for ${member.user.tag}.`);
        }
      });

      await Promise.all(fetchPromises);

      // Check if any user data has been collected
      if (allUserData.length > 0) {
        exportToFile(allUserData, 0);
      } else {
        console.log(`No data to save for the test batch.`);
      }

      fs.writeFileSync(PROCESSED_USERS_FILE, JSON.stringify(Array.from(processedUsers), null, 2));
      console.log('Processed user IDs saved.');

      const successEmbed = new EmbedBuilder()
        .setColor('Green')
        .setTitle('User Data Exported for Testing')
        .setDescription(`Test data has been successfully exported for the limited user set.`);

      await interaction.editReply({ embeds: [successEmbed] });
    } catch (error) {
      console.error('Error exporting user data:', error);

      const errorEmbed = new EmbedBuilder()
        .setColor('Red')
        .setTitle('Error Exporting User Data')
        .setDescription('An error occurred while fetching or exporting user data.');

      await interaction.editReply({ embeds: [errorEmbed] });
    }
  }
};

// Fetch all members from the guild with pagination
async function fetchAllMembers(guild) {
  let members = [];
  let lastId = null;

  while (true) {
    const batch = await guild.members.list({
      limit: 1000, // Max allowed by Discord API
      after: lastId,
    });

    members.push(...batch.values());
    if (batch.size < 1000) break; // No more members to fetch
    lastId = batch.last().id; // Use the last fetched ID for pagination
  }

  return members;
}

// API call to fetch user data with rate limiting
async function fetchUserData(discordId) {
    const maxRetries = 3; // Number of retries for the API call
    let attempt = 0;
  
    while (attempt < maxRetries) {
      await delay(500); // Rate limit for the external API
  
      try {
        const url = `https://api.onpointrblx.com/vendr/v2/users/getinfo/discord/${discordId}?apitoken=${process.env.VENDR_API_KEY}`;
        console.log(`Fetching data for Discord ID: ${discordId} from URL: ${url}`);
        
        const response = await axios.get(url);
        
        // Log the API response status and data
        console.log(`API response for ${discordId}:`, response.status, response.data);
  
        // Check for no data
        if (!response.data || Object.keys(response.data).length === 0) {
          console.log(`No user data found for ${discordId}.`);
          return null; // Skip this user if there's no data
        }
  
        return response.data; // This should contain the user data
      } catch (error) {
        console.error(`API error for ${discordId} (attempt ${attempt + 1}):`, error.message);
        
        // If the error is a rate limit error, you might want to wait longer before retrying
        if (error.response && error.response.status === 429) {
          const retryAfter = error.response.headers['retry-after'] ? parseInt(error.response.headers['retry-after']) * 1000 : 1000; // Default to 1 second
          console.log(`Rate limit exceeded. Retrying after ${retryAfter} ms...`);
          await delay(retryAfter);
        } else {
          return null; // If it's not a rate limit error, exit the loop
        }
      }
  
      attempt++;
    }
  
    console.log(`Max retries reached for Discord ID: ${discordId}.`);
    return null; // If all retries failed, return null
  }

// Export data to a JSON file for the current batch
function exportToFile(data, batchIndex) {
  const jsonData = JSON.stringify(data, null, 2);
  const fileName = `allUserData_batch_${batchIndex + 1}.json`;

  // Attempt to save the file
  try {
    fs.writeFileSync(fileName, jsonData);
    console.log(`User data saved to ${fileName}`);
  } catch (error) {
    console.error(`Failed to save data to ${fileName}:`, error);
  }
}
