//
//
const redis = require('redis')
//
const path = require('path')
const moduleLogger = require('../utils/logger')
const MODULE = path.basename(__filename)
const logger = moduleLogger.moduleLogger(MODULE)
//
async function clientOperations(options) {
    let connObject = {}
    let redisClient = redis.createClient(options)
    return new Promise((resolve, reject) => {
        redisClient.on('error', (err) => {
            logger.error('Redis client connection error. %s', err)
            connObject = {
                cacheClient: {},
                connected: false
            }
            reject(connObject)
        })
        //
        redisClient.on('connect', () => {
            logger.info('Redis client is connected.')
            connObject = {
                cacheClient: redisClient,
                connected: true
            }
            resolve(connObject)
        })
        //
        redisClient.on('ready', () => {
            logger.info('Redis client is ready.')
            connObject = {
                cacheClient: redisClient,
                connected: true
            }
            resolve(connObject)
        })
        //
        redisClient.on('reconnecting', (err) => {
            logger.error('Redis client reconnecting. %s', err)
            connObject = {
                cacheClient: {},
                connected: false
            }
            reject(connObject)
        })
        //
        redisClient.on('end', (err) => {
            logger.error('Redis client ended. %s', err)
            connObject = {
                cacheClient: {},
                connected: false
            }
            reject(connObject)
        })
    })
}
//
async function connect(options) {
    let p = await clientOperations(options)
    return p
}
//
module.exports = { connect }