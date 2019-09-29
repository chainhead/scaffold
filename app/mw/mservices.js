//
//
const path = require('path')
const moduleLogger = require('../utils/logger')
const MODULE = path.basename(__filename)
const logger = moduleLogger.moduleLogger(MODULE)
//
const mw = require('./mw')
const auth = require('../auth/auth')
const rsvc = require('../routes/rservices')
//

module.exports = {}