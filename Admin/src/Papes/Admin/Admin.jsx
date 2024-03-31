import React from 'react'
import './Admin.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Addbook from '../../Components/Addbook/Addbook'
import Listbook from '../../Components/Listbook/Listbook'
const Admin = () => {
  return (
    <div className='admin'>
      <Sidebar />
      <Routes>
        <Route path='/addbook' element={<Addbook />} />
        <Route path='/listbook' element={<Listbook/>}/>
      </Routes>
    </div>
  )
}

export default Admin
