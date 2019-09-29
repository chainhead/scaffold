const process = require('process')
//
//
const path = require('path')
const moduleLogger = require('./logger')
const MODULE = path.basename(__filename)
const logger = moduleLogger.moduleLogger(MODULE)
//
//
function validateArgs() {
    let argcheck = true
    let options = {}
    if (process.env.APP_CONFIG) {
        try {
            let j = JSON.parse(process.env.APP_CONFIG)
            if (j.server) {
                // TODO : Detailed checks for server configuration
                options.server = j.server
            } else {
                argcheck = false
                logger.error('Server configuration not found.')
            }
            //
            if (j.cache) {
                // TODO : Detailed checks for cache configuration
                options.cache = j.cache
            } else {
                argcheck = false
                logger.error('Cache configuration not found.')
            }
            //
            if (j.auth) {
                // TODO : Detailed checks for LDAP configuration
                options.auth = j.auth
            } else {
                argcheck = false
                logger.error('LDAP configuration not found.')
            }
        } catch (e) {
            argcheck = false
            logger.error('Invalid configuration for Registry Server.')
        }
    } else {
        argcheck = false
        logger.error('Configuration for Registry Server not received.')
    }
    return {
        options: options,
        argcheck: argcheck
    }
}
//
module.exports = { validateArgs }