import React, { useState } from 'react'
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Signup from './Components/Signup'
import Navbar from './Components/Navbar'
import Login from './Components/Login'
import OppurtunitiesComponent from './Components/OppurtunitiesComponent'
import Dashboard from './Components/Dashboard'
import Profile from './Components/Profile'
export default function App() {
  const [display, setDisplay] = useState({
    profile: false
  })
  return (
    <>
     <BrowserRouter>
       <Navbar display={display}/>
        <Routes>
            <Route path='/' element={<OppurtunitiesComponent/>}/>
            <Route path='/login' element={<Login setDisplay={setDisplay}/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/dashboard' element={<Dashboard setDisplay={setDisplay}/>}/>
            <Route path="/profile" element={<Profile />} />
        </Routes>
     </BrowserRouter>
    </>
  )
}
