'use strict'

const Promise = require('bluebird')
const logger = require('../utils/logger')
const store = require('../store')
const LocationService = require('../services/LocationService')

class Look {
    constructor() {}
        /**
         * atRoom looks the player's current room
         * @param  {object} message Message object sent by player, contains input text
         * @param  {object} bot     Messenger API instance for sending and receiving messages
         * @return {function}    Sends location description and exits to player view
         */
    atRoom(message, bot) {
        store.getState(message.from)
        const viewStr = getRoomDescription(message)
        const keyboard = {
            parse_mode: 'Markdown',
            reply_markup: JSON.stringify({
                keyboard: [
                    [{
                        text: '🔍 Look'
                    }, {
                        text: 'Take 🔑'
                    }],
                    [{
                        text: 'North'
                    }, {
                        text: 'East'
                    }, {
                        text: 'South'
                    }, {
                        text: 'West'
                    }]
                ],
                resize_keyboard: true
            })
        }
        bot.sendMessage(message.from, viewStr, keyboard)
    }

    atObject(message, bot) {
      const user = store.getState(message.from)
      const inputArr= message.text.trim().toLowerCase().split(" ")
      const objectStr = inputArr[1]
      const found = LocationService.isInRoom(objectStr, user.current_location)
      console.log('OBJECT STRING====\n',objectStr);
      let viewStr
      if (found) {
        viewStr = found.description
      } else viewStr = 'Nothing to see'
      // const viewStr = getObjectDescription(message)
      const keyboard = {
          parse_mode: 'Markdown',
          reply_markup: JSON.stringify({
              keyboard: [
                  [{
                      text: '🔍 Look'
                  }, {
                      text: 'Take 🔑'
                  }],
                  [{
                      text: 'North'
                  }, {
                      text: 'East'
                  }, {
                      text: 'South'
                  }, {
                      text: 'West'
                  }]
              ],
              resize_keyboard: true
          })
      }
      bot.sendMessage(message.from, viewStr, keyboard)
    }
}

function getObjectDescription(message) {

}

function getRoomDescription(message) {
    const roomName = LocationService.getRoomName(message.from)
    const description = LocationService.getRoomDescription(message.from)
    const exits = LocationService.getRoomExitsView(message.from)
    const items = LocationService.getRoomItemsView(message.from)
    return roomName + description + exits
}

module.exports = Look
