const func = require('../resources/functions')

module.exports = {
  name: 'support',
  aliases: 'support',
  description: 'gets link to the support server',
  usage: 'support',
  admin: false,
  removal: false,
  async execute(message, args) {
		func.log(`is looking for the support server`, message);
    return message.channel.send("https://discord.gg/teVCtMX");

  }
}