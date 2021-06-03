const {alias, aliasJest} = require('react-app-rewire-alias')


const aliasMap = {
  example: 'graduation/src/main/js'
}

module.exports = alias(aliasMap)
module.exports.jest = aliasJest(aliasMap)