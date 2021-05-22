const helper = require('./../../helpers/index')

module.exports = {
  hireWorker: async (req, res) => {
    try {
      // console.log(req.body)
      const { workerEmail, companyName, title, msg } = req.body
      helper.hireViaEmail(title, companyName, msg, workerEmail)
      return helper.response(res, 200, 'email sent', null)
    } catch (error) {
      return helper.response(res, 400, 'Bad request', Error)
    }
  }
}
