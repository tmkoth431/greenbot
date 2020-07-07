const app = require('../app')
const func = require('../resources/functions')
const { currency } = require('../app')
const { UserItems, UserEffects } = require('../dbObjects')
const config = require('../config.json')

module.exports = {
  name: 'stats',
  aliases: 'stat',
  description: 'gets the stats of a target',
  usage: 'stats [@target]',
  async execute(message, args) {
    const target = message.mentions.users.first() || message.author
    const user = currency.get(target.id)
    const weapon = await UserItems.findOne({ where: { user_id: message.author.id, equipped: true }}) || 'no weapon equipped'
    const userEffects = await UserEffects.findOne({ where: { user_id: message.author.id } })
    var effects = ''
    if (userEffects.burn > 0) effects += `<:fire_ball:730127089860345866>`
    if (userEffects.poison > 0) effects += `${config.poison}`
    if (!user) return message.channel.send(`${target.username} was not found`)
    func.log(`is checking the stats of ${target}`, message)
    return message.channel.send(`${target.username}'s stats: \n` +
      `level: ${user.level} \n` +
      `health: ${user.health}/${user.max_health} \n` +
      `luck: ${user.luck} \n` +
      `biggest fish: ${user.biggest_catch} \n` +
      `weapon: ${weapon.item_id}\n` +
      `status\n` +
      `${effects}`
      , { code: true })

  }
}