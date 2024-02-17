module.exports = {
    name: 'close-cancel',
    async execute(interaction) {
        // This is broken and isn't needed. It won't ever be called.

        interaction.deferReply();
        interaction.deleteReply();
    }
};
