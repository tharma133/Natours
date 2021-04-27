import axios from 'axios'
import { showAlert } from './alerts'

const stripe = Stripe(
  'pk_test_51IjpqxSCBrmVKbatVl2XPccKtPpv8f0hAPeY9YODoaSJt2ZgLeND3iJMxvvxmAw7nWVsy3N7FkdSnn9kQCWI6JIw00RfKgIBdu'
)
export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/booking/checkout/${tourId}`)

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    })
  } catch (err) {
    showAlert('error', 'Something went wrong! Try agian after sometimes.')
  }
}
