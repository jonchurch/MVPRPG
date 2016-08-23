'use strict';
const LocationService = require('../services/LocationService')
const PlayerService = require('../services/PlayerService')

class Take {
  constructor (){}

takeItem(message, bot) {
  const input = message.text.toLowerCase().trim()
  const token = input.split(" ")
  token.shift()
  const user = PlayerService.getPlayer(message.from)
  if (LocationService.isInRoom(token[0], user.current_location)) {
    console.log('found it!');
  }
}


}


module.exports = Take
