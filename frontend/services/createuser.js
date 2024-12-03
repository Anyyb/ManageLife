import axios from 'axios'
const baseUrl = 'http://192.168.1.126:3000/api/users'

const createUser = async credentials => {
try {
  const response = await axios.post(baseUrl, credentials)
  return response.data
} catch (error) {
    console.error('Error sending data to backend:', error.response ? error.response.data : error.message);
    throw error
}
}

export default {createUser}