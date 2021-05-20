const express = require('express')
const Route = express.Router()
const workerRouter = require('../modules/worker/worker_routes')
const recruiterRouter = require('../modules/recruiter/recruiter_route')
const authRouter = require('../modules/auth/auth_routes')

Route.use('/auth', authRouter)
Route.use('/worker', workerRouter)
Route.use('/recruiter', recruiterRouter)

module.exports = Route
