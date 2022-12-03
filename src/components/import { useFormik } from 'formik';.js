import { useFormik } from 'formik';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function AssignStudent() {

  const formik = useFormik({
    initialValues: {
      mentor:"",
      student:"",

    },
    validate: (values) => {
      const errors = {};

      if (values.mentor.length === 0) {
        errors.mentor = "Enter your FirstName";
      }
      if (values.student.length === 0) {
        errors.student = "Enter your LastName";
      }

    },
    onSubmit: async (values) => {
      try {
        formik.resetForm()
       console.log(values);
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
            <h2 className='text-center'>Create Mentor</h2>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom01" >
            <Form.Label>Mentor</Form.Label>
            <Form.Select aria-label="Default select example"
             className='shadow-none'
            value={formik.values.mentor}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="mentor"
            >
              <option selected value="Default">Select Mentor </option>
              <option value="Web Development">Web Development</option>
              <option value="Android Development">Android Development</option>
              <option value="Testing">Testing</option>
            </Form.Select>
            {formik.touched.mentor && formik.errors.mentor ? (
              <div className="error"> {formik.errors.mentor}</div>
            ) : null}
           
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom02" >
            <Form.Label>Student</Form.Label>
            {/* <Form.Select aria-label="Default select example"
             className='shadow-none'
            value={formik.values.student}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="student"
            >
              <option selected value="Default">Select student</option>
              <option value="Web Development">Web Development</option>
              <option value="Android Development">Android Development</option>
              <option value="Testing">Testing</option>
            </Form.Select> */}

<Form.Check
            type={"checkbox"}
             label={"Android Development"}
             className='shadow-none'
             value={formik.values.student}
             onChange={(e)=> {formik.handleChange(e);console.log(e)}}
             onBlur={formik.handleBlur}
             name="student"
          />

            {formik.touched.student && formik.errors.student ? (
              <div className="error"> {formik.errors.student}</div>
            ) : null}
           
          </Form.Group>
        </Row>
        <div className=' d-flex justify-content-center align-items-center'>
        <Button type="submit" disabled={!formik.isValid}> Assign Student</Button>
        </div>
      </Form>
    </div>
  );
}

export default AssignStudent;