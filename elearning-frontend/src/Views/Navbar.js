import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import UserInfo from '../Services/UserInfo'
import { Navigate } from 'react-router-dom'

const Navbar = (props) => {
  return (
    <div className='navbar flex center-vertical'>
      <div className='username' onClick={props.handleHomeClick}>
        <FontAwesomeIcon icon={props.userIcon} size={props.userIconSize} />
        <span>{UserInfo.getName()}</span>
      </div>
      <ul className='list flex'>
        {props.items.map((item, index) => {
          return (
            <li key={index} className={item.active ? 'active' : ''}>
              {item.name}
            </li>
          )
        })}
      </ul>
      <div className='logout' onClick={props.handleLogout}>
        <FontAwesomeIcon icon={props.logoutIcon} size={props.logoutIconSize} />
      </div>
    </div>
  )
}

export default Navbar
