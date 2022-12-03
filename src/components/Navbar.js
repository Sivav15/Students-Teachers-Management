import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css'

function Navbar() {
  const [open,setOpen] = useState(false);
  const handleClick = ()=> setOpen(!open);
  const closeMenu = ()=> setOpen(false);
  return (
    <nav className='nav'>
    <div className='start'> <h5>Students & Teachers Management</h5> </div>
    <div >
<div className='middle' id={open ? null: "hide" }>
<Link to='create-student' onClick={closeMenu}><h6>Create Student</h6></Link>
<Link to='create-mentor' onClick={closeMenu}><h6>Create Mentor</h6></Link>
<Link to='assign-student' onClick={closeMenu}><h6>Assign Student</h6></Link>
</div>
    </div>
   <div className='end' id={open ? null: "hide" }> 
   <Link to='/' ><h6 onClick={closeMenu}>Dashboard</h6></Link>
    </div>

    <div className='menu_icon' onClick={handleClick}>
         <span>  {open ? (<img src="/asset/close.png" alt="menu" className='nav-menu' /> )  : (<img src="/asset/menu.png" alt="menu" className='nav-menu' /> )  } </span>
         </div>
  </nav>
  )
}

export default Navbar