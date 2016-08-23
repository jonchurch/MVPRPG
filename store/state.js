'use strict'

class State {
  constructor(command, data, loc) {
    this.command = command
    this.data = data
    this.curent_location = loc
  }
}

module.exports = State
