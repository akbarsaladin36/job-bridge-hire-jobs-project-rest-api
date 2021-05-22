const express = require('express')
const Route = express.Router()
const recruiterController = require('./recruiter_controller')

Route.post('/hire', recruiterController.hireWorker)

module.exports = Route
