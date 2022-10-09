import axios from 'axios'
import userInfo from '../Services/UserInfo'

const token = userInfo.getLocalAccessToken()

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: { Authorization: `Bearer ${token}` },
})

export { api }
