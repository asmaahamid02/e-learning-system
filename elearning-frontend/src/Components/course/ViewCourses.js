import Table from '../Table'
import { useState, useCallback, useEffect } from 'react'
import Course from '../../API/courses'
import UserInfo from '../../Services/UserInfo'

const ViewCourses = () => {
  /*CONSTANTS*/
  const titles = ['Code', 'Title', 'Subject', 'Description', 'Credits', 'Price']
  const [courses, setCourses] = useState([])

  console.log(courses)
  //to fill instructors options

  const fetchCourses = useCallback(async () => {
    try {
      let response = await Course.getCourses()

      if (UserInfo.getRole() == 'student') {
        response = await Course.getEnrolledCourses()
      }
      console.log(response.data)
      let output = []
      if (response.status == 200) {
        if (!response.data) {
          output.push([])
        } else {
          response.data.map((item) => {
            output.push([
              item.code,
              item.title,
              item.subject,
              item.description,
              item.credits,
              item.price,
            ])
          })
        }
        setCourses(output)
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    fetchCourses()
  }, [fetchCourses])

  /*FUNCTIONS*/

  /*USE EFFECT*/

  return (
    <>
      <Table titles={titles} rows={courses} />
    </>
  )
}

export default ViewCourses
