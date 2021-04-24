const connection = require('../../config/mysql')

module.exports = {
  getDataAll: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT p.premiere_name, p.premiere_price, m.movie_name, m.movie_category, m.movie_release_date, l.location_city, l.location_addres FROM premiere p JOIN movie m ON p.movie_id = m.movie_id JOIN location l ON p.location_id = l.location_id',
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getDataAllbyMovieLocdate: (id, loc, date) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT p.premiere_id, s.show_time_id, p.premiere_name, p.premiere_price, s.show_time_clock, s.show_time_date, l.location_city, l.location_addres FROM premiere p JOIN location l ON p.location_id = l.location_id JOIN show_time s ON p.premiere_id = s.premiere_id WHERE p.movie_id = ? AND l.location_city LIKE ? AND s.show_time_date LIKE ? ORDER BY p.premiere_name ASC',
        [id, loc, date],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getDataById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM premiere WHERE premiere_id = ?',
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
        'INSERT INTO premiere SET ?',
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
        'UPDATE premiere SET ? WHERE premiere_id = ?',
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
        'DELETE FROM premiere WHERE premiere_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
