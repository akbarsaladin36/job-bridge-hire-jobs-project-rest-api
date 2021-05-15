const express = require('express')
const Route = express.Router()
const workerController = require('./worker_controller')
const authMiddleware = require('../../middleware/auth')
const uploadFile = require('../../middleware/uploads')
// const redisMiddleware = require('../../middleware/redis')

Route.get('/', workerController.getWorker)
Route.get('/:id', workerController.getWorkerById)
Route.patch(
  '/biodata/:id',
  authMiddleware.isWorker,
  uploadFile,
  workerController.updateWorkerBiodata
)
Route.patch(
  '/skills/:id',
  authMiddleware.isWorker,
  workerController.updateWorkerSkills
)
Route.post(
  '/portofolio/:id',
  authMiddleware.isWorker,
  uploadFile,
  workerController.postWorkerPortofolio
)
Route.post(
  '/experience/:id',
  authMiddleware.isWorker,
  workerController.postWorkerExperience
)

module.exports = Route
