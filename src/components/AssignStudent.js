import React from 'react'
import Button from 'react-bootstrap/Button';
import { Outlet ,useNavigate} from 'react-router-dom'
function AssignStudent() {
  let navigate = useNavigate()
  return (
    <div>
      <nav className='d-flex justify-content-center align-items-center'>
      <Button variant="success" className='mt-5' onClick={()=> navigate("/assign-student")}>Assign Student to Mentor</Button>
      <Button variant="success" className='ms-3 mt-5' onClick={()=> navigate("/assign-student/change-student")}>Change Mentor for a Student</Button>
      </nav>
      <Outlet />
      </div>
  )
}

export default AssignStudent