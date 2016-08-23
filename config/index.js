require('dotenv').load()
module.exports = {
  local: {
    telegram: {
      TOKEN: process.env.TELEGRAM_TOKEN || ''
    }
  }
}.local
