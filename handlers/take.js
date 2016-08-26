'use strict';
const LocationService = require('../services/LocationService')
const PlayerService = require('../services/PlayerService')

class Take {
  constructor (){}

/**
 * takeItem handles player take input
 * Looks for player input in room's items array, adds to invenory if found
 * @param  {object} message Message object sent by player, contains input text
 * @param  {object} bot     Messenger API instance for sending and receiving messages
 * @return {object}    Message sent to the player
 */
takeItem(message, bot) {
  const input = message.text.toLowerCase().trim()
  const token = input.split(" ")
  token.shift()
  const user = PlayerService.getPlayer(message.from)
  const found = LocationService.isInRoom(token[0], user.current_location)
  if (found) {
      PlayerService.addToInventory(message.from, found)
      LocationService.removeItem(token[0], user.current_location)
      console.log('found it!');
      return bot.sendMessage(message.from, found.name + ' added to inventory.' )
  }
  else {
    return bot.sendMessage(message.from, 'I don\'t think I can get you ' + token[0])
  }
}


}


module.exports = Take
