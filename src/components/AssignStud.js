import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { env } from '../config';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

function AssignStud() {

  let navigate = useNavigate()

  const [mentorData,setMentorData] = useState([]);
  const [studentData,setStudentData] = useState([]);
  const [mentor,setMentor] = useState("");
  const [student,setStudent] = useState([]);
  

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

const studentChange = (e,index,id,firstName,lastName) => {
  let checked = e.target.checked
  if(checked){  
    let data = {
      id,
      firstName,
      lastName
    }
    setStudent([...student,data]);
  }else{ 
    let data = [...student]
    data.splice(index, 1);
    setStudent(data);
  }
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
      value.student = student;
      try {
        let user = await axios.put(`${env.api}/assign-student`, value);
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
// console.log(Object.keys(studentData.mentorAssigned).length);

  return (
    <div className='main1'>
      <Form  className="form" onSubmit={handleSubmit}>
            <h4 className='text-center mb-4'>Assign Student to Mentor</h4>

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
            {/* studentData.mentorAssigned === null */}

{
   studentData.length > 0 && studentData.map((item,index)=>{
    return <>{item.mentorAssigned === "unAssigned" ? ( <Form.Check
      key={index}
      type={"checkbox"}
       label={item.firstName}
       className='shadow-none'
       onChange={(e)=> studentChange(e,index,item._id,item.firstName,item.lastName,item.mentorAssigned)}
  
    />) : (null)}</>
     
    
  })
}


           
          </Form.Group>
         </div>

        <div className=' d-flex justify-content-center align-items-center mt-3'>
        <Button type="submit" > Assign Student</Button>
        </div>
      </Form>
      <ToastContainer/>
    </div>
  );
}

export default AssignStud;
