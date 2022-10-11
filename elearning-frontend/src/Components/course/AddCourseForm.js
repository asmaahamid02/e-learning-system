import { faBook } from '@fortawesome/free-solid-svg-icons'
import FormInput from '../form/FormInput'
import Button from '../form/Button'
import { useState, useEffect } from 'react'
import Courses from '../../API/courses'

const AddCourseForm = () => {
  /*CONSTANTS*/
  //gender options
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
    const response = await Courses.addCourse(data)

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
          icon={faBook}
          iconClass='icon-green'
          iconSize='lg'
          type='text'
          name='code'
          id='code'
          placeholder='Code'
        />
        <FormInput
          icon={faBook}
          iconClass='icon-green'
          iconSize='lg'
          type='text'
          name='title'
          id='title'
          placeholder='Title'
        />
        <FormInput
          icon={faBook}
          iconClass='icon-green'
          iconSize='lg'
          type='text'
          name='subject'
          id='subject'
          placeholder='Subject'
        />
        <FormInput
          icon={faBook}
          iconClass='icon-green'
          iconSize='lg'
          type='number'
          name='credits_number'
          id='credits_number'
          placeholder='Credits'
        />
        <FormInput
          icon={faBook}
          iconClass='icon-green'
          iconSize='lg'
          type='number'
          name='price'
          id='price'
          placeholder='Price'
        />
        <FormInput
          icon={faBook}
          iconClass='icon-green'
          iconSize='lg'
          type='text'
          name='description'
          id='description'
          placeholder='Short Discription'
        />
        <Button classes='btn btn-large btn-green' text='Add Student' />
      </form>
    </>
  )
}

export default AddCourseForm
