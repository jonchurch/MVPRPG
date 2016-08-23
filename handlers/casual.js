'use strict'

const Promise = require('bluebird')
const logger = require('../utils/logger')

class Casual {
  constructor() {}

  getGreeting(message, bot) {
    bot.sendMessage(message.from, 'Well hello there,' + message.from)
  }

  getUnrecognized(message, bot) {
    console.log('WUT?');
    bot.sendMessage(message.from, 'Sorry I don\'t follow')
  }

  getHelp(message, bot) {
    bot.sendMessage(message.from, '🔑It\'s dangerous business, walking out one\'s front door\nHere are some commands I understand:\nLook/Examine - see what is around you\nNorth, South, etc - Exit in the direction given')
  }
}

module.exports = Casual
