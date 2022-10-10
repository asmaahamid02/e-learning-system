import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import UserInfo from '../Services/UserInfo'
import { Navigate, Link, NavLink } from 'react-router-dom'

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
        {props.items.map((item, index) => {
          return (
            <li key={index} className={item.active ? 'active' : ''}>
              <Link to={`/${item.name}`}>{item.name.toUpperCase()}</Link>
            </li>
          )
        })}
      </ul>
      <div className='logout' onClick={handleLogout}>
        <FontAwesomeIcon icon={props.logoutIcon} size={props.logoutIconSize} />
      </div>
    </div>
  )
}

export default Navbar
