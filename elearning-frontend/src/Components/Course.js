import Box from './Box'
import { useState } from 'react'
import {
  faCirclePlus,
  faShapes,
  faFolderPlus,
  faFolderMinus,
} from '@fortawesome/free-solid-svg-icons'
import UserInfo from '../Services/UserInfo'

const Course = () => {
  const [showAddCourse, setShowAddCourse] = useState(true)
  const [showDropCourse, setshowDropCourse] = useState(false)

  if (UserInfo.getRole() == 'student' || UserInfo.getRole() == 'instructor') {
    setShowAddCourse(false)
  }

  if (UserInfo.getRole() == 'student') {
    setshowDropCourse(true)
  }
  return (
    <>
      {showAddCourse && (
        <Box
          color='green'
          iconTop={faFolderPlus}
          iconBottom={faCirclePlus}
          title='Add Courses'
        />
      )}

      {showDropCourse && (
        <Box
          color='blue'
          iconTop={faFolderMinus}
          iconBottom={faCirclePlus}
          title='Drop Courses'
        />
      )}
      <Box
        color='purple'
        iconTop={faShapes}
        iconBottom={faCirclePlus}
        title='View Courses'
      />
    </>
  )
}

export default Course
