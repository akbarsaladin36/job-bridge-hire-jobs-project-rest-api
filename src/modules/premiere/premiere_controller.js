const helper = require('../../helpers/wrapper')
const premiereModel = require('./premiere_model')

module.exports = {
  sayHello: (req, res) => {
    res.status(200).send('Hello Premiere')
  },
  getAllPremiere: async (req, res) => {
    try {
      // console.log(req.query)
      let { page, limit, sortBy, keywords, type } = req.query
      type = type.toUpperCase()

      page = parseInt(page)
      limit = parseInt(limit)
      const totalData = await premiereModel.getDataCount()
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

      if (sortBy === 'name') {
        if (!keywords) {
          return helper.response(res, 400, 'Keywords Undefined', null)
        }
        keywords = '%' + keywords + '%'
        const result = await premiereModel.getDataAllByName(
          limit,
          offset,
          keywords,
          type
        )
        return helper.response(
          res,
          200,
          'Succes Get Data By Name',
          result,
          pageInfo
        )
      } else if (sortBy === 'location') {
        console.log('BY LOC')
        const result = await premiereModel.getDataAllByLoc(limit, offset, type)
        return helper.response(
          res,
          200,
          'Succes Get Data By Location',
          result,
          pageInfo
        )
      } else {
        return helper.response(res, 400, 'Sort By Undefined', null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getPremiereById: async (req, res) => {
    try {
      // console.log(req.params)
      const { id } = req.params
      const result = await premiereModel.getDataById(id)
      // console.log(result) array ini

      if (result.length > 0) {
        return helper.response(res, 200, `Succes Get Data by Id ${id}`, result)
      } else {
        return helper.response(res, 404, `Data by Id ${id} not Found !`, null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  postPremiere: async (req, res) => {
    try {
      // console.log(req.body)
      const { premiereName, premiereLocation } = req.body
      const setData = {
        premiere_name: premiereName,
        location: premiereLocation
      }
      // console.log(setData)
      const result = await premiereModel.createData(setData)
      return helper.response(res, 200, 'Succes Create Data', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  updatePremiere: async (req, res) => {
    try {
      const { id } = req.params
      let result = await premiereModel.getDataById(id)

      if (result.length > 0) {
        const { premiereName, premiereLocation } = req.body
        const setData = {
          premiere_name: premiereName,
          location: premiereLocation
        }
        result = await premiereModel.updateData(setData, id)
        return helper.response(res, 200, 'Succes Update Premiere', result)
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
  deletedPremiere: async (req, res) => {
    try {
      const { id } = req.params
      let result = await premiereModel.getDataById(id)

      if (result.length > 0) {
        result = await premiereModel.deleteData(id)
        return helper.response(
          res,
          200,
          `Succes Delete Premiere With ID ${id}`,
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
