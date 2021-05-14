const express = require('express')
const Route = express.Router()
const workerController = require('./worker_controller')
// const authMiddleware = require('../../middleware/auth')
// const uploadFile = require('../../middleware/uploads')
// const redisMiddleware = require('../../middleware/redis')

Route.get('/', workerController.getWorker)

module.exports = Route
