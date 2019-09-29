//
const path = require('path')
const moduleLogger = require('../utils/logger')
const MODULE = path.basename(__filename)
const logger = moduleLogger.moduleLogger(MODULE)
//
const express = require('express')
const cors = require('cors')
const csrf = require('csrf')
const bp = require('body-parser')
//
const auth = require('../auth/auth')
const mw = require('../mw/mw')
const utils = require('../utils/resp')
const msvc = require('../mw/mservices')
//
let clients
//
function serverSetup() {
    const app = express()
    // Middleware for all requests; implementation in /mw or /auth
    //  CORS
    app.use(cors())
    //  CSRF
    //app.use(csrf())
    //  Headers check
    app.use((req, res, next) => {
        let c = mw.headersCheck(req)
        if (c.check) {
            next()
        } else {
            let respObj = utils.buildResponse(req, c)
            res.set(respObj.hdrs)
            res.status(respObj.status).send(respObj.msg)
        }
    })
    //  API token check
    app.use((req, res, next) => {
        let options = {
            requestId: req.get('X-Request-Id'),
            token: req.get('X-Api-Token'),
            cacheClient: clients.cacheClient
        }
        let c = auth.authenticate(options)
        if (c.check) {
            next()
        } else {
            let respObj = utils.buildResponse(req, c)
            res.set(respObj.hdrs)
            res.status(respObj.status).send(respObj.msg)
        }
    })
    //  Parse payload into JSON
    app.use((req, res, next) => {
        // https://stackoverflow.com/a/53049009/919480
        bp.json()(req, res, err => {
            let c = mw.contentCheck(req, err)
            if (c.check) {
                next()
            } else {
                let respObj = utils.buildResponse(req, c)
                res.set(respObj.hdrs)
                res.status(respObj.status).send(respObj.msg)
            }
        })
    })
    //
    // Add route and verb specific middleware including Express routers. 
    // E.g. app.get('/services', (req, res, next)), etc.
    //
    // 404 - Not found
    app.use((req, res, next) => {
        let r = mw.notfound(req)
        let respObj = utils.buildResponse(req, r)
        res.set(respObj.hdrs)
        res.status(respObj.status).send(respObj.msg)
    })
    return app
}
//
function launchServer(options, connObject) {
    clients = connObject
    let a = serverSetup().listen(options.port, (err, res) => {
        if (err) {
            logger.error('Registry Server did not launch. %s', err)
            return false
        } else {
            logger.info('Registry Server listening at %d', options.port)
            return true
        }
    })
    return a
}
//
module.exports = { launchServer }