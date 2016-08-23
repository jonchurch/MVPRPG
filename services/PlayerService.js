'use strict';

module.exports = (function() {
    const store = require('../store')

    return {
        getPlayer: getPlayer,
        getPlayerLocation: getPlayerLocation,
        movePlayer: movePlayer,
        createPlayer: createPlayer,
        addToInventory: addToInventory,
        updatePlayer: updatePlayer

    }

    function getPlayer(hash) {
        return store.getState(hash)
    }
    function getPlayerLocation(hash) {
      return getPlayer(hash).current_location

    }
    function addToInventory(hash, item){
      store.add(hash, item)
      console.log('post take:\n',getPlayer(hash))
    }

    function movePlayer(hash, loc) {
      console.log('movin!')
      updatePlayer(hash, {"current_location": loc})
    }

    function createPlayer(hash) {
        return store._initializeUser(hash)
    }

    function updatePlayer(hash, data) {
      console.log('datin!')
      console.log('data',data);
        store.update(hash, data)
    }

}());
