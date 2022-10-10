import './App.css'

import Login from './Views/Login'
import Home from './Views/Home'
import StudentPage from './Views/StudentPage'
import CoursePage from './Views/CoursePage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/students' element={<StudentPage />} />
        <Route path='/instructors' element={<>instructors</>} />
        <Route path='/courses' element={<CoursePage />} />
        <Route path='/assignments' element={<>assignments</>} />
        <Route path='/announcements' element={<>announcements</>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
