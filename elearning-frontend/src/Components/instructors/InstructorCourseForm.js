import { faUsers, faShapes } from '@fortawesome/free-solid-svg-icons'
import Button from '../form/Button'
import SelectInput from '../form/SelectInput'
import { useState, useEffect, useCallback } from 'react'
import User from '../../API/user'
import Course from '../../API/courses'

const AddInstructorsForm = (props) => {
  /*CONSTANTS*/
  const [instructorOptions, setInstructorOptions] = useState([])
  const [courseOptions, setCourseOptions] = useState([])

  const [message, setMessage] = useState('')
  const [valid, setValid] = useState(false)

  /*FUNCTIONS*/
  /*
    Note: useCallback hook it will re-render on every update which will result in triggering the useEffect hook again.
  */

  //to fill instructors options
  const fetchInstructors = useCallback(async () => {
    try {
      const response = await User.getInstructors()

      let newOptions = []
      if (response.status == 200) {
        if (!response.data) {
          newOptions.push({ value: '', name: response.message })
        } else {
          response.data.map((instructor) => {
            newOptions.push({ name: instructor.name, value: instructor._id })
          })
        }
        setInstructorOptions(newOptions)
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  //to fill courses options
  const fetchCourses = useCallback(async () => {
    try {
      const response = await Course.getCourses()
      let newOptions = []
      if (response.status == 200) {
        if (!response.data) {
          newOptions.push({ value: '', name: response.message })
        } else {
          response.data.map((course) => {
            newOptions.push({
              name: `${course.title} (${course.code})`,
              value: course._id,
            })
          })
        }
        setCourseOptions(newOptions)
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  //split the errors of array
  const getErrorMessage = (errors) => {
    let errormessage = ''
    Object.keys(errors).forEach(function (key) {
      errormessage += errors[key] + '/'
    })
    return errormessage
  }

  //submit the form
  const submitForm = async (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    const response = await Course.assignCourseToInstructor(
      data.get('instructor'),
      data.get('course')
    )
    if (response.data.status < 400) {
      setValid(true)
      setMessage(response.data.message)
    } else {
      setValid(false)
      response.data.data
        ? setMessage(getErrorMessage(response.data.data))
        : setMessage(response.data.message)
    }
  }

  /*USE EFFECT*/
  useEffect(() => {
    if (valid) {
      setTimeout(function () {
        setMessage('')
        document.getElementById('add-form').reset()
        setValid(true)
      }, 1000)
    }
  }, [valid])

  useEffect(() => {
    fetchInstructors()
  }, [fetchInstructors])

  useEffect(() => {
    fetchCourses()
  }, [fetchCourses])

  return (
    <>
      <p
        className={`display-message center ${valid ? 'success' : 'error'}${
          !message ? ' hide' : ''
        }`}
      >
        {message}
      </p>
      <form onSubmit={submitForm} id='add-form'>
        <SelectInput
          icon={faUsers}
          iconClass='icon-green'
          iconSize='lg'
          name='instructor'
          options={instructorOptions}
        />

        <SelectInput
          icon={faShapes}
          iconClass='icon-green'
          iconSize='lg'
          name='course'
          options={courseOptions}
        />

        <Button classes='btn btn-large btn-green' text='Assign Course' />
      </form>
    </>
  )
}

export default AddInstructorsForm
