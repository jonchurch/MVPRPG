'use strict'

// const Promise = require('bluebird')
// const logger = require('../utils/logger')
const store = require('../store')
const LocationService = require('../services/LocationService')
const find = require('lodash.find')
const PlayerService = require('../services/PlayerService')
const Look = require('./look')
const look = new Look()

class Commands {

  constructor() {}

  updateView(message, bot) {
    const callbackData = message.data
    console.log('message',message);
    console.log('message_id',message.parentMessage.message_id);
    if (callbackData === 'EXIT/EXPAND') {
      let reply_markup = JSON.stringify({
              inline_keyboard: [
                  [{
                      text: 'North',
                      callback_data: 'EXIT/NORTH'
                  }],
                  [{
                      text: 'East',
                      callback_data: 'EXIT/EAST'
                  }],
                  [{
                      text: 'South',
                      callback_data: 'EXIT/SOUTH'
                  }],
                  [{
                      text: 'WEST',
                      callback_data: 'EXIT/WEST'
                  }]
              ]
          })

const options = {
  chat_id: message.chat_id,
  message_id: message.parentMessage.message_id
}
      bot.editMessageReplyMarkup(reply_markup, options)
    }
  }

/**
 * exit looks for player input in current room exits, if found move to new room location
 * Relook players new room, sending room desc + exits to view
 * @param  {object} message Message object sent by player, contains input text
 * @param  {object} bot     Messenger API instance for sending and receiving messages
 * @return {object}   Returns message sent to the player
 */
exit(message, bot) {
    const input = message.text.toLowerCase()
    // If message.text matches a room exit of users current room
    const user = store.getState(message.from)
    const room_exits = LocationService.getExits(user.current_location)
    const found = find(room_exits, ['direction', input])
    //The goal here is to move the player and relook the rooms
    PlayerService.movePlayer(message.from, found.location)
  return  look.getLookString(message, bot)

  }
  /**
   * getInventoryView handles player inventory input
   * Sends a player's inventory list to their view
   * @param  {object} message Message object sent by player, contains input text
   * @param  {object} bot     Messenger API instance for sending and receiving messages
   * @return {object}    Returns message sent to the player
   */
  getInventoryView(message, bot) {
    const user = PlayerService.getPlayer(message.from)
    const inv = user.inventory
    let invStr
    if (inv.length > 0){
    const arr = []
    for (let i = 0; i < inv.length; i += 1) {
      arr.push(inv[i].name)
    }
    invStr = "Inventory: " + arr.join(", ")
  } else  invStr = "Inventory empty"
  return  bot.sendMessage(message.from, invStr)

  }



}

module.exports = Commands
