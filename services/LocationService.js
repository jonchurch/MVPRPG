'use strict';
module.exports = (function() {
    const Promise = require('bluebird')
    const Rooms = require('../data/rooms')
    const rooms = new Rooms().loadRooms()
    const store = require('../store')
    const _ = require('lodash')
    console.log('Locations excecuting!')


    return {
        getRoomDescription: getRoomDescription,
        getExits: getExits,
        getRoomExitsView: getRoomExitsView,
        removeItem: removeItem,
        isInRoom: isInRoom,
        roomsList: rooms
    }

/**
 * removeItem deletes item object from given room's item array
 * @param  {string} item Item Name, player's input
 * @param  {string} loc  id string for room
 */
    function removeItem(item, loc) {
      const roomItems = rooms[loc].items
      const index = _.findIndex(roomItems, ["name", item])
      rooms[loc].items.splice(index, 1)
    }
/**
 * isInRoom checks if item is in room item array
 * @param  {string}  item Item Name, player's input
 * @param  {string}  loc  id string for room
 * @return {Boolean}    returns truthy if item found, falsey if no match
 */
    function isInRoom(item, loc) {
      const roomItems = rooms[loc].items
      const found = _.find(roomItems, ["name", item])
      return found

    }
/**
 * getRoomDescription is a 'look' of players current room
 * @param  {string} hash Player id
 * @return {string}      Desc of players current room
 */
    function getRoomDescription(hash) {
        let user = store.getState(hash)
        let loc = user.current_location
        return rooms[loc].getDescription()
    }
/**
 * getExits returns the exits array of a room
 * @param  {string} loc Room id
 * @return {array}     Array of exit objects
 */
    function getExits(loc) {
        const room = rooms[loc]
        return room.exits
    }
/**
 * getRoomExitsView returns a formatted string
 * that is part of the player view
 * @param  {string} hash Player id
 * @return {string}    Exit view string
 */
    function getRoomExitsView(hash) {
        let user = store.getState(hash)
        let loc = user.current_location
        const exits = rooms[loc].exits
        const arr = []
        for (let i = 0; i < exits.length; i += 1) {
            let direction = exits[i].direction
            arr.push(direction.charAt(0).toUpperCase() + direction.slice(1))
        }
        return '\nExits: ' + arr.join(", ")
    }


}());
