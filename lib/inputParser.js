'use strict';

// const commands = require('../constants/commands')
const store = require('../store')
const LocationService = require('../services/locations')
const find = require('lodash.find')

class InputParser {
  // commands
  isLook(text){
  	const pattern = /look|examine/i

    return text.match(pattern)
  }

  // testing
  isGreeting(text) {
    const pattern = /hi|sup|hello|yo/i

    return text.match(pattern)
  }

  isExit(message) {
    if (message.text) {
      const input = message.text.toLowerCase()
      // If message.text matches a room exit of users current room
      const user = store.getState(message.from)
      const room_exits = LocationService.getExits(user.current_location)
      const found = find(room_exits, ['direction', input])
      if (found){
        return true
    }
      // const commands = user.commands
    }
    console.log('Not an exit!');
    return false
  }

  isHelp(text){
    const pattern = /help/i

  	return text.match(pattern)
  }


}

module.exports = InputParser
