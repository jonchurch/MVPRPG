'use strict';

// const commands = require('../constants/commands')
const store = require('../store')
const LocationService = require('../services/LocationService')
const find = require('lodash.find')

class InputParser {
    // commands

    isInventory(text) {
      const pattern = /inventory/i

      return text.match(pattern)
    }

    isTake(text) {
      const pattern = /take/i

      return text.match(pattern)
    }

    isLook(text) {
        const pattern = /look|examine/i

        return text.match(pattern)
    }

    isExit(message) {
        if (message.text) {
            const input = message.text.toLowerCase()
                // If message.text matches a room exit of users current room
            const user = store.getState(message.from)
            const room_exits = LocationService.getExits(user.current_location)
            const found = find(room_exits, ['direction', input])
            if (found) {
                return true
            }
            // const commands = user.commands
        }
        return false
    }


    // testing
    isGreeting(text) {
        const pattern = /hi|sup|hello|yo/i

        return text.match(pattern)
    }

    // isStart(text){
    //   const pattern = new RegExp('//start/i')
    //
    //   return text.match(pattern)
    // }

    isHelp(text) {
        const pattern = /help/i

        return text.match(pattern)
    }


}

module.exports = InputParser
