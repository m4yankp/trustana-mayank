import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

// import { API_URL } from '../../config'
// import Loader from '../../layout/Loader'

export default function Register(): JSX.Element {

const [validated, setValidated] = useState(false);
  
  const handleSubmit = (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const maxDate = ()=>{
   return new Date().toISOString().split("T")[0];
  }
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [videoFile, setVideoFile] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('success')
  const fileHandler = (e: any): void => {
    if (e.target.files[0]) {
      setVideoFile((curr) => (curr = e.target.files[0]))
    }
  }
  // const submitForm = async (e: any) => {
  //   e.preventDefault()
  //   if (title && description && videoFile) {
  //     setLoading((curr) => (curr = true))
  //     setError((curr) => (curr = 'success'))
  //     setMessage((curr) => (curr = ''))
  //     const formData = new FormData()
  //     formData.append('title', title)
  //     formData.append('description', description)
  //     formData.append('video', videoFile)
  //     try {
  //       await fetch(`${API_URL}/uploadVideo`, {
  //         method: 'POST',
  //         body: formData,
  //       })
  //         .then((response) => response.json())
  //         .then((data) => {
  //           setMessage((curr) => (curr = data.message))
  //           if (data.error) {
  //             setError((curr) => (curr = 'danger'))
  //           } else {
  //             setError((curr) => (curr = 'success'))
  //           }
  //           setLoading((curr) => (curr = false))
  //           resetForm()
  //         })
  //     } catch (err: any) {
  //       setLoading((curr) => (curr = false))
  //       setMessage((curr) => (curr = 'An error occurred'))
  //       resetForm()
  //     }
  //   } else {
  //     setMessage((curr) => (curr = 'Please complete the form, all fields are mandatory!'))
  //     setError((curr) => (curr = 'danger'))
  //   }
  // }
  // const resetForm = (): void => {
  //   setTitle('')
  //   setDescription('')
  //   setVideoFile('')
  // }
  return (
    <Container className="mt-3 mb-3">
      <Row>
        <Col md="12">
          <h2 className="text-center">Register</h2>
        </Col>
      </Row>
      <Row>
        <Col md="12">
          {/* {message && <Alert data-testid="alert" variant={error}>{message}</Alert>} */}
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Row>
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>First name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="First name"
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
              type="password"
              placeholder="Enter a secret token that will be only with you to access your data"
              required
            />
            <Form.Control.Feedback type="invalid">
               Please re-enter your password.
            </Form.Control.Feedback>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} md="12" controlId="validationAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" placeholder="Address" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid address.
          </Form.Control.Feedback>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" placeholder="City" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid city.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom04">
          <Form.Label>State</Form.Label>
          <Form.Control type="text" placeholder="State" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid state.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom05">
          <Form.Label>Zip</Form.Label>
          <Form.Control type="text" placeholder="Zip" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid zip.
          </Form.Control.Feedback>
        </Form.Group>
      </Form.Row>
      <Button type="submit">Register</Button>
    </Form>
        </Col>
      </Row>
    </Container>
  )
}
