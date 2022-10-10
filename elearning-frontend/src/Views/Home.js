import logoImg from '../assets/images/login.png'
import UserInfo from '../Services/UserInfo'
import { Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import Navbar from './Navbar'
import Instructor from '../Components/Instructor'
import Student from '../Components/Student'
import Course from '../Components/Course'

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState(UserInfo.getUser())

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

  let content = <Instructor />
  if (UserInfo.getRole() == 'instructor') {
    content = <Student />
  } else if (UserInfo.getRole() == 'student') {
    content = <Course />
  }
  return (
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
          <div className='items'>{content}</div>
        </div>
      </div>
    </div>
  )
}

export default Home
