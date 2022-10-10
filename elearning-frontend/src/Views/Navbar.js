import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import UserInfo from '../Services/UserInfo'
import { Navigate } from 'react-router-dom'

const Navbar = (props) => {
  return (
    <div className='navbar flex center-vertical'>
      <div
        className='username'
        onClick={() => {
          return <Navigate replace to='/' />
        }}
      >
        <FontAwesomeIcon icon={props.userIcon} size={props.iconSize} />
        <span>{UserInfo.getName()}</span>
      </div>
      <ul className='list flex'>
        {props.items.map((item, index) => {
          return (
            <li key={index} className={item.active && 'active'}>
              {item.name}
            </li>
          )
        })}
      </ul>
      <div
        className='logout'
        onClick={() => {
          UserInfo.removeUser()
          return <Navigate replace to='/' />
        }}
      >
        <FontAwesomeIcon icon={faRightFromBracket} size='xl' />
      </div>
    </div>
  )
}
