import React, { useState } from 'react'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useFormFields } from '../../hooks';

// import { API_URL } from '../../config'
import Loader from '../../layout/Loader'

export default function Register(): JSX.Element {

const [validated, setValidated] = useState(false);
const { formFields, createChangeHandler, setValue } = useFormFields({
  firstName: "",
  lastName: "",
  dateOfBirth:"",
  username:"",
  password:"",
  password2:"",
  secretToken:"",
  address:"",
  city:"",
  state:"",
  zip:"",
  isLoading:false,
  isError:false,
  validated:false,
  message:""
}) 
  
  const handleSubmit = (event: any) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    setValue("validated",true);
    if(formFields.password !== formFields.password2)
    {
       setValue("isError",true);
       setValue("validated",false);
       setValue("message","Passwords do not match");
    }
    if (form.checkValidity() === true) {
      //Form is valid 
      setValue("isLoading",true);
     
    }
  
  };


  const maxDate = ()=>{
   return new Date().toISOString().split("T")[0];
  }
  const [videoFile, setVideoFile] = useState('')
  const [error, setError] = useState('success')
  const fileHandler = (e: any): void => {
    if (e.target.files[0]) {
      setVideoFile((curr) => (curr = e.target.files[0]))
    }
  }
  return (
    <Container className="mt-3 mb-3">
      <Row>
        <Col md="12">
          <h2 className="text-center">Register</h2>
        </Col>
      </Row>
      <Row>
        <Col md="12">
          {formFields.isError && <Alert data-testid="alert" variant="danger">{formFields.message}</Alert>}
        <Form noValidate validated={formFields.validated} onSubmit={handleSubmit}>
      <Form.Row>
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>First name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="First name"
            value={formFields.firstName}
            onChange={createChangeHandler("firstName")}
          />
          <Form.Control.Feedback type="invalid">
              Please enter a valid first name
            </Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Last name"
            value={formFields.lastName}
            onChange={createChangeHandler("lastName")}
          />
          <Form.Control.Feedback type="invalid">
              Please enter a valid last name
            </Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Date Of Birth</Form.Label>
          <Form.Control
            required
            type="date"
            placeholder="dd/mm/yyyy"
            max={maxDate()}
            value={formFields.dateOfBirth}
            onChange={createChangeHandler("dateOfBirth")}
          />
          <Form.Control.Feedback type="invalid">
              Please enter a valid date of birth
            </Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              required
              value={formFields.username}
              onChange={createChangeHandler("username")}
            />
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustomPassword1">
          <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              required
              value={formFields.password}
              onChange={createChangeHandler("password")}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a password.
            </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustomPassword2">
          <Form.Label>Re-enter Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Re-enter Password"
              required
              value={formFields.password2}
              onChange={createChangeHandler("password2")}
            />
            <Form.Control.Feedback type="invalid">
               Please re-enter your password.
            </Form.Control.Feedback>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} md="12" controlId="validationCustomPassword2">
          <Form.Label>Secret Token</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter a secret token that will be only with you to access your data"
              required
              value={formFields.secretToken}
              onChange={createChangeHandler("secretToken")}
            />
            <Form.Control.Feedback type="invalid">
               Please enter your secret token.
            </Form.Control.Feedback>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} md="12" controlId="validationAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" placeholder="Address" required 
            value={formFields.address}
            onChange={createChangeHandler("address")}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid address.
          </Form.Control.Feedback>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" placeholder="City" required 
            value={formFields.city}
            onChange={createChangeHandler("city")}
            />
          <Form.Control.Feedback type="invalid">
            Please provide a valid city.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom04">
          <Form.Label>State</Form.Label>
          <Form.Control type="text" placeholder="State" required 
            value={formFields.state}
            onChange={createChangeHandler("state")}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid state.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom05">
          <Form.Label>Zip</Form.Label>
          <Form.Control type="text" placeholder="Zip" required 
            value={formFields.zip}
            onChange={createChangeHandler("zip")}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid zip.
          </Form.Control.Feedback>
        </Form.Group>
      </Form.Row>
     {!formFields.isLoading ? <Button variant="primary" type="submit">
            Register
          </Button> : <Loader />}
    </Form>
        </Col>
      </Row>
    </Container>
  )
}
