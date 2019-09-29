//
//
const passport = require('passport')
//
const path = require('path')
const moduleLogger = require('../utils/logger')
const MODULE = path.basename(__filename)
const logger = moduleLogger.moduleLogger(MODULE)
//
function authenticate(options) {
    let response = {
        check: true,
        hdrs: {},
        code: 200,
        resp: {},
        msg: {}
    }
    //
    logger.info('%s - API token is authentic.', options.requestId)
    return response
}
//
async function authorize(options) {
    let response = {
        check: true,
        hdrs: {},
        code: 200,
        resp: {},
        msg: {}
    }
    //
    logger.info('%s - API token is authorised.', options.requestId)
    return Promise.resolve(response)
}
//
module.exports = { authenticate, authorize }