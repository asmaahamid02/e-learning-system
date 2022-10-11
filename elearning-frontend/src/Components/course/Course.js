import Box from '../Box'
import { useState } from 'react'
import {
  faCirclePlus,
  faShapes,
  faFolderPlus,
  faFolderMinus,
} from '@fortawesome/free-solid-svg-icons'
import UserInfo from '../../Services/UserInfo'

const Course = (props) => {
  const [showAddCourse, setShowAddCourse] = useState(true)
  const [showDropCourse, setshowDropCourse] = useState(false)

  if (
    (UserInfo.getRole() == 'student' || UserInfo.getRole() == 'instructor') &&
    showAddCourse
  ) {
    setShowAddCourse(false)
  }

  if (UserInfo.getRole() == 'student' && !showDropCourse) {
    setshowDropCourse(true)
  }

  //add course form components
  const addArray = {
    title: 'Add Instructors',
    buttonText: 'Add',
  }

  //drop courses form components
  const dropArray = {
    title: 'Drop Courses',
    buttonText: 'Assign',
  }

  //View courses Form components
  const viewArray = {
    title: 'View Courses',
  }

  //Box onClick function to render the right modal
  const fillInputs = (e) => {
    if (e.currentTarget.textContent.includes('Add')) {
      props.setModalProps(addArray)
      props.setModalForm('addCourse')
      props.setShowModal(true)
    } else if (e.currentTarget.textContent.includes('Drop')) {
      props.setModalProps(dropArray)
      props.setModalForm('dropCourse')
      props.setShowModal(true)
    } else if (e.target.textContent.includes('View')) {
      props.setModalProps(viewArray)
      props.setModalForm('viewCourses')
      props.setShowModal(true)
    }
  }

  return (
    <>
      {showAddCourse && (
        <Box
          color='green'
          iconTop={faFolderPlus}
          iconBottom={faCirclePlus}
          title='Add Courses'
          onClick={fillInputs}
        />
      )}

      {showDropCourse && (
        <Box
          color='blue'
          iconTop={faFolderMinus}
          iconBottom={faCirclePlus}
          title='Drop Courses'
          onClick={fillInputs}
        />
      )}
      <Box
        color='purple'
        iconTop={faShapes}
        iconBottom={faCirclePlus}
        title='View Courses'
        onClick={fillInputs}
      />
    </>
  )
}

export default Course
