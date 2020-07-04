const func = require('../functions')
const app = require('../../app')

module.exports = {
  name: 'teacher',
  id: 1,
  level: '1',
  async execute(message, user) {
    const rand = Math.round(Math.random() * 2)
    var stat;
    switch (rand) {
      case 0:
        stat = 'being lucky'
        user.luck += Number(1)
        break;
      case 1:
        stat = 'fishing'
        user.fish_exp += Number(2)
        break;
      case 2:
        stat = 'crime'
        user.crime_exp += Number(2)
        break;
    }
    user.save()
    func.log(`was tought about ${stat}`, message)
    return message.reply(`met someone who tought you about ${stat}`)
  },
}