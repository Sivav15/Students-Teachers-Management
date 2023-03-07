import React, { useEffect, useState } from 'react'
import { NavLink, Outlet ,useNavigate} from 'react-router-dom'
function DashBoard() {
    let [change,setChange] = useState(true);
    const navLinkStyle = { color: ' white' , backgroundColor : "green", padding : "7px" ,  borderRadius : "4px"}
  return (
    <div>
    <nav className='d-flex justify-content-center align-items-center'>
    <NavLink style={change ? ({ isActive }) => isActive ? navLinkStyle : null : null} onClick={()=>setChange(true)}  className='mt-5' to = "/dashboard">Student Details</NavLink>
    <NavLink style={({ isActive }) => isActive ? navLinkStyle : null} onClick={()=>setChange(false)}  className='ms-3 mt-5'  to ="/dashboard/mentor-details">Mentor Details</NavLink>
    <NavLink  style={({ isActive }) => isActive ? navLinkStyle : null} onClick={()=>setChange(false)} className=' ms-3 mt-5'to="/dashboard/unassigned-student">Unassigned Student</NavLink>
    </nav>
    <Outlet />
    </div>
  )
}

export default DashBoard