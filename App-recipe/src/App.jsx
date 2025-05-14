import { useState } from 'react'
import React from 'react'
import Home from './pages/Home'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
   <div className='min-h-screen bg-gray-50 text-gray-800'>
       <Home />
   </div>
  )
}

export default App
