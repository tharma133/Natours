import axios from 'axios'
import { showAlert } from './alerts'

export const updateSetting = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? '/api/v1/users/updateMyPassword'
        : '/api/v1/users/updateME'
    const res = await axios({
      method: 'PATCH',
      url,
      data,
    })
    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} updated successfully`)
    }
  } catch (err) {
    showAlert('error', 'Please provide valid data')
  }
}

export const changeUserPhoto = async (data) => {
  try {
    const url = '/api/v1/users/updateMe'
    const res = await axios({
      method: 'PATCH',
      url,
      data,
    })
    if (res.data.status === 'success') {
      return { ...res }
    }
  } catch (err) {
    showAlert('error', err.response.data.message)
  }
}
