import React from 'react'
import Button from 'react-bootstrap/Button';
import { Outlet ,useNavigate} from 'react-router-dom'
function DashBoard() {
    let navigate = useNavigate()
  return (
    <div>
    <nav className='d-flex justify-content-center align-items-center'>
    <Button variant="success" className='mt-5' onClick={()=> navigate("/")}>Student Details</Button>
    <Button variant="success" className='ms-3 mt-5' onClick={()=> navigate("/mentor-details")}>Mentor Details</Button>
    <Button variant="success" className=' ms-3 mt-5' onClick={()=> navigate("/unassigned-student")}>Unassigned Student</Button>
    </nav>
    <Outlet />
    </div>
  )
}

export default DashBoard