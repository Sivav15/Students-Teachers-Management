import { useFormik } from 'formik';
import React,{useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { env } from '../config';
import axios from 'axios';

function EditMentorModel(props) {
  console.log(props.data.firstName);

  useEffect(() => {
   formik.setValues({
    firstName:props.data.firstName,
        lastName:props.data.lastName,
        email: props.data.email,
        mobile:props.data.mobile,
      })
  }, [props.data])

  useEffect(() => {
    formik.setValues({
     firstName:props.data.firstName,
         lastName:props.data.lastName,
         email: props.data.email,
         mobile:props.data.mobile,
       })
   }, [])


  
    const formik = useFormik({
        initialValues: {
          firstName:props.data.firstName,
          lastName:"",
          email: "",
          mobile:"",
        
        },
        validate: (values) => {
          const errors = {};
    
         
          // if (values.firstName.length === 0) {
          //   errors.firstName = "Enter your FirstName";
          // }
          // if (values.lastName.length === 0) {
          //   errors.lastName = "Enter your LastName";
          // }
          // if (values.email.length === 0) {
          //   errors.email = "Enter your email address";
          // } else if (values.email.search(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
          //   errors.email = "Please provide a valid email address";
          // }
          // if (values.mobile.length === 0) {
          //   errors.mobile = "Enter your Mobile Number";
          // }
    
          return errors;
        },
    
        onSubmit: async (values) => {
          try {
            values._id = props.data._id
            let user = await axios.put(`${env.api}/edit-mentor`, values);
            const { data } = user;
            const { message, statusCode } = data;
            if (statusCode === 200) {
              props.update()
              toast.success(message);
              props.onHide(false)
            } else {
                toast.warn(message);
            }
          } catch (error) {
            console.log(error);
          }
        },
      });
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
      <div className='mains'>
      <Form   onSubmit={(values) => {
            formik.handleSubmit(values);
          }} className="forms">
            <h2 className='text-center'>Edit Mentor</h2>
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
       
        
       <div className='d-flex justify-content-end align-items-center'>
       <Button type="submit" disabled={!formik.isValid}>Update Mentor</Button>
        <Button onClick={props.onHide} className = "ms-3">Close</Button>
       </div>
     
      </Form>
      <ToastContainer/>
    </div>
      </Modal.Body>
    </Modal>
  );
}


export default EditMentorModel










