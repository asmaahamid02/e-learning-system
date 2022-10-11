import Box from './Box'
import {
  faUserPlus,
  faCirclePlus,
  faShapes,
  faUsers,
  faLock,
  faEnvelope,
  faPhone,
  faUser,
  faCalendar,
} from '@fortawesome/free-solid-svg-icons'
import UserInfo from '../Services/UserInfo'
import { Navigate } from 'react-router-dom'
import { useCallback, useEffect, useRef, useState } from 'react'
import FormInput from './FormInput'
import SelectInput from './SelectInput'
import User from '../API/user'
import Course from '../API/courses'

const Instructor = (props) => {
  const genderOptions = [
    { name: 'female', value: 'female' },
    { name: 'male', value: 'male' },
  ]
  const [options, setOptions] = useState(genderOptions)
  const [instructorOptions, setInstructorOptions] = useState([])
  const [courseOptions, setCourseOptions] = useState([])

  /*
  Note: useCallback hook it will re-render on every update which will result in triggering the useEffect hook again.
*/

  //to fill instructors options
  const fetchInstructors = useCallback(async () => {
    try {
      const response = await User.getInstructors()

      console.log(response)
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

  useEffect(() => {
    fetchInstructors()
  }, [fetchInstructors])

  useEffect(() => {
    fetchCourses()
  }, [fetchCourses])

  if (UserInfo.getRole() != 'admin') {
    return <Navigate replace to='/home' />
  }

  //add course form components
  const addInstructorsInputs = {
    title: 'Add Instructors',
    buttonText: 'Add',
    showModal: true,
    api: 'addUser',
    role: 'instructor',
    inputs: [
      <FormInput
        icon={faUser}
        iconClass='icon-green'
        iconSize='lg'
        type='text'
        name='name'
        id='username'
        placeholder='Asmaa Hamid'
      />,
      <FormInput
        icon={faEnvelope}
        iconClass='icon-green'
        iconSize='lg'
        type='text'
        name='email'
        id='email'
        placeholder='john@gmail.com'
      />,
      <FormInput
        icon={faPhone}
        iconClass='icon-green'
        iconSize='lg'
        type='phone'
        name='phone_number'
        id='phone'
        placeholder='+961548796268'
      />,
      <SelectInput
        icon={faUser}
        iconClass='icon-green'
        iconSize='lg'
        name='gender'
        options={options}
      />,
      <FormInput
        icon={faCalendar}
        iconClass='icon-green'
        iconSize='lg'
        type='date'
        name='dob'
        id='dob'
      />,
      <FormInput
        icon={faLock}
        iconClass='icon-green'
        iconSize='lg'
        type='password'
        name='password'
        id='password'
        placeholder='Aa12!@#$%'
      />,
      <FormInput
        icon={faLock}
        iconClass='icon-green'
        iconSize='lg'
        type='password'
        name='confirm-password'
        id='confirm-password'
        placeholder='Aa12!@#$%'
      />,
    ],
  }

  //assign Course To Instructors form components
  const assignCourseToInstructors = {
    title: 'Assign Courses to Instructors',
    buttonText: 'Assign',
    showModal: true,
    inputs: [
      <SelectInput
        icon={faUsers}
        iconClass='icon-green'
        iconSize='lg'
        name='course'
        options={instructorOptions}
      />,
      <SelectInput
        icon={faShapes}
        iconClass='icon-green'
        iconSize='lg'
        name='course'
        options={courseOptions}
      />,
    ],
  }

  //Box onClick function to render the right modal
  const fillInputs = (e) => {
    if (e.currentTarget.textContent.includes('Add')) {
      setOptions([...genderOptions])
      props.setModalProps(addInstructorsInputs)
    } else if (e.currentTarget.textContent.includes('Assign')) {
      props.setModalProps(assignCourseToInstructors)
    }
  }

  return (
    <>
      <Box
        id='1'
        color='purple'
        iconTop={faUserPlus}
        iconBottom={faCirclePlus}
        title='Add Instructors'
        onClick={fillInputs}
      />
      <Box
        id='2'
        color='green'
        iconTop={faShapes}
        iconBottom={faCirclePlus}
        title='Assign Courses to Instructors'
        onClick={fillInputs}
      />
      <Box
        id='3'
        color='blue'
        iconTop={faUsers}
        iconBottom={faCirclePlus}
        title='View Instructors'
        onClick={fillInputs}
      />
    </>
  )
}

export default Instructor
