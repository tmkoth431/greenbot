const fs = require('fs');
const config = require('../config.json');

module.exports = {
	log: function(text, message, client) {
		var readarchives = fs.readFileSync('archives.txt', `utf-8`);
		var text2 = `${String(text)}`
		var author = `<${message.author.id}>`
		for (var i = 0; i < config.coolids.length; i++) {
			text2 = text2.replace('@', '')
			text2 = text2.replace(`${config.coolids[i]}`, `${config.coolnames[i]}`)
			if (text2.includes(config.coolids[i])) console.log('name change failed')
			author = author.replace(`${config.coolids[i]}`, `${config.coolnames[i]}`)
		}
		fs.writeFileSync('archives.txt', readarchives+`\n${message.createdAt}: ${message.guild} - ${author} ${text2}`)
		client.channels.cache.get('837801271036608572').send(`${message.guild} - ${author} ${text2}`)
		return console.log(`${client.ws.ping}ms ${message.createdAt}: ${message.guild} - ${author} ${text2}`);
	},
	logconsole: function (text, time, client) {
		var readarchives = fs.readFileSync('archives.txt', `utf-8`);
		var text2 = `${String(text)}`
		for (var i = 0; i < config.coolids.length; i++) {
			text2 = text2.replace(`${config.coolids[i]}`, `${config.coolnames[i]}`)
			if (text2.includes(config.coolids[i])) console.log('name change failed')
		}
		fs.writeFileSync('archives.txt', readarchives + `\n${time} - <console> ${text2}`)
		client.channels.cache.get('837801271036608572').send(`<console> ${text2}`)
		return console.log(`${client.ws.ping}ms ${time} - <console> ${text2}`);
	},
	clearStatus: function(userEffects) {
		userEffects.burn = Number(0)
		userEffects.poison = Number(0)
		return userEffects.save()
	},
	calclvl: function(lvl) {
		return Math.round(Math.pow((lvl + 1), 1.5))
	},
	levelup: function (message, user, client) {
		if (user.exp >= this.calclvl(user.level)) {
			user.exp -= this.calclvl(user.level)
			user.level += Number(1)
			user.level_points += Number(1)
			user.save()
			this.logconsole(`${user.user_id} leveled up`, message.createdAt, client)
			message.channel.send(`${message.author} leveled up`)
			this.levelup(message, user, client)
		} else {
			return
		}
	},
	die: function(message, cause, user, userEffects, client) {
		user.health = Number(1)
		user.balance = 0
		user.save()
		userEffects.save()
		this.clearStatus(userEffects)
		this.log(cause, message, client)
		return message.reply(cause)
	},
	updateEffects: function(message, user, userEffects) {
		if (userEffects.burn > 0) {
			user.health -= Number(2)
			userEffects.burn -= Number(1)
			user.save()
			userEffects.save()
			if (userEffects.burn < 1) message.reply('you are no longer burning')
			return cause = 'burned to death'
		}
		if (userEffects.poison > 0) {
			user.health -= Number(1)
			userEffects.burn -= Number(1)
			user.save()
			userEffects.save()
			if (userEffects.poison < 1) message.reply('you are no longer poisoned')
			return cause = 'died by poison'
		}
		return cause = 'just died'
	}
}