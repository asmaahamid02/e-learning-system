import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import UserInfo from '../Services/UserInfo'
import { Navigate, Link } from 'react-router-dom'

const Navbar = (props) => {
  const handleHomeClick = () => {
    return <Navigate replace to='/home' />
    // window.location.reload()
  }

  const handleLogout = () => {
    UserInfo.removeUser()
    props.setLoggedInUser(null)
  }
  return (
    <div className='navbar flex center-vertical'>
      <div className='username flex' onClick={handleHomeClick}>
        <FontAwesomeIcon icon={props.userIcon} size={props.userIconSize} />
        <span>{UserInfo.getName()}</span>
      </div>
      <ul className='list flex'>
        {UserInfo.getRole() == 'admin' && (
          <>
            <li>
              <Link to='/home'>Instructors</Link>
            </li>
            <li>
              <Link to='/students'>Students</Link>
            </li>
            <li>
              <Link to='/courses'>Courses</Link>
            </li>
          </>
        )}

        {UserInfo.getRole() == 'instructor' && (
          <>
            <li>
              <Link to='/home'>Students</Link>
            </li>
            <li>
              <Link to='/courses'>Courses</Link>
            </li>
            <li>
              <Link to='/assignments'>Assignments</Link>
            </li>
            <li>
              <Link to='/announcements'>Announcements</Link>
            </li>
          </>
        )}

        {UserInfo.getRole() == 'student' && (
          <>
            <li>
              <Link to='/home'>Courses</Link>
            </li>
            <li>
              <Link to='/assignments'>Assignments</Link>
            </li>
            <li>
              <Link to='/announcements'>Announcements</Link>
            </li>
          </>
        )}
      </ul>
      <div className='logout' onClick={handleLogout}>
        <FontAwesomeIcon icon={props.logoutIcon} size={props.logoutIconSize} />
      </div>
    </div>
  )
}

export default Navbar
