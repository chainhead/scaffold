//
//

//
const path = require('path')
const moduleLogger = require('../utils/logger')
const MODULE = path.basename(__filename)
const logger = moduleLogger.moduleLogger(MODULE)
//
let connected = true
async function connect(options) {
    let connObject = {
        authClient: {},
        connected: connected
    }
    //
    logger.info('LDAP client is connected.')
    //
    return new Promise((resolve, reject) => {
        resolve (connObject)
    })
}
//
module.exports = { connect }