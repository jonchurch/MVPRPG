'use strict'

class Message {
    constructor(msg) {
        this.from = msg.from
        this.text = msg.text
        this.user = msg.user
        this.data = msg.data
        this.chat_id = msg.chat_id
        this.parentMessage = msg.parentMessage

    }

    static mapTextMessage(msg) {
        return {
            from: msg.from.id,
            text: msg.text,
            user: {
                firstName: msg.from.first_name,
                lastName: msg.from.last_name
            },
            chat_id: msg.chat.id
        }
    }
    static mapCallbackMessage(msg) {
      console.log('RAWW MESSAGE:\n',msg);
        return {
            from: msg.from.id,
            data: msg.data,
            user: {
                firstName: msg.from.first_name,
                lastName: msg.from.last_name
            },
            chat_id: msg.message.chat.id,
            parentMessage: {
              message_id: msg.message.message_id,
              from: msg.message.from.id

            }
        }
    }
}

module.exports = Message
