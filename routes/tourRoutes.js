const express = require('express')
const { protect, restrictTo } = require('../controller/authController')
// const tourController = require('../controller/tourController')
const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlans,
  getToursWithin,
  getDistance,
  uploadTourImages,
  resizeTourImages,
} = require('../controller/tourController')

const reviewRouter = require('../routes/reviewRoutes')

const router = express.Router()

// router.route('/:tourId/reviews').post(protect, restrictTo('user'), createReview)

router.use('/:tourId/reviews', reviewRouter)
// router.param('id', tourController.checkID)

router.route('/top-5-cheap').get(aliasTopTours, getAllTours)

router.route('/tour-stats').get(getTourStats)

router
  .route('/monthly-plan/:year')
  .get(protect, restrictTo('admin', 'lead-guide', 'guide'), getMonthlyPlans)

router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(getToursWithin)
// /tours-within?distance=433&center=40,45&unit=33
// /tours-within?distance/433/center/40,45/unit/33

router.route('/distance/:latlng/unit/:unit').get(getDistance)
router
  .route('/')
  .get(getAllTours)
  .post(protect, restrictTo('admin', 'lead-guide'), createTour)

router
  .route('/:id')
  .get(getTour)
  .patch(
    protect,
    restrictTo('admin', 'lead-guide'),
    uploadTourImages,
    resizeTourImages,
    updateTour
  )
  .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour)

module.exports = router
