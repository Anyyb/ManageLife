import axios from 'axios'
const baseUrl = 'http://192.168.1.126:3000/api/tasks'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}
const getAll = async() => {
  const response = await axios.get(baseUrl)
  return response.data
}
const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const deleteTask = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, create, setToken, deleteTask }