const app = require('../app')
const func = require('../resources/functions')
const { Users } = require('../dbObjects')

module.exports = {
  name: 'inventory',
  aliases: 'inv',
  description: 'checks user\'s inventory',
  usage: 'inv [@user]',
  async execute(message, args) {
		const target = message.mentions.users.first() || message.author;
		const user = app.currency.get(target.id);
    const items = await user.getItems();
		if (!items.length) return message.channel.send(`${target.tag} has nothing!`);
    const uniqueItems = await user.getUniqueItems()
    func.log(`${message.author} checked ${target}'s inventory`, message)
    if (!uniqueItems.length) {
      return message.channel.send(`${target.tag} currently has:\n${items.map(t => `${t.amount} ${t.item_id}`).join('\n')}`, { code: true });
    } else {
      return message.channel.send(`${target.tag} currently has:\n${items.map(t => `${t.amount} ${t.item_id}`).join('\n')}\n unique items:\n${uniqueItems.map(t => `${t.item_id}`).join('\n')}`, { code: true });
    }
  }
}