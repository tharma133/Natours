const express = require('express')
const { protect, isLoggedIn } = require('../controller/authController')

const {
  getOverview,
  getTour,
  getLoginForm,
  getAccount,
  updateUserData,
  getSignup,
  getMyTours,
  alerts,
} = require('../controller/viewsController')

router.use(alerts)

const router = express.Router()

router.get('/', isLoggedIn, getOverview)

router.get('/signup', isLoggedIn, getSignup)

router.get('/tour/:slug', isLoggedIn, getTour)

router.get('/login', isLoggedIn, getLoginForm)

router.get('/me', protect, getAccount)
router.get('/my-tours', protect, getMyTours)

router.post('/submit-user-data', protect, updateUserData)

module.exports = router
