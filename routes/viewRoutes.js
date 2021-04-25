const express = require('express')
const { protect, isLoggedIn } = require('../controller/authController')
const { createBookingCheckout } = require('../controller/bookingController')
const {
  getOverview,
  getTour,
  getLoginForm,
  getAccount,
  updateUserData,
  getSignup,
  getMyTours,
} = require('../controller/viewsController')

const router = express.Router()

router.get('/', createBookingCheckout, isLoggedIn, getOverview)

router.get('/signup', isLoggedIn, getSignup)

router.get('/tour/:slug', isLoggedIn, getTour)

router.get('/login', isLoggedIn, getLoginForm)

router.get('/me', protect, getAccount)
router.get('/my-tours', protect, getMyTours)

router.post('/submit-user-data', protect, updateUserData)

module.exports = router
