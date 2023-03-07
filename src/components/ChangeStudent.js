import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { env } from '../config';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

function ChangeStudent() {
  let navigate = useNavigate()

  const [mentorData,setMentorData] = useState([]);
  const [studentData,setStudentData] = useState([]);
  const [mentor,setMentor] = useState("");
  const [student,setStudent] = useState("");
  

// console.log(mentorData);
// console.log(studentData);
  useEffect(() => {
    getMentor();
    getStudent();
}, []);

const getMentor = async () => {
  try {
    let value = await axios.get(`${env.api}/mentor`); 
    setMentorData(value.data.data);
  } catch (error) {
      console.log(error);
  }
};

const getStudent = async () => {
  try { 
    let value = await axios.get(`${env.api}/student`);  
    setStudentData(value.data.data);
  } catch (error) {
      console.log(error);
  }
};




const mentorChange = (e) => {
setMentor(e.target.value);
};

const studentChange = (e) => {
  setStudent(e.target.value);
};
const handleSubmit = async(e)=>{
  e.preventDefault();
  let value = {}
  if(mentor.length > 0){
    let data = mentorData.find((item)=>item._id === mentor)
        let v={
          id:data._id,
          firstName : data.firstName,
          lastName : data.lastName
         }
        value.mentor = v;
        
    if(student.length > 0){
      let data = studentData.find((item)=>item._id === student)
      let v={
        id:data._id,
        firstName : data.firstName,
        lastName : data.lastName
       }
      value.student = v;
      try {
        let user = await axios.put(`${env.api}/change-mentor`, value);
        const { data } = user;
        const { message, statusCode } = data;
        if (statusCode === 200) {
          toast.success(message);
          navigate("/dashboard")
        } else {
            toast.warn(message);
        }
      } catch (error) {
        console.log(error);
      }
    
    }else{
      toast.warn("Select at least one student");
    }
  }else{
    toast.warn("Select mentor");
  }
}
  return (
    <div className='main1'>
      <Form  className="form" onSubmit={handleSubmit}>
            <h4 className='text-center mb-4'>Change Mentor for a Student</h4>

         <div className='d-flex align-items-center justify-content-around'>
         <Form.Group  controlId="validationCustom01" >
            <Form.Label>Mentor</Form.Label>
            <Form.Select aria-label="Default select example"
             className='shadow-none'
             value={mentor}
             onChange={mentorChange}
            >
              <option  value="">Select Mentor </option>
              {
              mentorData.length > 0 && mentorData.map((item,index)=>{
                  return  <option value={item._id} key={index}>{item.firstName}</option>
                })
              }
            </Form.Select>
           
          </Form.Group>
          <Form.Group   controlId="validationCustom02"  className='ms-5'>
            <Form.Label>Student</Form.Label>
            <Form.Select aria-label="Default select example"
             className='shadow-none'
             value={student}
             onChange={studentChange}
            >
              <option  value="">Select Student </option>
              {/* mentorAssigned != "unassigned" */}
          {
              studentData.length > 0 && studentData.map((item,index)=>{
                console.log();
              return <>
                {
                  item.mentorAssigned !== "unAssigned" ? (<option value={item._id} key={index}>{item.firstName}</option>) : (null)
                  
                }
              </>
            })
              
            //   <div>{ item.mentorAssigned !== "unAssigned" ? (<option value={item._id} key={index}>{item.firstName}</option>) : (null) 
            // }</div>
            
          }


</Form.Select>
          </Form.Group>
         </div>

        <div className=' d-flex justify-content-center align-items-center mt-3'>
        <Button type="submit" > Change mentor</Button>
        </div>
      </Form>
      <ToastContainer/>
    </div>
  );
}

export default ChangeStudent;
