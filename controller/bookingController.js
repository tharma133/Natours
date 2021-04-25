const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const Tour = require('../models/tourModels')
const Booking = require('../models/bookingModel')
const catchAsync = require('../utils/catchAsync')
const {
  createOne,
  getOne,
  getAll,
  updateOne,
  deleteOne,
} = require('./handlerFactory')
const User = require('../models/userModels')

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1) Get the currently booked tour
  const tour = await Tour.findById(req.params.tourId)

  // 2) Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    // success_url: `${req.protocol}://${req.get('host')}/my-tours?tour=${
    //   req.params.tourId
    // }&user=${req.user.id}&price=${tour.price}`,
    success_url: `${req.protocol}://${req.get('host')}/my-tours`,
    cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,
    line_items: [
      {
        name: `${tour.name} Tour`,
        description: tour.summary,
        images: [`https://www.natours.dev/img/tours/${tour.imageCover}`],
        amount: tour.price * 100,
        currency: 'usd',
        quantity: 1,
      },
    ],
  })

  // 3) Create session as response
  res.status(200).json({
    status: 'success',
    session,
  })
})

// exports.createBookingCheckout = catchAsync(async (req, res, next) => {
//   // This is only Temporary , because its unsecure. everyone can make booking without paying
//   const { tour, user, price } = req.query
//   if (!tour && !user && !price) return next()
//   await Booking.create({ tour, user, price })

//   res.redirect(req.originalUrl.split('?')[0])
// })

const createBookingCheckout = async (session) => {
  const tour = session.client_reference_id
  const user = (await User.findOne({ email: session.customer_email })).id
  const price = session.line_items[0].amount / 100
  await Booking.create({ tour, user, price })
}

exports.webhookCheckout = (req, res, next) => {
  const signature = req.headers['stripe-signature']
  let event
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`)
  }

  if (event.type === 'checkout.session.completed') {
    createBookingCheckout(event.data.object)
    res.status(200).json({ received: true })
  }
}

exports.createBooking = createOne(Booking)
exports.getBooking = getOne(Booking)
exports.getAllBookings = getAll(Booking)
exports.updateBooking = updateOne(Booking)
exports.deleteBooking = deleteOne(Booking)
