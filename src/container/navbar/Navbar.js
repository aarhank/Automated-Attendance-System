import React from 'react'
import NavIcons from '../../components/navbar/navIcons'
import './index.css'
export default function Navbar() {
  return (
    <div className="navbar-dashboard">
          <div style={{width:"100%"}}>
            <NavIcons/>
          </div>
          <div className='nav-icons-center'>
            <NavIcons/>
            <NavIcons/>
            <NavIcons/>
            <NavIcons/>
          </div>
    </div>
  )
}
