const process = require('process')
//
//
const path = require('path')
const moduleLogger = require('./utils/logger')
const MODULE = path.basename(__filename)
const logger = moduleLogger.moduleLogger(MODULE)
//
const utils = require('./utils/argscheck')
const cache = require('./cache/connect')
const auth = require('./auth/connect')
const app = require('./routes/app')
//
async function run() {
    logger.info('Starting Server.')
    let validation = utils.validateArgs()
    if (validation.argcheck) {
        logger.info('Good configuration received.')
    } else {
        logger.error('Bad configuration received. Exiting.')
        process.exit(8)
    }
    //
    let cacheConnected = await cache.connect(validation.options.cache)
    if (cacheConnected.connected) {
        logger.info('Cache connection successful.')
    } else {
        logger.error('Cache connection failed. Exiting.')
        process.exit(8)
    }
    //
    let authConnected = await auth.connect(validation.options.auth)
    if (authConnected.connected) {
        logger.info('Authorisation and Authentication connection successful.')
    } else {
        logger.error('Authorisation and Authentication server connection failed. Exiting.')
        process.exit(8)
    }
    //
    let connObject = {
        cacheClient: cacheConnected.cacheClient,
        authClient: authConnected.authClient
    }
    let serverLaunched = app.launchServer(validation.options.server, connObject)
    if (serverLaunched) {

    } else {
        logger.error('Server launch failed. Exiting.')
        process.exit(8)
    }
}
//
run()