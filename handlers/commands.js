'use strict'

const Promise = require('bluebird')
const logger = require('../utils/logger')
const store = require('../store')
const LocationService = require('../services/LocationService')
const find = require('lodash.find')
const PlayerService = require('../services/PlayerService')
const Look = require('./look')
const look = new Look()

class Commands {

  constructor() {}

  exit(message, bot) {
    const input = message.text.toLowerCase()
    // If message.text matches a room exit of users current room
    const user = store.getState(message.from)
    const room_exits = LocationService.getExits(user.current_location)
    const found = find(room_exits, ['direction', input])
    //The goal here is to move the player and relook the rooms
    PlayerService.movePlayer(message.from, found.location)
    look.getLookString(message, bot)

  }



}

module.exports = Commands
