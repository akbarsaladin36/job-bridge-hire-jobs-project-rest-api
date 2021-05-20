const express = require('express')
const Route = express.Router()
const workerRouter = require('../modules/worker/worker_routes')
<<<<<<< HEAD
const recruiterRouter = require('../modules/recruiter/recruiter_route')
=======
const authRouter = require('../modules/auth/auth_routes')
>>>>>>> 0c69e8d00043a35293507d4a6c0764e8884768fa

Route.use('/auth', authRouter)
Route.use('/worker', workerRouter)
Route.use('/recruiter', recruiterRouter)

module.exports = Route
