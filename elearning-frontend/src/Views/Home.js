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
const Home = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  useEffect(() => {
    const loggedInUser = UserInfo.getUser()
    if (loggedInUser) {
      setLoggedIn(true)
    }
  }, [])

  if (!loggedIn) {
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
        <div className='navbar flex center-vertical'>
          <div className='username'>
            <FontAwesomeIcon icon={faUser} size='xl' />
            <span>Asmaa Hamid</span>
          </div>
          <ul className='list flex'>
            <li>
              <a href='#'>Instructors</a>
            </li>
            <li className='active'>
              <a href='#'>Students</a>
            </li>
            <li>
              <a href='#'>Courses</a>
            </li>
          </ul>
          <div className='logout'>
            <a href='#'>
              <FontAwesomeIcon icon={faRightFromBracket} size='xl' />
            </a>
          </div>
        </div>
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
