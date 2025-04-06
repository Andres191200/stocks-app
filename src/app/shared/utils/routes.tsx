import Home from '@/app/home/page'
import React from 'react'
import { Routes, Route } from 'react-router'


function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
    </Routes>
  )
}
