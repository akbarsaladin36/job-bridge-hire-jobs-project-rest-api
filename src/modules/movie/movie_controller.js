const helper = require('../../helpers/wrapper')
const movieModel = require('./movie_model')

module.exports = {
  sayHello: (req, res) => {
    res.status(200).send('Hello World')
  },
  getAllMovie: async (req, res) => {
    try {
      console.log('Prosses get all movie work !')
      const result = await movieModel.getDataAll()
      return helper.response(res, 200, 'Succes Get Data', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
