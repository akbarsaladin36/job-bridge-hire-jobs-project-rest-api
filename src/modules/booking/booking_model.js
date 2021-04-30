const connection = require('../../config/mysql')

module.exports = {
  getData: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT b.booking_id, b.premiere_id, b.booking_ticket, b.booking_total_price, b.booking_payment_method, b.booking_status, bs.booking_seat_location FROM booking b INNER JOIN booking_seat bs ON b.booking_id = bs.booking_id',
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },

  getBookingTotalPrice: (movieId, premiereId) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT m.movie_id, p.premiere_id, b.booking_total_price, b.booking_created_at FROM booking b JOIN premiere p ON b.premiere_id = p.premiere_id JOIN movie m ON p.movie_id = m.movie_id WHERE m.movie_id = ? AND p.premiere_id = ?',
        [movieId, premiereId],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },

  getDataById: (preId, showId) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT b.booking_id, b.premiere_id, b.show_time_id, bs.booking_seat_location FROM booking b JOIN booking_seat bs ON b.booking_id = bs.booking_id WHERE b.premiere_id = ? AND b.show_time_id = ? AND b.booking_status = ?',
        [preId, showId, 'succes'],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },

  createData: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO booking SET ?',
        setData,
        (error, result) => {
          !error
            ? resolve({ id: result.insertId, ...setData })
            : reject(new Error(error))
        }
      )
    })
  }
}
