import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { LoginService } from '../../services/';
import Loader from '../../layout/Loader'
import { Store } from '../../Store'

export default function Login(): JSX.Element {
  // const { state, dispatch } = useContext(Store)
  const [isLoading, setLoading] = useState(false)
  const [validated, setValidated] = useState(false);
  
  const handleSubmit = async(event: any) => {
    const form = event.currentTarget;
    setValidated(true);
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === false) {
      setLoading(false);
    }
   else{
      setLoading(true);
      const response = await LoginService("m4yank","password");
   }
  };
   return (
    <Container className="mt-3 mb-3">
      <Row>
        <Col md="12">
          <h2 className="text-center">Login</h2>
        </Col>
      </Row>
      <Row>
        <Col md="12">
       <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Row>
          <Form.Group as={Col} md="12" controlId="validationCustomUsername">
          <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              required
            />
            <Form.Control.Feedback type="invalid">
             Please enter a valid username.
            </Form.Control.Feedback>
        </Form.Group>
        </Form.Row>
        <Form.Row>
        <Form.Group as={Col} md="12" controlId="validationCustomPassword1">
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
        </Form.Row>
          {!isLoading ? <Button variant="primary" type="submit">
            Login
          </Button> : <Loader />}
              </Form>
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <p style={{marginTop:20}}>Or <Link to="/register">Click here to Register</Link></p>
        </Col>
      </Row>
    </Container>
  )
}
