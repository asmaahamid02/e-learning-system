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

  async submitAssignment(assignment_file, id) {
    try {
      return await api.post('assignments/submit' + id, { assignment_file })
    } catch (error) {
      return error
    }
  }
}

export default new Assignment()
