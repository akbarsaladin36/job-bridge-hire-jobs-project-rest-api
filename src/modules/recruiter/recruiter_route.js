const express = require('express')
const Route = express.Router()
const uploadFile = require('../../middleware/uploads')
const redisMiddleware = require('../../middleware/redis')
const recruiterController = require('./recruiter_controller')

Route.get(
  '/:id',
  redisMiddleware.getCompanyRedis,
  recruiterController.getDataById
)
Route.patch('/:id', uploadFile, recruiterController.updateRecruiter)
Route.post('/hire', recruiterController.hireWorker)

module.exports = Route
