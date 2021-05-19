const connection = require('../../config/mysql')

module.exports = {
  register: (type, data) => {
    return new Promise((resolve, reject) => {
      connection.query(`INSERT INTO ${type} SET ?`, data, (error, result) => {
        if (!error) {
          const newResult = {
            id: result.insertId,
            ...data
          }
          resolve(newResult)
        } else {
          reject(new Error(error))
        }
      })
    })
  },

  getDataCondition: (type, data) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM ${type} WHERE ?`,
        data,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },

  changeData: (type, setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `UPDATE ${type} SET ? WHERE id_${type} = ?`,
        [setData, id],
        (error, result) => {
          if (!error) {
            const newResult = {
              id: id,
              ...setData
            }
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  }
}
