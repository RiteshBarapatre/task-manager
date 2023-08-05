import React, { useEffect } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Navbar from './components/Navbar'
import CompletedTask from './components/CompletedTask'



function App() {

  return (
   <div className='app'>
   <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/completed' element={<CompletedTask/>}/>
    </Routes>
   </div>
  )
}

export default App
