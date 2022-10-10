import Box from './Box'
import {
  faUserPlus,
  faCirclePlus,
  faShapes,
  faUsers,
} from '@fortawesome/free-solid-svg-icons'
import UserInfo from '../Services/UserInfo'
import { Navigate } from 'react-router-dom'

const Instructor = () => {
  if (UserInfo.getRole() != 'admin') {
    return <Navigate replace to='/home' />
  }
  return (
    <>
      <Box
        color='purple'
        iconTop={faUserPlus}
        iconBottom={faCirclePlus}
        title='Add Instructors'
      />
      <Box
        color='green'
        iconTop={faShapes}
        iconBottom={faCirclePlus}
        title='Assign Courses to Instructors'
      />
      <Box
        color='blue'
        iconTop={faUsers}
        iconBottom={faCirclePlus}
        title='View Instructors'
      />
    </>
  )
}

export default Instructor
