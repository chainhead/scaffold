//
//
const path = require('path')
const moduleLogger = require('../utils/logger')
const MODULE = path.basename(__filename)
const logger = moduleLogger.moduleLogger(MODULE)
//
//
function headersCheck(req) {
    let resp = {}
    let hdrCheck = true
    let code = 200
    let msg = []
    //
    if (req.get('Content-Length')) {
        resp.hdrCheck = hdrCheck && true
    } else {
        hdrCheck = hdrCheck && false
        code = 400
        logger.error('Header for content length (Content-Length) was not found.')
        msg.push('Header for content length (Content-Length) was not found.')
    }
    //
    if (req.get('X-Request-Id')) {
        resp.hdrCheck = hdrCheck && true
    } else {
        hdrCheck = hdrCheck && false
        code = 400
        logger.error('Header for request Id (X-Request-Id) was not found.')
        msg.push('Header for request Id (X-Request-Id) was not found.')
    }
    //
    if (req.get('X-Api-Token')) {
        hdrCheck = hdrCheck && true
    } else {
        hdrCheck = false
        code = 400
        logger.error('Header for API token (X-Api-Token) was not found.')
        msg.push('Header for API token (X-Api-Token) was not found.')
    }
    //
    resp = {
        check: hdrCheck,
        hdrs: {},
        code: code,
        resp: {},
        msg: msg
    }
    return resp
}
//
function notfound(req) {
    let reqId = req.get('X-Request-Id')
    let resp = {
        hdrs: {},
        code: 404,
        resp: {},
        msg: ["Resource not found " + req.originalUrl]
    }
    logger.error('%s - Resource not found %s', reqId, req.originalUrl)
    return resp
}
//
function contentLengthCheck(body) {
    let resp = {}
    let contentLengthCheck = true
    let code = 200
    let msg = []
    //
    if (Object.keys(body).length === 0) {
        contentLengthCheck = false
        code = 400
        logger.error('%s - Empty payload object received.', req.get('X-Request-Id'))
        msg.push('Empty payload object received.')
    }
    //
    resp = {
        check: contentLengthCheck,
        hdrs: {},
        code: code,
        resp: {},
        msg: msg
    }
    return resp
}
//
function contentCheck(req, err) {
    let resp = {}
    let contentCheck = true
    let code = 200
    let msg = []
    //
    if (err) {
        contentCheck = false
        code = 400
        logger.error('%s - JSON parsing error. %s', req.get('X-Request-Id'), err.message)
        msg.push('JSON parsing error. ' + err.message)
    }
    //    
    resp = {
        check: contentCheck,
        hdrs: {},
        code: code,
        resp: {},
        msg: msg
    }
    return resp
}
//
module.exports = { headersCheck, contentLengthCheck, contentCheck, notfound }