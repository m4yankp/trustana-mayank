import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'
import { LoginService } from '../../services/';
import { useFormFields } from '../../hooks';
import Loader from '../../layout/Loader'
import { Store } from '../../Store'

export default function Login(): JSX.Element {
  const { state, dispatch } = useContext(Store);
  const { formFields, createChangeHandler, setValue } = useFormFields({
    username:'',
    password:'',
    isLoading:false,
    validated:false,
    isError:false
  });
  const history = useHistory();

  const handleSubmit = async(event: any) => {
    const form = event.currentTarget;
    setValue("isLoading",true);
    setValue("validated",true);
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === false) {
      setValue("isLoading",false);
    }
   else{
      formFields.isLoading = false;
      if(formFields.username.length > 0 && formFields.password.length > 0)
      {
        const response = await LoginService(formFields.username,formFields.password);
        setValue("isLoading",false);
        setValue("validated",false);
        if(response.error === true)
        {
          setValue("isError",true);
        }
        else
        {
          dispatch({
            type:'SET_TOKEN',
            payload: {
              token: response.token,
              username: formFields.username
            }
          });
          history.push('/dashboard');
          setValue("isError",false);
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
          {formFields.isError && <Alert data-testid="alert" variant="danger">Invalid username and password</Alert>}
       <Form noValidate validated={formFields.validated} onSubmit={handleSubmit} data-testid="loginForm">
      <Form.Row>
          <Form.Group as={Col} md="12" controlId="validationCustomUsername">
          <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              value={formFields.username}
              onChange={createChangeHandler("username")}
              required
              data-testid="username"
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
              value={formFields.password}
              onChange={createChangeHandler("password")}
              required
              data-testid="password"
            />
            <Form.Control.Feedback type="invalid">
              Please enter a password.
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
          {!formFields.isLoading ? <Button variant="primary" type="submit" data-testid="submitBtn">
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
