import Box from '../Box'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import {
  faUserPlus,
  faCirclePlus,
  faShapes,
  faUsers,
} from '@fortawesome/free-solid-svg-icons'
import UserInfo from '../../Services/UserInfo'

const Student = (props) => {
  const [boxTitle, setBoxTitle] = useState('Add Students')
  const [boxIcon, setBoxIcon] = useState(faUserPlus)

  if (UserInfo.getRole() == 'instructor') {
    setBoxTitle('Assign Course to User')
    setBoxIcon(faShapes)
  } else if (UserInfo.getRole() == 'student') {
    return <Navigate replace to='/home' />
  }

  //add Students form components
  const addIArray = {
    title: 'Add Students',
    buttonText: 'Add',
  }

  //assign Course To Students form components
  const assignArray = {
    title: 'Assign Course to User',
    buttonText: 'Assign',
  }

  //View Students Form components
  const viewArray = {
    title: 'View Instructors',
  }

  //Box onClick function to render the right modal
  const fillInputs = (e) => {
    if (e.currentTarget.textContent.includes('Add')) {
      props.setModalProps(addIArray)
      props.setModalForm('addStudent')
      props.setShowModal(true)
    } else if (e.currentTarget.textContent.includes('Assign')) {
      props.setModalProps(assignArray)
      props.setModalForm('assignCourseToStudent')
      props.setShowModal(true)
    } else if (e.target.textContent.includes('View')) {
      props.setModalProps(viewArray)
      props.setModalForm('viewStudents')
      props.setShowModal(true)
    }
  }

  return (
    <>
      <Box
        color='purple'
        iconTop={boxIcon}
        iconBottom={faCirclePlus}
        title={boxTitle}
        onClick={fillInputs}
      />
      <Box
        color='green'
        iconTop={faUsers}
        iconBottom={faCirclePlus}
        title='View Students'
        onClick={fillInputs}
      />
    </>
  )
}

export default Student
