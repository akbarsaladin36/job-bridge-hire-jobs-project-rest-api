const express = require('express')
const Route = express.Router()
const premiereController = require('./premiere_controller')

Route.get('/hello', premiereController.sayHello)
Route.get('/location', premiereController.getAllLocation)
Route.get('/location/:id', premiereController.getLocationById)

Route.get('/', premiereController.getAllPremiere)
Route.get('/:id', premiereController.getPremiereById)

Route.post('/location', premiereController.postLocation)
Route.post('/', premiereController.postPremiere)

Route.patch('/location/:id', premiereController.updateLocation)
Route.patch('/:id', premiereController.updatePremiere)

Route.delete('/location/:id', premiereController.deletedLocation)
Route.delete('/:id', premiereController.deletedPremiere)

module.exports = Route
