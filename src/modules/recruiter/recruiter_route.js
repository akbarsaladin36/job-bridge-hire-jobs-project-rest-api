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
  recruiterController.getDataById)
Route.post('/',
  uploadFile,
  recruiterController.createRecruiter)
Route.patch('/:id', recruiterController.updateRecruiter)
Route.delete('/:id', recruiterController.deleteRecruiter)
Route.post('/request/', recruiterController.passChangeRequest)
Route.post('/request/changepassword', recruiterController.passChange)

module.exports = Route
