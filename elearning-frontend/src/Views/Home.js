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
  const userRole = UserInfo.getRole()
  const navItemsObj = {
    admin: [
      {
        id: 1,
        name: 'instructors',
        active: true,
      },
      {
        id: 2,
        name: 'students',
        active: false,
      },
      {
        id: 3,
        name: 'courses',
        active: false,
      },
    ],
    instructor: [
      {
        id: 1,
        name: 'students',
        active: true,
      },
      {
        id: 2,
        name: 'courses',
        active: false,
      },
      {
        id: 3,
        name: 'assignments',
        active: false,
      },
      {
        id: 4,
        name: 'announcements',
        active: false,
      },
    ],
    student: [
      {
        id: 1,
        name: 'courses',
        active: true,
      },
      {
        id: 2,
        name: 'assignments',
        active: false,
      },
      {
        id: 3,
        name: 'announcements',
        active: false,
      },
    ],
  }

  const [navItems, setNavItems] = useState(navItemsObj[userRole])
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

  const handleItemClick = (e) => {
    // console.log(e.target)
    // setNavItems([...navItems, { [e.target.id]: true }])
  }

  //   useEffect(() => {}, [navItems])
  console.log(loggedInUser)
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
          setLoggedInUser={setLoggedInUser}
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
