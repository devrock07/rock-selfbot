const axios = require('axios');

module.exports = {
    name: 'bal',
    description: '🔍 Checks the balance of a Litecoin (LTC) wallet address and its equivalent in USD and INR.',
    /**
     * Executes the bal command.
     * 
     * @param {Channel} channel The channel where the command was executed.
     * @param {Message} message The message object for the command.
     * @param {Client} client The client or bot instance.
     * @param {String[]} args The arguments passed with the command.
     */
    async execute(channel, message, client, args) {
        // Check if the user provided a Litecoin address
        if (args.length !== 1) {
            return message.channel.send('❌ Please provide a Litecoin (LTC) wallet address.');
        }

        // Get the Litecoin address from the command arguments
        const ltcAddress = args[0];

        try {
            // Delete the command message
            message.delete();

            // Fetch Litecoin address details from BlockCypher API
            const response = await axios.get(`https://api.blockcypher.com/v1/ltc/main/addrs/${ltcAddress}`);
            const data = response.data;

            // Extract balance and other details
            const balanceLTC = data.balance / 100000000; // Convert satoshis to LTC
            const balanceUSD = balanceLTC * 176.29; // Assuming 1 LTC = 176.29 USD (can be adjusted)
            const balanceINR = balanceLTC * 13068.90; // Assuming 1 LTC = 13068.90 INR (can be adjusted)
            const totalReceived = data.total_received / 100000000;
            const totalSent = data.total_sent / 100000000;
            const transactionCount = data.n_tx;

            // Construct the message with balance and other details
            const balanceMessage = `📈 **Litecoin (LTC) Wallet Address:** ${ltcAddress}\n` +
                                   `💰 **Balance (LTC):** ${balanceLTC} LTC\n` +
                                   `💵 **Balance (USD):** $${balanceUSD.toFixed(2)}\n` +
                                   `🇮🇳 **Balance (INR):** ₹${balanceINR.toFixed(2)}\n` +
                                   `📥 **Total Received:** ${totalReceived} LTC\n` +
                                   `📤 **Total Sent:** ${totalSent} LTC\n` +
                                   `🔢 **Number of Transactions:** ${transactionCount}`;

            // Send the balance message to the channel
            message.channel.send(balanceMessage);
        } catch (error) {
            console.error('Error fetching Litecoin balance:', error.response.data);
            message.channel.send('❌ Error fetching Litecoin balance. Please check the provided address.');
        }
    }
};
