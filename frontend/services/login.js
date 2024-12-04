import axios from 'axios'
const baseUrl = 'http://192.168.0.14:3000/api/login'


let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}
const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login, setToken }