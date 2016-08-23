'use strict'

class State {
  constructor(command, data, loc, inv) {
    this.command = command
    this.data = data
    this.curent_location = loc
    this.inventory = inv
  }
}

module.exports = State
