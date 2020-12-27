import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'
import { LoginService } from '../../services/';
import Loader from '../../layout/Loader'
import { Store } from '../../Store'

export default function Login(): JSX.Element {
  const { state, dispatch } = useContext(Store);
  const [isLoading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const [isError, setError] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  
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
      if(username.length > 0 && password.length > 0)
      {
        const response = await LoginService(username,password);
        setLoading(false); 
        setUsername('');
        setPassword('');
        setValidated(false);
        if(response.error === true)
        {
          setError(true);
        }
        else
        {
          
          dispatch({
            type:'SET_TOKEN',
            payload: {
              token: response.token,
              username: username
            }
          });
          history.push('/dashboard');
          setError(false);

        }
      }
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
          {isError && <Alert data-testid="alert" variant="danger">Invalid username and password</Alert>}
       <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Row>
          <Form.Group as={Col} md="12" controlId="validationCustomUsername">
          <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
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
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
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
