const helper = require('../../helpers')
const workerModel = require('./worker_model')
// const redis = require('redis')
// const client = redis.createClient()

module.exports = {
  getWorker: async (req, res) => {
    try {
      // console.log(req.query)
      let { sortBy, search, page, limit } = req.query
      sortBy = sortBy || ''
      search = search || '%%'
      limit = limit || '6'
      page = page || '1'

      page = parseInt(page)
      limit = parseInt(limit)
      const offset = page * limit - limit

      let totalData = await workerModel.getDataCount(search)
      totalData = totalData.length
      const totalPage = Math.ceil(totalData / limit)
      console.log('Total Page ' + totalPage)

      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData
      }

      const result = await workerModel.getWorker(sortBy, search, limit, offset)
      for (const e of result) {
        e.skill = await workerModel.getSkillWorker(e.id_worker)
      }

      return helper.response(res, 200, 'Succes get data !', result, pageInfo)
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
