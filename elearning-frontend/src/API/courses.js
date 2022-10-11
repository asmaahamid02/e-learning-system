import { api } from './api'

class Course {
  async getCourses() {
    try {
      const response = await api.get('courses/')
      return response.data
    } catch (error) {
      return error
    }
  }

  async assignCourseToInstructor(instructor_id, course_id) {
    try {
      return await api.get(
        `courses/assign/instructor/${instructor_id}/${course_id}`
      )
    } catch (error) {
      return error
    }
  }

  async addCourse(data) {
    try {
      return await api.post('courses/', data)
    } catch (error) {
      return error
    }
  }

  async getEnrolledCourses() {
    try {
      const response = await api.get('courses/get_courses')
      return response.data
    } catch (error) {
      return error
    }
  }
}

export default new Course()
