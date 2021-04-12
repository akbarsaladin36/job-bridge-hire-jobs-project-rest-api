const express = require('express')
const Route = express.Router()
const scheduleController = require('./schedule_controller')

Route.get('/hello', scheduleController.sayHello)
Route.get('/:id', scheduleController.getAllMovieSchedule)
Route.post('/', scheduleController.postSchedule)
Route.patch('/:id', scheduleController.updateSchedule)
Route.delete('/:id', scheduleController.deletedSchedule)

module.exports = Route
