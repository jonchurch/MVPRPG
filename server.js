'use strict'

const Messenger = require('./lib/messenger')
const messenger = new Messenger()
// const express = require('express')

messenger.listen()
  .then(() => {
    console.log('🤖  Listening to incoming messages')
  })
