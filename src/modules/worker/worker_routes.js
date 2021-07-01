const express = require('express')
const Route = express.Router()
const workerController = require('./worker_controller')
const authMiddleware = require('../../middleware/auth')
const uploadFile = require('../../middleware/uploads')
const redisMiddleware = require('../../middleware/redis')

Route.get('/', redisMiddleware.getWorkerRedis, workerController.getWorker)
Route.get(
  '/:id',
  redisMiddleware.getWorkerRedis,
  workerController.getWorkerById
)
Route.patch(
  '/biodata/:id',
  authMiddleware.authentication,
  authMiddleware.isWorker,
  uploadFile,
  redisMiddleware.clearDataWorkerRedis,
  workerController.updateWorkerBiodata
)
Route.patch(
  '/skills/:id',
  authMiddleware.authentication,
  authMiddleware.isWorker,
  redisMiddleware.clearDataWorkerRedis,
  workerController.updateWorkerSkills
)

Route.post(
  '/portofolio/:id',
  authMiddleware.authentication,
  authMiddleware.isWorker,
  uploadFile,
  redisMiddleware.clearDataWorkerRedis,
  workerController.postWorkerPortofolio
)
Route.patch(
  '/portofolio/:id',
  authMiddleware.authentication,
  authMiddleware.isWorker,
  uploadFile,
  redisMiddleware.clearDataWorkerRedis,
  workerController.updateWorkerPortofolio
)
Route.delete(
  '/portofolio/:id',
  authMiddleware.authentication,
  authMiddleware.isWorker,
  redisMiddleware.clearDataWorkerRedis,
  workerController.deleteWorkerPortofolio
)
Route.post(
  '/experience/:id',
  authMiddleware.authentication,
  authMiddleware.isWorker,
  redisMiddleware.clearDataWorkerRedis,
  workerController.postWorkerExperience
)
Route.patch(
  '/experience/:id',
  authMiddleware.authentication,
  authMiddleware.isWorker,
  redisMiddleware.clearDataWorkerRedis,
  workerController.updateWorkerExperience
)
Route.delete(
  '/experience/:id',
  authMiddleware.authentication,
  authMiddleware.isWorker,
  redisMiddleware.clearDataWorkerRedis,
  workerController.deleteWorkerExperience
)
Route.patch(
  '/change-password',
  authMiddleware.authentication,
  authMiddleware.isWorker,
  redisMiddleware.clearDataWorkerRedis,
  workerController.changePasswordWorker
)

module.exports = Route
