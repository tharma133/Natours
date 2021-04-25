const express = require('express')
const { protect, restrictTo } = require('../controller/authController')
const {
  getCheckoutSession,
  getAllBookings,
  createBooking,
  getBooking,
  updateBooking,
  deleteBooking,
} = require('../controller/bookingController')

const router = express.Router()
router.use(protect)

router.get('/checkout/:tourId', getCheckoutSession)

router.use(restrictTo('admin', 'lead-guide'))

router.route('/').get(getAllBookings).post(createBooking)
router.route('/:id').get(getBooking).patch(updateBooking).delete(deleteBooking)

module.exports = router
