const func = require('../resources/functions')
const app = require('../app')

module.exports = {
  name: 'curse',
  aliases: 'curse',
  description: 'says hello',
  usage: 'hello',
  admin: true,
  removal: false,
  async execute(message, args) {
    const target = message.mentions.users.first()
    const user = app.currency.get(target.id);
    user.curse = true
    user.curse_time = Date.now()
    user.save()
    func.log(`cursed ${target}`, message);
    return message.channel.send(`ooga booga you have been cursed`);

  }
}