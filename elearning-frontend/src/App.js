import login from './assets/images/login.png'
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEnvelope,
  faLock,
  faLockOpen,
} from '@fortawesome/free-solid-svg-icons'

function App() {
  return (
    <div className='login-container'>
      <div className='header'>
        <h1 className='header-title'>Welcome to LearnIt</h1>
      </div>
      <div className='login-image'>
        <img src={login} alt='education' />
      </div>
      <div className='login-form'>
        <form>
          <div className='input-box'>
            <span className='prefix'>
              <FontAwesomeIcon icon={faEnvelope} className='icon-green' />
            </span>
            <input
              className='input'
              type='email'
              name='email'
              id='email'
              placeholder='john@example.com'
            />
          </div>
          <div className='input-box'>
            <span className='prefix'>
              <FontAwesomeIcon icon={faLock} className='icon-green' />
            </span>
            <input
              className='input'
              type='password'
              name='password'
              id='password'
              placeholder='Aa12@#$%'
            />
          </div>
          <button className='btn btn-large btn-dark' id='btn-login'>
            <FontAwesomeIcon icon={faLockOpen} className='icon-dark' />
          </button>
        </form>
      </div>
    </div>
  )
}

export default App
