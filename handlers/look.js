'use strict'

const Promise = require('bluebird')
const logger = require('../utils/logger')
const store = require('../store')
const LocationService = require('../services/locations')

class Look {
    constructor() {}

    getLookString(message, bot) {
        store.getState(message.from)
        const viewStr = getRoomDescription(message, bot)


        bot.sendMessage(message.from, viewStr)

        function getRoomDescription(message, bot) {
            // room = LocationService
             const str = LocationService.getRoomDescription(message.from)
             const exits = LocationService.getRoomExitsView(message.from)
             return str + exits
           }
        }
    }

module.exports = Look
