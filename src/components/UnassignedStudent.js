import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import { env } from '../config';
import Loading from './loading/Loading'


function UnassignedStudent() {
  const [studentData, setStudentData] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    getStudent();
  }, []);


  const getStudent = async () => {
    try {
      setLoading(true);
      let value = await axios.get(`${env.api}/unAssigned-student`);
      setStudentData(value.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div>

      <div className='table'>
        <h3 className='text-center'> Unassigned Student</h3>
        {
          loading ? <div className='d-flex justify-content-center align-items-center'> <Loading width={"3.4rem"} /> </div> :
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
  studentData.length === 0 && studentData ? <tr className='text-danger'>No unassigned student</tr> :
  studentData.length > 0 && studentData.map((item, index) => {
    return <tr>
      <td>{index + 1}</td>
      <td>{item.firstName} {item.lastName}</td>
      <td>{item.email}</td>
      <td>{item.mobile}</td>
    </tr>
  })
}
              </tbody>
            </Table>
        }
      </div>

    </div>
  )
}

export default UnassignedStudent