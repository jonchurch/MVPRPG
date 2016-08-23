
const Casual = require('./casual')
const Look = require('./look')
const Commands = require('./commands')

module.exports = {
  casual: new Casual(),
  look: new Look(),
  commands: new Commands()
}
