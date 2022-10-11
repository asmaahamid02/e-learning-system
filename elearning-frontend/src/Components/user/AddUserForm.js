import {
  faLock,
  faEnvelope,
  faPhone,
  faUser,
  faCalendar,
} from '@fortawesome/free-solid-svg-icons'
import FormInput from '../form/FormInput'
import SelectInput from '../form/SelectInput'
import User from '../../API/user'
import Button from '../form/Button'
import { useState, useEffect } from 'react'

const AddInstructorsForm = (props) => {
  /*CONSTANTS*/
  //gender options
  const [options, setOptions] = useState([
    { name: 'female', value: 'female' },
    { name: 'male', value: 'male' },
  ])

  const [message, setMessage] = useState('')
  const [valid, setValid] = useState(false)

  //split the errors of array
  const getErrorMessage = (errors) => {
    let errormessage = ''
    Object.keys(errors).forEach(function (key) {
      errormessage += errors[key] + '/'
    })
    return errormessage
  }

  /*FUNCTIONS*/

  //submit the form
  const submitForm = async (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    data.append('role', props.role)
    const response = await User.addUser(data)

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

  /*USE EFFECTS*/
  useEffect(() => {
    if (valid) {
      setTimeout(function () {
        setMessage('')
        document.getElementById('add-form').reset()
        setValid(true)
      }, 1000)
    }
  }, [valid])

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
        <FormInput
          icon={faUser}
          iconClass='icon-green'
          iconSize='lg'
          type='text'
          name='name'
          id='username'
          placeholder='Asmaa Hamid'
        />
        <FormInput
          icon={faEnvelope}
          iconClass='icon-green'
          iconSize='lg'
          type='text'
          name='email'
          id='email'
          placeholder='john@gmail.com'
        />
        <FormInput
          icon={faPhone}
          iconClass='icon-green'
          iconSize='lg'
          type='phone'
          name='phone_number'
          id='phone'
          placeholder='+961548796268'
        />
        <SelectInput
          icon={faUser}
          iconClass='icon-green'
          iconSize='lg'
          name='gender'
          options={options}
        />
        <FormInput
          icon={faCalendar}
          iconClass='icon-green'
          iconSize='lg'
          type='date'
          name='dob'
          id='dob'
        />
        <FormInput
          icon={faLock}
          iconClass='icon-green'
          iconSize='lg'
          type='password'
          name='password'
          id='password'
          placeholder='Aa12!@#$%'
        />
        <FormInput
          icon={faLock}
          iconClass='icon-green'
          iconSize='lg'
          type='password'
          name='confirm-password'
          id='confirm-password'
          placeholder='Aa12!@#$%'
        />
        <Button classes='btn btn-large btn-green' text='Add Instructor' />
      </form>
    </>
  )
}

export default AddInstructorsForm
