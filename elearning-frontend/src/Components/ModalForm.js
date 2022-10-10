import { useEffect, useState } from 'react'
import Button from '../Components/Button'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import User from '../API/user'

const ModalForm = (props) => {
  const [message, setMessage] = useState('')
  const [valid, setValid] = useState(false)
  const handleModalShow = () => {
    props.setModalProps({ ...props.modalProps, ['showModal']: false })
  }

  const getErrorMessage = (errors) => {
    let errormessage = ''
    Object.keys(errors).forEach(function (key) {
      errormessage += errors[key] + '/'
    })

    return errormessage
  }

  const submitForm = async (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    data.append('role', props.modalProps.role)

    if (props.modalProps.api == 'addUser') {
      const response = await User.addUser(data)

      console.log(response.data)

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

    // const dataToSubmit = { name: 'asmaa' }
    // const functionName = `${props.modalProps.api}`
    // console.log(eval('User.' + functionName + '(' + dataToSubmit + ');'))
    // console.log(functionName)

    console.log([...data])
  }
  const handleReset = () => {
    console.log('reset')
  }
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
    <div className='modal-background flex' id='form-modal'>
      <div className='modal-container flex'>
        <div className='modal-header flex center-vertical'>
          <h3 className='header-title'>{props.title}</h3>
          <FontAwesomeIcon
            icon={faXmark}
            className='icon icon-dark'
            size='xl'
            onClick={handleModalShow}
          />
        </div>
        <div className='modal-body'>
          <p
            className={`display-message center ${valid ? 'success' : 'error'}${
              !message ? ' hide' : ''
            }`}
          >
            {message}
          </p>
          <form onSubmit={submitForm} id='add-form'>
            {props.inputs.map((input, index) => {
              // input.id = { index }
              return <>{input}</>
            })}
            <Button
              classes='btn btn-large btn-green'
              // id='btn-login'
              text={props.buttonText}
            />
          </form>
        </div>
        <div className='modal-footer flex'>
          <button className='btn btn-dark btn-cancel' onClick={handleModalShow}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalForm
