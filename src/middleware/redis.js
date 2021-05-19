const redis = require('redis')
const client = redis.createClient()
const helper = require('../helpers')

module.exports = {
  getWorkerRedis: (req, res, next) => {
    const { id } = req.params

    if (id) {
      client.get(`getworker:${id}`, (error, result) => {
        if (!error && result != null) {
          console.log('data ada di dalam redis')
          return helper.response(
            res,
            200,
            `Succes Get worker by Id ${id} (Redis)`,
            JSON.parse(result)
          )
        } else {
          console.log('data tidak ada dalam redis')
          next()
        }
      })
    } else {
      client.get(`getworker:${JSON.stringify(req.query)}`, (error, result) => {
        if (!error && result != null) {
          console.log('data ada dalam redis')
          const newResult = JSON.parse(result)
          return helper.response(
            res,
            200,
            'Succes get worker All (redis)',
            newResult.result,
            newResult.pageInfo
          )
        } else {
          console.log('data tidak ada dalam redis')
          next()
        }
      })
    }
  },

  clearDataWorkerRedis: (req, res, next) => {
    client.keys('getworker*', (_error, result) => {
      console.log('isi key dalam redis', result)
      if (result.length > 0) {
        result.forEach((item) => {
          client.del(item)
        })
      }
      next()
    })
  }
}
