const Discord = require('discord.js-selfbot-v13');

module.exports = {
    name: 'status3',
    description: 'Change the status automatically with different images in a loop.',
    execute(channel, message, client, args) {
        // Function to set the status
        const setStatus = (statusIndex) => {
            // Clear the console
            console.clear();

            // Log a message indicating that the status changer started
            console.log(`${client.user.tag} - status changer started!`);

            // Array of status objects with different details and images
            const statuses = [
                {
                    name: 'Self Respect',
                    details: 'Self respect',
                    largeImageURL: 'https://cdn.discordapp.com/attachments/1224719915345514626/1225089075590070313/icegif-257.gif?ex=661fdc1c&is=660d671c&hm=a06acea2779db64839aac4dd84ead36303fce061e3fc04ebe55037f051dfdf39&'
                },
                {
                    name: 'Self Improvement',
                    details: 'Self improvement',
                    largeImageURL: 'https://cdn.discordapp.com/attachments/1224719915345514626/1225089223678496799/johan-liebert-nameless-monster.gif?ex=661fdc3f&is=660d673f&hm=1469de0cb96eb0d6211d2fdff6ccf97633924a9f780b60be55e4b23fa05489e4&'
                },
                {
                    name: 'Proper Diet',
                    details: 'Proper diet',
                    largeImageURL: 'https://cdn.discordapp.com/attachments/1224719915345514626/1225089361633083483/solo-leveling-loniyke.gif?ex=661fdc60&is=660d6760&hm=ef1febdb2afdba62ff0f6ac00d3c7526ff0456f891448e92ba27dd9a1750951d&'
                }
            ];

            // Get the current status object
            const status = statuses[statusIndex];

            const r = new Discord.RichPresence()
                .setApplicationId('1200725210656145479') // Keep this as it is
                .setType('STREAMING')
                .setURL('https://www.twitch.tv/zenithsenpai') // Change if needed
                .setState(status.name)
                .setName(status.name)
                .setDetails(status.details)
                .setAssetsLargeImage(status.largeImageURL) // Change to status.largeImageURL
                .setAssetsLargeText('shit.exe') // Set as needed
                //.addButton('Youtube', 'https://www.youtube.com/@ZenithSenpai') // Add button name and URL
                //.addButton('Discord', 'https://discord.gg/Rcn5ZhPt9J'); // Add button name and URL

            client.user.setActivity(r);

            // Log a message indicating that the status is changed
            console.log(`Status ${statusIndex + 1} set!`);

            // Increment status index and loop back to the start if it exceeds the array length
            const nextIndex = (statusIndex + 1) % statuses.length;

            // Call setStatus recursively after 10 seconds (adjustable)
            setTimeout(() => {
                setStatus(nextIndex);
            }, 10000); // Change 10000 to the interval you desire in milliseconds (e.g., 10000 for 10 seconds)
        };

        // Call setStatus to start the status changer loop
        setStatus(0);

        // Send a message indicating that the status changer is started
        channel.send('Status changer started.').catch(err => console.error('Failed to send message:', err));
    }
};
