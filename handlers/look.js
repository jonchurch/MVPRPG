'use strict'

const Promise = require('bluebird')
const logger = require('../utils/logger')
const store = require('../store')
const LocationService = require('../services/LocationService')

class Look {
    constructor() {}
        /**
         * getLookString handles player look input
         * @param  {object} message Message object sent by player, contains input text
         * @param  {object} bot     Messenger API instance for sending and receiving messages
         * @return {object}    Returns message sent to player with current room description and exits
         */
    getLookString(message, bot) {
        store.getState(message.from)
        const viewStr = getRoomDescription(message, bot)
        const keyboard = {
            reply_markup: JSON.stringify({
                    inline_keyboard: [
                        [{
                            text: '🔍Inspect',
                            callback_data: 'LOOK'
                        }],
                        [{
                            text: 'Exit',
                            callback_data: 'EXIT/EXPAND'
                        }]
                    ]
                }) //end JSON.stringify

                // keyboard: [
                //     [{
                //         text: 'Look',
                //         callback_data: '1'
                //     }, {
                //         text: 'Take'
                //     }],
                //     [{
                //         text: 'North'
                //     }, {
                //         text: 'East'
                //     }, {
                //         text: 'South'
                //     }, {
                //         text: 'West'
                //     }]
                // ],
                // resize_keyboard: true,
                // })
        }
        console.log(keyboard);
        bot.sendMessage(message.from, viewStr, keyboard).then(function(result) {
        console.log('RESULTS:\n',result);
        })

        function getRoomDescription(message) {
            // room = LocationService
            const str = LocationService.getRoomDescription(message.from)
            const exits = LocationService.getRoomExitsView(message.from)
            return str + exits
        }
    }
}



module.exports = Look
