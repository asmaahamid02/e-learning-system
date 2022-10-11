import Box from '../Box'
import {
  faUserPlus,
  faCirclePlus,
  faShapes,
  faUsers,
} from '@fortawesome/free-solid-svg-icons'
import UserInfo from '../../Services/UserInfo'
import { Navigate } from 'react-router-dom'

const Instructor = (props) => {
  if (UserInfo.getRole() != 'admin') {
    return <Navigate replace to='/home' />
  }

  //add instructor form components
  const addInstructorsInputs = {
    title: 'Add Instructors',
    buttonText: 'Add',
  }

  //assign Course To Instructors form components
  const assignCourseToInstructors = {
    title: 'Assign Courses to Instructors',
    buttonText: 'Assign',
  }

  //View Instructors Form components
  const viewInstructors = {
    title: 'View Instructors',
  }

  //Box onClick function to render the right modal
  const fillInputs = (e) => {
    if (e.currentTarget.textContent.includes('Add')) {
      props.setModalProps(addInstructorsInputs)
      props.setModalForm('addInstructor')
      props.setShowModal(true)
    } else if (e.currentTarget.textContent.includes('Assign')) {
      props.setModalProps(assignCourseToInstructors)
      props.setModalForm('assignCourseToInstructor')
      props.setShowModal(true)
    } else if (e.target.textContent.includes('View')) {
      props.setModalProps(viewInstructors)
      props.setModalForm('viewInstructors')
      props.setShowModal(true)
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
