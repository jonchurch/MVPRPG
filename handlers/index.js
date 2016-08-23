
const Casual = require('./casual')
const Look = require('./look')
const Commands = require('./commands')
const Take = require('./take')

module.exports = {
  casual: new Casual(),
  look: new Look(),
  commands: new Commands(),
  take: new Take()
}
