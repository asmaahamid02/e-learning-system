import logoImg from '../assets/images/login.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUser,
  faRightFromBracket,
  faUserPlus,
  faCirclePlus,
} from '@fortawesome/free-solid-svg-icons'
const Home = () => {
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
              <FontAwesomeIcon icon={faUserPlus} />
              <h3>
                <FontAwesomeIcon icon={faCirclePlus} />
                Add Students
              </h3>
            </div>
            <div className='item green'>
              <i className='fa fa-shapes'></i>
              <h3>
                <FontAwesomeIcon icon={faCirclePlus} />
                Assign Courses to Students
              </h3>
            </div>
            <div className='item blue'>
              <i className='fa fa-user-graduate'></i>
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
