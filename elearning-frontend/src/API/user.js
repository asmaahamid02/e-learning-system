import { api } from './api'

class User {
  async addUser(data) {
    try {
      return await api.post('/users/add_user', data)
    } catch (error) {
      return error
    }
  }

  async getInstructors() {
    try {
      const response = await api.get('users/instructors')
      return response.data
    } catch (error) {
      return error
    }
  }

  async getStudents() {
    try {
      const response = await api.get('users/students')
      return response.data
    } catch (error) {
      return error
    }
  }
}

export default new User()
