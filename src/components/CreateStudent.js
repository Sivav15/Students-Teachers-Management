import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { env } from '../config';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

function CreateStudent() {
  let navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      firstName:"",
      lastName:"",
      email: "",
      mobile:"",
      course: "",
    },
    validate: (values) => {
      const errors = {};

     
      if (values.firstName.length === 0) {
        errors.firstName = "Enter your FirstName";
      }
      if (values.lastName.length === 0) {
        errors.lastName = "Enter your LastName";
      }
      if (values.email.length === 0) {
        errors.email = "Enter your email address";
      } else if (values.email.search(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
        errors.email = "Please provide a valid email address";
      }
      if (values.mobile.length === 0) {
        errors.mobile = "Enter your Mobile Number";
      }
      if (values.course.length === 0) {
        errors.course = "Enter your Course";
      }

      return errors;
    },

    onSubmit: async (values) => {
      try {
        // formik.resetForm()
        let user = await axios.post(`${env.api}/create-student`, values);
        const { data } = user;
        const { message, statusCode } = data;
        if (statusCode === 201) {
          navigate("/")
          toast.success(message);
        } else {
            toast.warn(message);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className='main'>
      <Form   onSubmit={(values) => {
            formik.handleSubmit(values);
          }} className="form">
            <h2 className='text-center'>Create Student</h2>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom01" >
            <Form.Label>First name</Form.Label>
            <Form.Control
              className='shadow-none'
              type="text"
              placeholder="First name"
              value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="firstName"
            />
             {formik.touched.firstName && formik.errors.firstName ? (
              <div className="error"> {formik.errors.firstName}</div>
            ) : null}
           
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom02" >
            <Form.Label>Last name</Form.Label>
            <Form.Control
             className='shadow-none'
              type="text"
              placeholder="Last name"
              value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="lastName"
            />
             {formik.touched.lastName && formik.errors.lastName ? (
              <div className="error"> {formik.errors.lastName}</div>
            ) : null}
           
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="validationCustom03" >
            <Form.Label>Email</Form.Label>
            <Form.Control type="email"
            className='shadow-none'
             placeholder="Email" 
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="email"
            />
             {formik.touched.email && formik.errors.email ? (
              <div className="error"> {formik.errors.email}</div>
            ) : null}
        
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="validationCustom04">
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control type="tel"
             className='shadow-none'
            placeholder="Mobile Number" 
            value={formik.values.mobile}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="mobile"
            />
             {formik.touched.mobile && formik.errors.mobile ? (
              <div className="error"> {formik.errors.mobile}</div>
            ) : null}
         
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="validationCustom05">
            <Form.Label>Course</Form.Label>
            <Form.Select aria-label="Default select example"
             className='shadow-none'
            value={formik.values.course}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="course"
            >
              <option selected value="Default">Select your Course</option>
              <option value="Web Development">Web Development</option>
              <option value="Android Development">Android Development</option>
              <option value="Testing">Testing</option>
            </Form.Select>
            {formik.touched.course && formik.errors.course ? (
              <div className="error"> {formik.errors.course}</div>
            ) : null}
          </Form.Group>
        </Row>
        <Button type="submit" disabled={!formik.isValid}>Add Student</Button>
      </Form>
      <ToastContainer/>
    </div>
  );
}

export default CreateStudent;