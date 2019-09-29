//
const path = require('path')
const moduleLogger = require('../utils/logger')
const MODULE = path.basename(__filename)
const logger = moduleLogger.moduleLogger(MODULE)
//
function checkServiceObjectForUpdate(servicePayload) {
    let validObject = true
    let hdrs = {}
    let code = 200
    let resp = {}
    let msg = []
    let apiResponse = {}
    //
    if (servicePayload.params.serviceName === servicePayload.body.name) {
        let c0 = checkServiceObject(servicePayload)
        if (c0.check) {

        } else {
            validObject = false
            code = 400
            msg.push(c0.msg)
        }
    } else {
        validObject = false
        code = 400
        logger.error('%s - Service name in the payload %s is not the same as the one to be updated. %s', servicePayload.requestId, servicePayload.body.name, servicePayload.params.serviceName)
        msg.push('Service name in the payload ' + servicePayload.body.name + ' is not same as the one to be updated. ' + servicePayload.params.serviceName)
    }
    //
    apiResponse = {
        check: validObject,
        hdrs: hdrs,
        code: code,
        resp: resp,
        msg: msg
    }
    //
    return apiResponse    
}
//
function checkServiceObject(servicePayload) {
    let validObject = true
    let hdrs = {}
    let code = 200
    let resp = {}
    let msg = []
    let apiResponse = {}
    //
    let serviceObject = servicePayload.body
    let requestId = servicePayload.requestId
    //
    let keysFound = ("name" in serviceObject) &&
        ("sub" in serviceObject) &&
        ("pub" in serviceObject)
    //
    if (keysFound) {
        if (serviceObject['name']) {
            let topics = (serviceObject.sub.length === 0) && (serviceObject.pub.length === 0)
            if (topics) {
                validObject = false
                code = 400
                logger.error("%s - Publication and subscription topics were not provided in service object.", requestId)
                msg.push("Pub and sub topics were not provided in service object.")
            } else {
                validObject = true
            }
        } else {
            validObject = false
            code = 400
            logger.error("%s - Name was not provided in service object.", reqId)
            msg.push("Name was not provided in service object.")
        }
    } else {
        validObject = false
        code = 400
        logger.error("%s - Name/sub/pub was not found in service object.", reqId)
        msg.push("Name/sub/pub was not found in service object.")
    }
    //
    apiResponse = {
        check: validObject,
        hdrs: hdrs,
        code: code,
        resp: resp,
        msg: msg
    }
    //
    return apiResponse
}
//
module.exports = { checkServiceObject, checkServiceObjectForUpdate }