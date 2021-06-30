const express = require('express')
const Route = express.Router()
const recruiterController = require('./recruiter_controller')
const uploadFile = require('../../middleware/uploads')
const authMiddleware = require('../../middleware/auth')
const redisMiddleware = require('../../middleware/redis')

Route.get('/hello', (req, res) => {
  res.send('Hello world')
})

Route.get(
  '/:id',
  redisMiddleware.getRecruiterByIdRedis,
  recruiterController.getRecruiterById
)

Route.patch('/update/:id', uploadFile, recruiterController.updateRecruiter)

Route.delete('/:id', recruiterController.deleteRecruiter)

Route.post('/hire', recruiterController.hireWorker)

Route.patch(
  '/change-password',
  authMiddleware.isCompany,
  redisMiddleware.clearDataWorkerRedis,
  recruiterController.changePasswordRecruiter
)

module.exports = Route
