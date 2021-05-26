const func = require('../resources/functions')
const app = require('../app')

module.exports = {
  name: 'run',
  aliases: ['run'],
  description: 'attempt to leave combat',
  usage: 'run',
  admin: false,
  removal: false,
  execute(message, args, client) {
    const user = app.currency.get(message.author.id)
    if (!user.combat) return message.channel.send('you are not in combat')
    if (!user.turn) return message.channel.send('not your turn')
    const tUser = app.currency.get(user.combat_target_id)
    let rand = Math.round(Math.random() * 4)

    user.turn = Boolean(false)
    tUser.turn = Boolean(true)
    user.save()
    tUser.save()

    if (rand < 3) {
      message.channel.send('you failed to run away')
      return message.channel.send(`<@${user.combat_target_id}>, it is your turn`)
    }
    user.combat = Boolean(false)
    user.combat_exp -= Number(1)
    tUser.combat = Boolean(false)
    tUser.combat_exp += Number(1)
    user.save()
    tUser.save()

    func.log(`ran away from ${user.combat_target_id}`, message, client);
    return message.channel.send(`${message.author.username} ran away from ${user.combat_target}`);

  }
}