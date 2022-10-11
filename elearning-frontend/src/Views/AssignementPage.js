import logoImg from '../assets/images/login.png'
import UserInfo from '../Services/UserInfo'
import { Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import Navbar from './Navbar'
import Assignment from '../Components/assignment/Assignments'

import ModalForm from '../Components/ModalForm'

const AssignmentPage = () => {
  const [loggedInUser, setLoggedInUser] = useState(UserInfo.getUser())

  const [modalProps, setModalProps] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [modalForm, setModalForm] = useState('')

  const checkLoggedIn = () => {
    if (!loggedInUser) {
      return <Navigate replace to='/' />
    } else {
      console.log('logged')
    }
  }

  useEffect(() => {
    checkLoggedIn()
  }, [loggedInUser])

  window.addEventListener('storage', () => {
    setLoggedInUser(UserInfo.getUser())
  })

  if (!loggedInUser) {
    return <Navigate replace to='/' />
  }

  return (
    <>
      <div className='main-container'>
        <div className='left-sidebar'>
          <div className='header flex center-vertical logo'>
            <img className='logo-img' src={logoImg} alt='logo' />
            <h1 className='header-title'>LearnIt</h1>
          </div>
        </div>
        <div className='middle-content'>
          <Navbar
            userIcon={faUser}
            userIconSize='xl'
            logoutIcon={faRightFromBracket}
            logoutIconSize='xl'
            setLoggedInUser={setLoggedInUser}
          />
          <div className='content'>
            <div className='items'>
              {
                <Assignment
                  setModalProps={setModalProps}
                  setModalForm={setModalForm}
                  setShowModal={setShowModal}
                />
              }
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <ModalForm
          title={modalProps.title}
          setShowModal={setShowModal}
          modalForm={modalForm}
        />
      )}
    </>
  )
}

export default AssignmentPage
