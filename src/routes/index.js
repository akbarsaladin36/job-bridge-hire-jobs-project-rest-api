const express = require('express')
const Route = express.Router()
const workerRouter = require('../modules/worker/worker_routes')
const authRouter = require('../modules/auth/auth_routes')

Route.use('/auth', authRouter)
Route.use('/worker', workerRouter)

module.exports = Route
