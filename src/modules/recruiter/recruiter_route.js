const express = require('express')
const Route = express.Router()
const recruiterController = require('./recruiter_controller')

Route.get('/hello', (req, res) => {
  res.send('Hello world')
})
Route.get('/:id', recruiterController.getDataById)
Route.post('/', recruiterController.createRecruiter)
Route.post('/hire', recruiterController.hireWorker)
Route.patch('/:id', recruiterController.updateRecruiter)
Route.delete('/:id', recruiterController.deleteRecruiter)
module.exports = Route
