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

/**
 * exit handles player exit input
 * @param  {object} message Message object sent by player, contains input text
 * @param  {object} bot     Messenger API instance for sending and receiving messages
 * @return {function}    Relooks players new room, sending room desc + exits to view
 */
exit(message, bot) {
    const input = message.text.toLowerCase()
    // If message.text matches a room exit of users current room
    const user = PlayerService.getPlayer(message.from)
    const room_exits = LocationService.getExits(user.current_location)
    const found = find(room_exits, ['direction', input])
    //The goal here is to move the player and relook the rooms
    PlayerService.movePlayer(message.from, found.location)
  return  look.atRoom(message, bot)

  }
  /**
   * getInventoryView handles player inventory input
   * @param  {object} message Message object sent by player, contains input text
   * @param  {object} bot     Messenger API instance for sending and receiving messages
   * @return {function}    Sends player's inventory list to their view
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
