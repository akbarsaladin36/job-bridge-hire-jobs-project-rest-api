const connection = require('../../config/mysql')

module.exports = {
  getDataAllByName: (limit, offset, keywords, type) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM premiere_location WHERE premiere_name LIKE ? ORDER BY premiere_name ' +
          type +
          ' LIMIT ? OFFSET ?',
        [keywords, limit, offset],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getDataAllByLoc: (limit, offset, type) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM premiere_location ORDER BY location ' +
          type +
          ' LIMIT ? OFFSET ?',
        [limit, offset],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getDataCount: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT COUNT(*) AS total FROM premiere_location',
        (error, result) => {
          // console.log(result) isi array dalamnya objek
          !error ? resolve(result[0].total) : reject(new Error(error))
        }
      )
    })
  },
  getDataById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM premiere_location WHERE premiere_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
          // console.log(result)
        }
      )
    })
  },
  createData: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO premiere_location SET ?',
        setData,
        (error, result) => {
          !error
            ? resolve({ id: result.insertId, ...setData })
            : reject(new Error(error))
        }
      )
    })
  },
  updateData: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE premiere_location SET ? WHERE premiere_id = ?',
        [setData, id],
        (error, result) => {
          !error ? resolve({ id: id, ...setData }) : reject(new Error(error))
        }
      )
    })
  },
  deleteData: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'DELETE FROM premiere_location WHERE premiere_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
