const express = require('express')
const Route = express.Router()
const recruiterController = require('./recruiter_controller')
const uploadFile = require('../../middleware/uploads')
const redisMiddleware = require('../../middleware/redis')

Route.get('/hello', (req, res) => {
  res.send('Hello world')
})

Route.get('/:id',
  redisMiddleware.getRecruiterByIdRedis,
  recruiterController.getRecruiterById)

Route.patch('/update/:id',
  uploadFile,
  recruiterController.updateRecruiter)

Route.delete('/:id',
  recruiterController.deleteRecruiter)

Route.patch('/request',
  recruiterController.passChangeRequest)

Route.patch('/change-password',
  recruiterController.changePassword)

module.exports = Route
