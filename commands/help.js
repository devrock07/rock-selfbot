const fs   = require("fs"),
      path = require("path")

module.exports = {
    name: "help",
    description: "Displays a list of available commands.",
    execute(channel, message, client, args) {
        message.delete().catch((f) => {})
        const { prefix } = require("../config"),
        commandsName = fs.readdirSync(path.resolve(__dirname, "../commands")).filter((j) => j.endsWith(".js"))
        let k = "🚀 **Help - Available Commands** 🚀\n\n"
        commandsName.forEach((fileName) => {
            try {
                const commandFile = require("../commands/" + fileName)
                k += `🔸**${prefix}${commandFile.name}** ${commandFile.description}\n`
            } catch (err) {
                console.error("Error loading command file: " + fileName, err)
            }
        })

        const p = k.match(/[\s\S]{1,2000}/g)
        p.forEach((q) => {
            channel.send(q).catch((r) => console.error("Failed to send help message:", r))
        })
    },
}