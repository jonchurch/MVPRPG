'use strict';
module.exports = (function() {
    const Promise = require('bluebird')
    const Rooms = require('../data/rooms')
    const rooms = new Rooms().loadRooms()
    const store = require('../store')
    console.log('Locations excecuting!')


    return {
        getRoomDescription: getRoomDescription,
        getExits: getExits,
        getRoomExitsView: getRoomExitsView,
        roomsList: rooms
    }

    function getRoomDescription(hash) {
        let user = store.getState(hash)
        let loc = user.current_location
        return rooms[loc].getDescription()
    }
    function getExits(loc) {
      const room = rooms[loc]
      return room.exits
    }
    function getRoomExitsView(hash) {
      let user = store.getState(hash)
      let loc = user.current_location
      const exits = rooms[loc].exits
      // 'Exits: North, South, West'
      const arr = []
      for (let i = 0; i < exits.length; i += 1) {
          let direction = exits[i].direction
          arr.push(direction.charAt(0).toUpperCase() + direction.slice(1))
        }
        return '\nExits: ' + arr.join(", ")
}

}());
