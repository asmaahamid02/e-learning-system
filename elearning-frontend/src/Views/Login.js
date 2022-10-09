import FormInput from '../Components/FormInput'
import Button from '../Components/Button'
import { useState, useEffect } from 'react'
import {
  faEnvelope,
  faLock,
  faLockOpen,
} from '@fortawesome/free-solid-svg-icons'
import login from '../assets/images/login.png'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({})
  const [isValid, setIsValid] = useState(false)

  //validate form data inputs
  const validate = (formValues) => {
    const err = {}
    if (!formValues.email) {
      err.email = 'Email should not be empty'
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      err.email = 'Email is not valid'
    }
    if (!formValues.password) {
      err.password = 'Password should not be empty'
    } else if (formValues.password.length < 5) {
      err.password = 'Password should be 5 or more characters'
    }

    return err
  }

  //update form data values onChange
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    setErrors(validate(values))
    setIsValid(true)
  }

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isValid) {
      //submit the form
      navigate('/home')
    }
  }, [errors])

  return (
    <div className='login-container'>
      <div className='header'>
        <h1 className='header-title'>Welcome to LearnIt</h1>
      </div>
      <div className='login-image'>
        <img src={login} alt='education' />
      </div>
      <div className='login-form'>
        <form onSubmit={onSubmit}>
          <FormInput
            icon={faEnvelope}
            iconClass='icon-green'
            iconSize='lg'
            type='text'
            name='email'
            id='email'
            placeholder='john@example.com'
            onChange={onChange}
            errorMessage={errors.email}
          />
          <FormInput
            icon={faLock}
            iconClass='icon-green'
            iconSize='lg'
            type='password'
            name='password'
            id='password'
            placeholder='Aa19!@#$%'
            onChange={onChange}
            errorMessage={errors.password}
          />
          <Button
            classes='btn btn-large btn-dark'
            id='btn-login'
            icon={faLockOpen}
            iconClass='icon-white'
            iconSize='xl'
          />
        </form>
      </div>
    </div>
  )
}

export default Login
