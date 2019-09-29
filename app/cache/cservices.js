//
const path = require('path')
const moduleLogger = require('../utils/logger')
const MODULE = path.basename(__filename)
const logger = moduleLogger.moduleLogger(MODULE)
//
async function updateService(options) {
    return new Promise(async (resolve, reject) => {
        let hdrs = {}
        let code = 200
        let resp = {}
        let msg = []
        let apiResponse = {}
        //
        let key = options.serviceName
        let val = JSON.stringify(options.serviceObject)
        let requestId = options.requestId
        let client = options.cacheClient
        let serviceUpdated = true
        //
        await client.set(key, val, (err, res) => {
            if (err) {
                serviceUpdated = false
                logger.error('%s - Service update failed. %s', requestId, key)
                msg.push('Service update failed. ' + key)
                code = 500
            } else {
                serviceUpdated = true
                logger.info('%s - Service updated. %s', requestId, key)
                msg.push('Service updated. ' + key)
                code = 200
            }
            //
            apiResponse = {
                check: serviceUpdated,
                hdrs: hdrs,
                code: code,
                resp: resp,
                msg: msg
            }
            resolve(apiResponse)
        })
    })
}
//
async function deleteService(options) {
    return new Promise(async (resolve, reject) => {
        let hdrs = {}
        let code = 200
        let resp = {}
        let msg = []
        let apiResponse = {}
        //
        let serviceFound = true
        let client = options.cacheClient
        await client.del(options.serviceName, (err, res) => {
            if (err) {
                logger.error('%s - Service name could not be deleted. %s', options.requestId, options.serviceName)
                serviceFound = false
                code = 500
                msg.push("Service name could not be deleted. " + options.serviceName)
            } else {
                if (res === 1) {
                    logger.info('%s - Service name deleted. %s', options.requestId, options.serviceName)
                    serviceFound = true
                    code = 200
                    msg.push("Service name deleted. " + options.serviceName)
                } else if (res === 0) {
                    logger.error('%s - Service name not found for deleting. %s', options.requestId, options.serviceName)
                    serviceFound = false
                    code = 400
                    msg.push("Service name not found for deleting. " + options.serviceName)
                } else {
                    logger.error('%s - Unknown error while deleting. %s', options.requestId, options.serviceName)
                    serviceFound = false
                    code = 500
                    msg.push("Unknown error while deleting. " + options.serviceName)
                }
            }
            //
            apiResponse = {
                check: serviceFound,
                hdrs: hdrs,
                code: code,
                resp: resp,
                msg: msg
            }
            resolve(apiResponse)
        })
    })
}
//
async function getService(options) {
    return new Promise(async (resolve, reject) => {
        let hdrs = {}
        let code = 200
        let resp = {}
        let msg = []
        let apiResponse = {}
        //
        let serviceFound = true
        let client = options.cacheClient
        await client.get(options.serviceName, (err, reply) => {
            if (err) {
                logger.error('%s - Service name look-up failed. %s', options.requestId, options.serviceName)
                serviceFound = false
                code = 500
                msg.push("Service name look-up failed. " + options.serviceName)
            } else {
                if (reply) {
                    logger.info('%s - Service name exists. %s', options.requestId, options.serviceName)
                    serviceFound = true
                    code = 200
                    resp = JSON.parse(reply)
                    msg.push("Service name exists. " + options.serviceName)
                } else {
                    logger.info('%s - Service name not found. %s', options.requestId, options.serviceName)
                    serviceFound = false
                    code = 400
                }
            }
            //
            apiResponse = {
                check: serviceFound,
                hdrs: hdrs,
                code: code,
                resp: resp,
                msg: msg
            }
            resolve(apiResponse)
        })
    })
}
//
async function addService(options) {
    return new Promise(async (resolve, reject) => {
        let hdrs = {}
        let code = 200
        let resp = {}
        let msg = []
        let apiResponse = {}
        //
        let key = options.serviceName
        let val = JSON.stringify(options.serviceObject)
        let requestId = options.requestId
        let client = options.cacheClient
        let serviceAdded = true
        //
        await client.set(key, val, (err, res) => {
            if (err) {
                serviceAdded = false
                logger.error('%s - Service addition failed. %s', requestId, key)
                msg.push('Service addition failed. ' + key)
                code = 500
            } else {
                serviceAdded = true
                logger.info('%s - Service added. %s', requestId, key)
                msg.push('Service added. ' + key)
                code = 200
            }
            //
            apiResponse = {
                check: serviceAdded,
                hdrs: hdrs,
                code: code,
                resp: resp,
                msg: msg
            }
            resolve(apiResponse)
        })
    })
}
//
async function lookUpService(options) {
    return new Promise(async (resolve, reject) => {
        let hdrs = {}
        let code = 200
        let resp = {}
        let msg = []
        let apiResponse = {}
        //
        let serviceFound = true
        let client = options.cacheClient
        await client.get(options.serviceName, (err, reply) => {
            if (err) {
                logger.error('%s - Service name look-up failed. %s', options.requestId, options.serviceName)
                serviceFound = false
                code = 500
                msg.push("Service name look-up failed. " + options.serviceName)
            } else {
                if (reply) {
                    logger.info('%s - Service name exists. %s', options.requestId, options.serviceName)
                    serviceFound = true
                    code = 400
                    msg.push("Service name exists. " + options.serviceName)
                } else {
                    logger.info('%s - Service name does not exist. %s', options.requestId, options.serviceName)
                    serviceFound = false
                    code = 200
                    msg.push("Service does not name exists. " + options.serviceName)
                }
            }
            //
            apiResponse = {
                check: serviceFound,
                hdrs: hdrs,
                code: code,
                resp: resp,
                msg: msg
            }
            resolve(apiResponse)
        })
    })
}
//
module.exports = { lookUpService, addService, getService, updateService, deleteService }