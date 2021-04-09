const express = require('express')
const Route = express.Router()
const movieRouter = require('../modules/movie/movie_routes')

// Route.get('/hello', function (req, res) {
//   res.status(404).send('Hello World')
// })

Route.use('/movie', movieRouter)

module.exports = Route
