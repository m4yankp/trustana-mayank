import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import UserData from '../../components/userData';
import Loader from '../../layout/Loader'
import { Store } from '../../Store'
import { API_URL } from '../../config'

export default function Dashboard(): JSX.Element {
  // const { state, dispatch } = useContext(Store)
  // const [isLoading, setLoading] = useState(false)
  const [validated, setValidated] = useState(false);
  const [validatedPublicForm, setValidatedPublicForm] = useState(false);
  
  const handleSubmit = (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  const handleSubmitPublicForm = (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidatedPublicForm(true);
  };

   return (
    <Container className="mt-3 mb-3">
      <Row>
        <Col md="12">
          <h2 className="text-center">Hello! USERNAME</h2>
        </Col>
      </Row>
      <Row>
        <Col md="12">
       <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Row>
          <Form.Group as={Col} md="12" controlId="validationCustomUsername">
          <Form.Label>Secret Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Secret Token To Access Your Data"
              required
            />
            <Form.Control.Feedback type="invalid">
             Please enter a valid secret token.
            </Form.Control.Feedback>
        </Form.Group>
        </Form.Row>
          <Button variant="primary" type="submit">
            Access My Data
          </Button>
              </Form>
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <p style={{marginTop:20, textAlign:'center',marginBottom:20}}>Or Enter details below to generate a public link</p>
        </Col>
      </Row>
       <Row>
        <Col md="12">
       <Form noValidate validated={validatedPublicForm} onSubmit={handleSubmitPublicForm}>
      <Form.Row>
          <Form.Group as={Col} md="12" controlId="validationCustomUsername">
          <Form.Label>Secret Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Secret Token To Access Your Data"
              required
            />
            <Form.Control.Feedback type="invalid">
             Please enter a valid secret token.
            </Form.Control.Feedback>
        </Form.Group>
         <Form.Group as={Col} md="12" controlId="validationCustomUsername">
          <Form.Label>Link expiry Time</Form.Label>
            <Form.Control
              type="text"
              placeholder="Time You Want your data to be available for with link that will be generated"
              required
            />
            <Form.Control.Feedback type="invalid">
             Please enter a valid secret token.
            </Form.Control.Feedback>
        </Form.Group>
        </Form.Row>
          <Button variant="primary" type="submit">
            Generate Public Link
          </Button>
              </Form>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md="12">
          <UserData userData={'as'} />
        </Col>
      </Row>
    </Container>
  )
}
