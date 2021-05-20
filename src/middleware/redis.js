const redis = require('redis')
const client = redis.createClient()
const helper = require('../helpers')

module.exports = {
  getRecruiterByIdRedis: (req, res, next) => {
    const { id } = req.params
    client.get(`getrecruiter:${id}`, (error, result) => {
      if (!error && result !== null) {
        console.log('Data ada di dalam redis')
        return helper.response(
          res,
          200,
          'Success:get data by id',
          JSON.parse(result))
      } else {
        console.log('Data tidak ada di dalam redis')
        next()
      }
    })
  }
}
