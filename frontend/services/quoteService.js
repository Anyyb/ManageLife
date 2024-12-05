import axios from 'axios'
const baseUrl = 'http://192.168.1.126:3000/api/quotes'

const getAll = async() => {
    const response = await axios.get(baseUrl)
    return response.data
  }

export default {getAll}