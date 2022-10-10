import logoImg from '../assets/images/login.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import UserInfo from '../Services/UserInfo'
import { Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {
  faUser,
  faRightFromBracket,
  faUserPlus,
  faCirclePlus,
  faUserGraduate,
  faShapes,
} from '@fortawesome/free-solid-svg-icons'
import Navbar from './Navbar'

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

  const handleLogout = () => {
    UserInfo.removeUser()
    setLoggedInUser(null)
  }

  const handleHomeClick = () => {
    return <Navigate replace to='/home' />
    // window.location.reload()
  }

  const navItems = [
    {
      name: 'Instructors',
      active: true,
    },
    {
      name: 'Students',
      active: false,
    },
    {
      name: 'Courses',
      active: false,
    },
  ]
  if (!loggedInUser) {
    return <Navigate replace to='/' />
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
          items={navItems}
          logoutIcon={faRightFromBracket}
          logoutIconSize='xl'
          handleLogout={handleLogout}
          handleHomeClick={handleHomeClick}
        />
        <div className='content'>
          <div className='items'>
            <div className='item purple'>
              <FontAwesomeIcon icon={faUserPlus} className='box-icon' />
              <h3>
                <FontAwesomeIcon icon={faCirclePlus} />
                Add Students
              </h3>
            </div>
            <div className='item green'>
              <FontAwesomeIcon icon={faShapes} className='box-icon' />
              <h3>
                <FontAwesomeIcon icon={faCirclePlus} />
                Assign Courses to Students
              </h3>
            </div>
            <div className='item blue'>
              <FontAwesomeIcon icon={faUserGraduate} className='box-icon' />
              <h3>
                <FontAwesomeIcon icon={faCirclePlus} />
                View Students
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
