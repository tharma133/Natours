const express = require('express')

const {
  getAllUsers,
  createUsers,
  getUsers,
  updateUsers,
  deleteUsers,
  updateMe,
  deleteMe,
  getMe,
  uploadPhoto,
  resizeUserPhoto,
} = require('../controller/userController')

const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
  restrictTo,
  logout,
} = require('../controller/authController')

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.get('/logout', logout)

router.post('/forgotPassword', forgotPassword)
router.patch('/resetPassword/:token', resetPassword)

router.use(protect)

router.patch('/updateMyPassword', updatePassword)
router.get('/me', getMe, getUsers)
router.patch('/updateMe', uploadPhoto, resizeUserPhoto, updateMe)
router.delete('/deleteMe', deleteMe)

router.use(restrictTo('admin'))

router.route('/').get(getAllUsers).post(createUsers)
router.route('/:id').get(getUsers).patch(updateUsers).delete(deleteUsers)

module.exports = router
