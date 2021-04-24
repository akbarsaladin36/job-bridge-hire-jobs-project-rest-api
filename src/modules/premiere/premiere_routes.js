const express = require('express')
const Route = express.Router()
const premiereController = require('./premiere_controller')

Route.get('/hello', premiereController.sayHello)
Route.get('/location', premiereController.getAllLocation)
Route.get('/location/:id', premiereController.getLocationById)

Route.get('/main', premiereController.getAllPremiere)
Route.get('/main/:id', premiereController.getPremiereById)
Route.get('/premiere-movie/:id', premiereController.getPremiereByMovie)

Route.post('/location', premiereController.postLocation)
Route.post('/main', premiereController.postPremiere)

Route.patch('/location/:id', premiereController.updateLocation)
Route.patch('/main/:id', premiereController.updatePremiere)

Route.delete('/location/:id', premiereController.deletedLocation)
Route.delete('/main/:id', premiereController.deletedPremiere)

module.exports = Route
