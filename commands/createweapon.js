const func = require('../resources/functions')
const app = require('../app')

module.exports = {
  name: 'createweapon',
  aliases: 'createweapon',
  description: 'creates a new item',
  usage: 'createweapon {item} {type} {ench} {damage} {attribute} {scale} {heal} {amount}',
  admin: true,
  removal: false,
  async execute(message, args) {
    const user = app.currency.get(message.author.id)
    if (!args[0]) return message.channel.send('item, type, enchant, damage, attribute, scale, heal, amount')
    func.log(`created an item`, message)
    return await user.addUniqueItem(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7])

  }
}