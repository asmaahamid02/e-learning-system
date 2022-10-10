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
import ModalForm from './ModalForm'
import FormInput from './FormInput'
import SelectInput from './SelectInput'

const Instructor = (props) => {
  if (UserInfo.getRole() != 'admin') {
    return <Navigate replace to='/home' />
  }

  const AddInstructorsInputs = {
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
        options={['female', 'male']}
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

  const AssignCourseToInstructors = {
    title: 'Assign Courses to Instructors',
    buttonText: 'Assign',
    showModal: true,
    inputs: [
      <SelectInput
        icon={faShapes}
        iconClass='icon-green'
        iconSize='lg'
        name='course'
        options={['course1', 'course2']}
      />,
      <SelectInput
        icon={faUsers}
        iconClass='icon-green'
        iconSize='lg'
        name='instructors'
        options={['instructor1', 'instructor2']}
      />,
    ],
  }
  const fillInputs = (e) => {
    if (e.currentTarget.textContent.includes('Add')) {
      props.setModalProps(AddInstructorsInputs)
    } else if (e.currentTarget.textContent.includes('Assign')) {
      props.setModalProps(AssignCourseToInstructors)
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
