import { faFile } from '@fortawesome/free-solid-svg-icons'
import Button from '../form/Button'
import SelectInput from '../form/SelectInput'
import FormInput from '../form/FormInput'
import { useState, useEffect, useCallback } from 'react'
import assignments from '../../API/assignments'

const SubmitAssignmentForm = () => {
  /*CONSTANTS*/
  const [assignmentOptions, setAssignmentOptions] = useState([])

  const [message, setMessage] = useState('')
  const [valid, setValid] = useState(false)

  /*FUNCTIONS*/
  /*
    Note: useCallback hook it will re-render on every update which will result in triggering the useEffect hook again.
  */

  //to fill Assignment options
  const fetchAssignments = useCallback(async () => {
    try {
      const response = await assignments.getAssignments()

      let newOptions = []
      if (response.status == 200) {
        if (!response.data) {
          newOptions.push({ value: '', name: response.message })
        } else {
          response.data.map((assignment) => {
            newOptions.push({ name: assignment.title, value: assignment._id })
          })
        }
        setAssignmentOptions(newOptions)
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  //split the errors of array
  const getErrorMessage = (errors) => {
    let errormessage = ''
    Object.keys(errors).forEach(function (key) {
      errormessage += errors[key] + '/'
    })
    return errormessage
  }

  //submit the form
  const submitForm = async (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    console.log([...data])
    console.log(data.get('assignment_file'), data.get('file'))
    const response = await assignments.submitAssignment(
      data,
      data.get('assignment')
    )
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

  /*USE EFFECT*/
  useEffect(() => {
    if (valid) {
      setTimeout(function () {
        setMessage('')
        document.getElementById('add-form').reset()
        setValid(true)
      }, 1500)
    }
  }, [valid])

  useEffect(() => {
    fetchAssignments()
  }, [fetchAssignments])

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
        <SelectInput
          icon={faFile}
          iconClass='icon-green'
          iconSize='lg'
          name='assignment'
          options={assignmentOptions}
        />
        <FormInput
          icon={faFile}
          iconClass='icon-green'
          iconSize='lg'
          type='file'
          name='assignment_file'
          id='assignment_file'
          placeholder='Subject'
        />
        <Button classes='btn btn-large btn-green' text='Submit' />
      </form>
    </>
  )
}

export default SubmitAssignmentForm
