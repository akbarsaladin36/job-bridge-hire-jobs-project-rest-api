const helper = require('../../helpers/wrapper')
const premiereModel = require('./premiere_model')
const locationModel = require('./location_model')

module.exports = {
  sayHello: (req, res) => {
    res.status(200).send('Hello Premiere')
  },
  getPremiereByMovie: async (req, res) => {
    try {
      const { id } = req.params
      let { date, loc } = req.query
      date = date || '%%'
      loc = loc || '%%'
      // console.log(id)
      // console.log(date, '--', loc)
      const result = await premiereModel.getDataAllbyMovieLocdate(id, loc, date)
      return helper.response(res, 200, 'Succes Get Premiere Data', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getAllPremiere: async (req, res) => {
    try {
      const result = await premiereModel.getDataAll()
      return helper.response(res, 200, 'Succes Get Premiere Data', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getAllLocation: async (req, res) => {
    try {
      const result = await locationModel.getDataAll()
      return helper.response(res, 200, 'Succes Get Location Data', result)
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
  getLocationById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await locationModel.getDataById(id)

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
      const { movieId, locationId, premiereName, premierePrice } = req.body
      const setData = {
        movie_id: movieId,
        location_id: locationId,
        premiere_name: premiereName,
        premiere_price: premierePrice
      }
      // console.log(setData)
      const result = await premiereModel.createData(setData)
      return helper.response(res, 200, 'Succes Create Data', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  postLocation: async (req, res) => {
    try {
      const { locationCity, locationAddres } = req.body
      const setData = {
        location_city: locationCity,
        location_addres: locationAddres
      }

      const result = await locationModel.createData(setData)
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
        const { movieId, locationId, premiereName, premierePrice } = req.body
        const setData = {
          movie_id: movieId,
          location_id: locationId,
          premiere_name: premiereName,
          premiere_price: premierePrice,
          premiere_updated_at: new Date(Date.now())
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
  updateLocation: async (req, res) => {
    try {
      const { id } = req.params
      let result = await locationModel.getDataById(id)

      if (result.length > 0) {
        const { locationCity, locationAddres } = req.body
        const setData = {
          location_city: locationCity,
          location_addres: locationAddres,
          location_updated_at: new Date(Date.now())
        }
        result = await locationModel.updateData(setData, id)
        return helper.response(res, 200, 'Succes Update Location', result)
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
  },
  deletedLocation: async (req, res) => {
    try {
      const { id } = req.params
      let result = await locationModel.getDataById(id)

      if (result.length > 0) {
        result = await locationModel.deleteData(id)
        return helper.response(
          res,
          200,
          `Succes Delete Location With ID ${id}`,
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
