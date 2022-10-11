import { api } from './api'

class Assignment {
  async getAssignments() {
    try {
      const response = await api.get('assignments/')
      return response.data
    } catch (error) {
      return error
    }
  }

  async addAssignment(data) {
    try {
      return await api.post('assignments/', data)
    } catch (error) {
      return error
    }
  }

  async submitAssignment(data, id) {
    try {
      return await api.post('assignments/submit/' + id, data)
    } catch (error) {
      return error
    }
  }
}

export default new Assignment()
