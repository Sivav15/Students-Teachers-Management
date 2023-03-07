import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import './Navbar.css'

function Navbar() {
  const [open,setOpen] = useState(false);
  const handleClick = ()=> setOpen(!open);
  const closeMenu = ()=> setOpen(false);
  const navLinkStyle = { color: ' #ff7800'}

  return (
    <nav className='nav'>
    <div className='start'> <h5>Students & Teachers Management</h5> </div>
    <div >
<div className='middle' id={open ? null: "hide" }>
<NavLink style={({ isActive }) => isActive ? navLinkStyle : null} to='create-student' onClick={closeMenu}><h6>Create Student</h6></NavLink>
<NavLink style={({ isActive }) => isActive ? navLinkStyle : null} to='create-mentor' onClick={closeMenu}><h6>Create Mentor</h6></NavLink>
<NavLink style={({ isActive }) => isActive ? navLinkStyle : null} to='/assign-student' onClick={closeMenu}><h6>Assign Student to Mentor</h6></NavLink>
 <NavLink style={({ isActive }) => isActive ? navLinkStyle : null} to = '/change-student'onClick={closeMenu}><h6>Change Mentor to Student</h6></NavLink>
</div>
    </div>
   <div className='end' id={open ? null: "hide" }> 
   <NavLink style={({ isActive }) => isActive ? navLinkStyle : null} to='/dashboard' ><h6 onClick={closeMenu}>Dashboard</h6></NavLink>
    </div>

    <div className='menu_icon' onClick={handleClick}>
         <span>  {open ? (<img src="/asset/close.png" alt="menu" className='nav-menu' /> )  : (<img src="/asset/menu.png" alt="menu" className='nav-menu' /> )  } </span>
         </div>
  </nav>
  )
}

export default Navbar