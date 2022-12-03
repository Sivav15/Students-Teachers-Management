import axios from 'axios';
import React,{ useEffect,useState} from 'react'
import Table from 'react-bootstrap/Table';
import { env } from '../config';

function UnassignedStudent() {
  const [studentData,setStudentData] = useState([]);
  


  useEffect(() => {
    getStudent();
}, []);


  const getStudent = async () => {
    try { 
      let value = await axios.get(`${env.api}/unAssigned-student`);  
      setStudentData(value.data.data);
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <div>

    <div className='table'>
    <h3 className='text-center'> Unassigned Student</h3>
    <Table striped bordered hover>
    <thead>
      <tr>
      <th>#</th>
          <th> Name</th>
          <th>Email</th>
          <th>Mobile</th>
      </tr>
    </thead>
    <tbody>
    {
        studentData.length > 0  && studentData.map((item,index)=>{
          return  <tr>
          <td>{index + 1}</td>
          <td>{item.firstName} {item.lastName}</td>
          <td>{item.email}</td>
          <td>{item.mobile}</td>
        </tr>
         })
     }

    </tbody>
  </Table>
    </div>

  </div>
  )
}

export default UnassignedStudent