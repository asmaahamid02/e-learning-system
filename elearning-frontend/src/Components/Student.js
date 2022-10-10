import Box from './Box'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import {
  faUserPlus,
  faCirclePlus,
  faShapes,
  faUsers,
} from '@fortawesome/free-solid-svg-icons'
import UserInfo from '../Services/UserInfo'

const Student = () => {
  const [boxTitle, setBoxTitle] = useState('Add Students')
  const [boxIcon, setBoxIcon] = useState(faUserPlus)

  if (UserInfo.getRole() == 'instructor') {
    setBoxTitle('Assign Course to User')
    setBoxIcon(faShapes)
  } else if (UserInfo.getRole() == 'student') {
    return <Navigate replace to='/home' />
  }
  return (
    <>
      <Box
        color='purple'
        iconTop={boxIcon}
        iconBottom={faCirclePlus}
        title={boxTitle}
      />
      <Box
        color='green'
        iconTop={faUsers}
        iconBottom={faCirclePlus}
        title='View Students'
      />
    </>
  )
}

export default Student
