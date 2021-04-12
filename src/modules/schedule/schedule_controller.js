const helper = require('../../helpers/wrapper')
const scheduleModel = require('./schedule_model')

module.exports = {
  sayHello: (req, res) => {
    res.status(200).send('Hello Schedule')
  },
  getAllMovieSchedule: async (req, res) => {
    try {
      // console.log(req.query)
      const { id } = req.params
      let { page, limit, type } = req.query
      type = type.toUpperCase()

      page = parseInt(page)
      limit = parseInt(limit)
      const totalData = await scheduleModel.getDataCount()
      console.log('Total Data ' + totalData)
      const totalPage = Math.ceil(totalData / limit)
      console.log('Total Page ' + totalPage)
      const offset = page * limit - limit
      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData
      }
      console.log(pageInfo)
      const result = await scheduleModel.getDataAllByMovieId(
        id,
        limit,
        offset,
        type
      )
      if (result.length > 0) {
        return helper.response(
          res,
          200,
          `Succes Get Schedule By Movie Id = ${id}`,
          result,
          pageInfo
        )
      } else {
        return helper.response(
          res,
          404,
          `Schedule By Movie Id = ${id} Not Found`,
          null
        )
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  postSchedule: async (req, res) => {
    try {
      // console.log(req.body)
      const { movieId, premiereId, date, capacity, price } = req.body
      const setData = {
        movie_id: movieId,
        premiere_id: premiereId,
        date: date,
        capacity: capacity,
        price: price
      }
      // console.log(setData)
      const result = await scheduleModel.createData(setData)
      return helper.response(res, 200, 'Succes Create Data', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  updateSchedule: async (req, res) => {
    try {
      const { id } = req.params
      let result = await scheduleModel.getDataById(id)

      if (result.length > 0) {
        const { movieId, premiereId, date, capacity, price } = req.body
        const setData = {
          movie_id: movieId,
          premiere_id: premiereId,
          date: date,
          capacity: capacity,
          price: price
        }
        result = await scheduleModel.updateData(setData, id)
        return helper.response(res, 200, 'Succes Update Schedule', result)
      } else {
        return helper.response(
          res,
          404,
          `Cannnot Update !. Data by Id ${id} not Found !`,
          null
        )
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  deletedSchedule: async (req, res) => {
    try {
      const { id } = req.params
      let result = await scheduleModel.getDataById(id)

      if (result.length > 0) {
        result = await scheduleModel.deleteData(id)
        return helper.response(
          res,
          200,
          `Succes Delete Schedule With ID ${id}`,
          result
        )
      } else {
        return helper.response(
          res,
          404,
          `Cannot Delete !.s Data by Id ${id} not Found !`,
          null
        )
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
