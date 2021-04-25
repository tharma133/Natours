import axios from 'axios'
import { showAlert } from './alerts'

const baseUrl = 'http://localhost:3000'
const api = '/api/v1'

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/users/login',
      data: {
        email,
        password,
      },
    })
    if (res.data.status === 'success') {
      showAlert('success', 'Logged in succesfully')
      window.setTimeout(() => {
        location.assign('/')
      }, 1500)
    }
  } catch (err) {
    showAlert('error', 'Invalid email or password')
  }
}

export const signup = async (name, email, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/users/signup',
      data: {
        name,
        email,
        password,
        passwordConfirm,
      },
    })
    if (res.data.status === 'success') {
      showAlert('success', 'Signed up succesfully')
      window.setTimeout(() => {
        location.assign('/')
      }, 1500)
    }
  } catch (err) {
    showAlert('error', 'Check your entered data')
  }
}

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:3000/api/v1/users/logout',
    })
    if (res.data.status === 'success') location.assign('/')
  } catch (err) {
    showAlert('error', 'Error logging out! Try again.')
  }
}
