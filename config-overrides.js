const {alias, aliasJest} = require('react-app-rewire-alias')


const aliasMap = {
  example: 'Graduation-Project/src/main/js'
}

module.exports = alias(aliasMap)
module.exports.jest = aliasJest(aliasMap)