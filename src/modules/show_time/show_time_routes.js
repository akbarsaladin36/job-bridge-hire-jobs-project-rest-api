const express = require('express')
const Route = express.Router()
const showTimeController = require('./show_time_controller')

Route.get('/hello', showTimeController.sayHello)
Route.get('/:id', showTimeController.getShowTimeById)
Route.post('/', showTimeController.postShowTime)
Route.patch('/:id', showTimeController.updateShowTime)
Route.delete('/:id', showTimeController.deletedShowTime)

module.exports = Route
