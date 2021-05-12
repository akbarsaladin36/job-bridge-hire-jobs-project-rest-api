const express = require('express')
const Route = express.Router()
const workerRouter = require('../modules/worker/worker_routes')

Route.use('/worker', workerRouter)

module.exports = Route
