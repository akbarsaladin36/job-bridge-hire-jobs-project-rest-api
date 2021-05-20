const helper = require('../../helpers')
const workerModel = require('./worker_model')
const redis = require('redis')
const client = redis.createClient()
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')

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
        e.skill = await workerModel.getAttributeWorker('skill', e.id_worker)
        delete e.password_worker
      }

      client.setex(
        `getworker:${JSON.stringify(req.query)}`,
        3600,
        JSON.stringify({ result, pageInfo })
      )

      return helper.response(res, 200, 'Succes get data !', result, pageInfo)
    } catch (error) {
      // console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  },

  getWorkerById: async (req, res) => {
    try {
      console.log(req.params)
      const { id } = req.params
      const result = await workerModel.getWorkerById(id)
      if (result.length === 0) {
        return helper.response(res, 404, `data by id ${id} not found !`, null)
      }
      // console.log(result[0])
      delete result[0].password_worker
      result[0].skill = await workerModel.getAttributeWorker('skill', id)
      result[0].experience = await workerModel.getAttributeWorker(
        'experience',
        id
      )
      result[0].portofolio = await workerModel.getAttributeWorker(
        'portofolio',
        id
      )

      client.setex(`getworker:${id}`, 3600, JSON.stringify(result))

      return helper.response(res, 200, 'Succes get data !', result)
    } catch (error) {
      // console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  },

  updateWorkerBiodata: async (req, res) => {
    try {
      const { id } = req.params

      const checkWorker = await workerModel.getWorkerById(id)
      if (checkWorker.length === 0) {
        return helper.response(
          res,
          404,
          `cannot update, data by id ${id} not found !`,
          null
        )
      }

      const setData = {}
      for (const [key, value] of Object.entries(req.body)) {
        setData[helper.convertToSnakeCase(key)] = value
      }
      setData.image_worker = req.file
        ? req.file.filename
        : checkWorker[0].image_worker
      setData.worker_updated_at = new Date(Date.now())
      // console.log(setData)

      if (req.file) {
        console.log('ada file')
        if (checkWorker[0].image_worker.length > 0) {
          console.log(`Delete Image${checkWorker[0].image_worker}`)
          const imgLoc = `src/uploads/${checkWorker[0].image_worker}`
          helper.deleteImage(imgLoc)
        } else {
          console.log('NO img in DB')
        }
      }

      const result = await workerModel.updateWorker(setData, id)
      return helper.response(res, 200, 'Succes update data !', result)
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  },

  updateWorkerSkills: async (req, res) => {
    try {
      const { id } = req.params
      const { skills } = req.body

      const checkWorker = await workerModel.getWorkerById(id)
      if (checkWorker.length === 0) {
        return helper.response(
          res,
          404,
          `cannot update, data by id ${id} not found !`,
          null
        )
      }

      await workerModel.deleteSkillWorker(id)

      for (const e of skills) {
        await workerModel.addAttributeWorker('skill', {
          id_worker: id,
          name_skill: e
        })
      }

      const result = await workerModel.updateWorker(
        { number_of_skills_worker: skills.length },
        id
      )
      console.log(result)
      return helper.response(res, 200, 'Succes update data !', result)
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  },

  postWorkerExperience: async (req, res) => {
    try {
      const { id } = req.params

      const checkWorker = await workerModel.getWorkerById(id)
      if (checkWorker.length === 0) {
        return helper.response(
          res,
          404,
          `cannot update, data by id ${id} not found !`,
          null
        )
      }

      const setData = {}
      setData.id_worker = id
      for (const [key, value] of Object.entries(req.body)) {
        setData[helper.convertToSnakeCase(key)] = value
      }
      // console.log(setData)

      const result = await workerModel.addAttributeWorker('experience', setData)
      return helper.response(res, 200, 'Succes create data !', result)
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  },

  postWorkerPortofolio: async (req, res) => {
    try {
      const { id } = req.params

      const checkWorker = await workerModel.getWorkerById(id)
      if (checkWorker.length === 0) {
        return helper.response(
          res,
          404,
          `cannot update, data by id ${id} not found !`,
          null
        )
      }

      const setData = {}
      setData.id_worker = id
      for (const [key, value] of Object.entries(req.body)) {
        setData[helper.convertToSnakeCase(key)] = value
      }
      setData.image_portofolio = req.file ? req.file.filename : ''
      // console.log(setData)

      const result = await workerModel.addAttributeWorker('portofolio', setData)
      return helper.response(res, 200, 'Succes create data !', result)
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  },

  passChangeRequest: async (req, res) => {
    try {
      const { email } = req.body
      const isExist = await workerModel.getWorkerByEmail(email)

      if (isExist.length === 0) {
        console.log(email)
        return helper.response(res, 404, 'Email not recognized', null)
      } else {
        const token = Math.ceil(Math.random() * 9001) + 998

        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.email,
            pass: process.env.emailPass
          }
        })

        const mailOptions = {
          from: process.env.email,
          to: isExist[0].email_worker,
          subject: 'Your forget password token',
          html: `
          <h1>Your reset password token</h1>
          <p>Use '${token}' to reset your password.</p>
          <p>Token will automatically expired in 5 minutes.</p>
          `
        }

        transporter.sendMail(mailOptions, (err, info) => {
          if (err) throw err
          console.log('email sent: ' + info.response)
        })

        const id = isExist[0].id_worker
        const setData = {
          worker_updated_at: new Date(Date.now()),
          reset_token: token
        }

        const result = await workerModel.updateWorker(setData, id)
        return helper.response(res, 200, 'OTP sent', result)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad request', Error)
    }
  },

  changePassword: async (req, res) => {
    try {
      const { email, newPassword } = req.body
      let { otp } = req.body
      otp = +otp
      const salt = bcrypt.genSaltSync(10)
      const encryptedPassword = bcrypt.hashSync(newPassword, salt)
      const isExist = await workerModel.getWorkerByEmail(email)

      if (isExist.length === 0) {
        return helper.response(res, 404, 'Email not recognized', null)
      } else {
        const isExpired = new Date(Date.now()) - isExist[0].worker_updated_at
        if (otp !== isExist[0].reset_token || isExpired > 300000) {
          console.log(isExist)
          return helper.response(res, 300, 'Otp mismatch or has been expired', null)
        } else {
          const id = isExist[0].id_worker
          const setData = {
            password_worker: encryptedPassword,
            worker_updated_at: new Date(Date.now())
          }
          const result = await workerModel.updateWorker(setData, id)
          return helper.response(res, 200, 'Password changed', result)
        }
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad request', Error)
    }
  }

}
