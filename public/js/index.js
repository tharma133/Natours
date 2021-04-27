import '@babel/polyfill'
import { displaymap } from './mapbox'
import { login, logout, signup } from './login'
import { updateSetting, changeUserPhoto } from './updateSetting'
import { bookTour } from './stripe'
import { showAlert } from './alerts'

// DOM elements
const mapBox = document.getElementById('map')
const loginForm = document.querySelector('.form--login')
const signupForm = document.querySelector('.form--signup')
const logoutBtn = document.querySelector('.nav__el--logout')
const userDataForm = document.querySelector('.form-user-data')
const userPasswordForm = document.querySelector('.form-user-password')
const bookBtn = document.getElementById('book-tour')

// VALUES

// DELEGATION
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations)
  displaymap(locations)
}

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    login(email, password)
  })
}

if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const passwordConfirm = document.getElementById('passwordConfirm').value
    signup(name, email, password, passwordConfirm)
  })
}

if (logoutBtn) logoutBtn.addEventListener('click', logout)

if (userDataForm) {
  const form = new FormData()
  document
    .querySelector('.form__upload')
    .addEventListener('change', async (e) => {
      e.preventDefault()

      form.append('photo', document.getElementById('photo').files[0])
      const resObj = await changeUserPhoto(form)

      if (resObj.data.status === 'success') {
        document.querySelector(
          '.form__user-photo'
        ).src = `/img/users/${resObj.data.data.user.photo}`
      }
      window.location.reload()
    })
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault()
    document.querySelector('.btn--save-user').textContent = 'Updating...'
    const form = new FormData()

    form.append('name', document.getElementById('name').value)
    form.append('email', document.getElementById('email').value)
    updateSetting(form, 'data')
    document.querySelector('.btn--save-user').textContent = 'Save settings'
  })
}

if (userPasswordForm) {
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    document.querySelector('.btn--save-password').textContent = 'Updating...'
    const passwordCurrent = document.getElementById('password-current').value
    const password = document.getElementById('password').value
    const passwordConfirm = document.getElementById('password-confirm').value
    await updateSetting(
      { passwordCurrent, password, passwordConfirm },
      'password'
    )
    document.querySelector('.btn--save-password').textContent = 'Save password'
    document.getElementById('password-current').value = ''
    document.getElementById('password').value = ''
    document.getElementById('password-confirm').value = ''
  })
}

if (bookBtn) {
  bookBtn.addEventListener('click', (e) => {
    e.preventDefault()
    e.target.textContent = 'Processing...'
    const tourId = e.target.dataset.tourid
    bookTour(tourId)
    e.target.textContent = 'Book Your Tour...'
  })
}

const alertMessage = document.querySelector('body').dataset.alert

if (alertMessage) showAlert('success', alertMessage, 15)
