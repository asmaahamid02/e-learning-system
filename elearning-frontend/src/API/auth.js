import { api } from './api'

class Auth {
  async login(email, password) {
    try {
      return await api.post('login', { email, password })
    } catch (error) {
      return error
    }
  }
}

export default new Auth()
