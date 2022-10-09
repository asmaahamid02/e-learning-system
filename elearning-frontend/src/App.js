import './App.css'

import Login from './Views/Login'
import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<>"Home"</>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
