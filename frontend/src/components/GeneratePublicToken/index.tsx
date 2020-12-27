import React, { useState, useContext } from 'react';
import { Row, Col, Form, Button, Alert } from 'react-bootstrap'
import { PublicToken } from '../../services';
import Loader from '../../layout/Loader'
import { Store } from '../../Store';


export default function GeneratePublicToken(): JSX.Element {
  const { state, dispatch } = useContext(Store);
  const [secretTokenPublic, setSecretTokenPublic] = useState('');
  const [expiryTime, setExpiryTime] = useState('');
  const [isLoadingPublic, setLoadingPublic] = useState(false);
  const [isErrorPublic, setErrorPublic] = useState(false);
  const [validatedPublicForm, setValidatedPublicForm] = useState(false);
  const [publicToken, setPublicToken] = useState('');

  const handleSubmitPublicForm = async(event: any) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    setValidatedPublicForm(true);
    if (!form.checkValidity() === false) {
      setLoadingPublic(true);
      const response = await PublicToken(state.loginToken, secretTokenPublic, expiryTime);
      setLoadingPublic(false);
      if(response.error)
      {
        setErrorPublic(true);
      }
      else
      {
        setPublicToken(response.token);
        setErrorPublic(false);
        setSecretTokenPublic('');
        setExpiryTime('');
        setValidatedPublicForm(false);
      }
    }
  };
 return (
     <Row>
        <Col md="12">

     <Form noValidate validated={validatedPublicForm} onSubmit={handleSubmitPublicForm}>
         {isErrorPublic && <Alert data-testid="alert" variant="danger">Invalid Secret Code</Alert>}
      <Form.Row>
          <Form.Group as={Col} md="12" controlId="validationCustomUsername">
          <Form.Label>Secret Code</Form.Label>
            <Form.Control
              type="text"
              value={secretTokenPublic}
              placeholder="Secret Token To Access Your Data"
              onChange={(e) => setSecretTokenPublic(e.target.value)}
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
              value={expiryTime}
              placeholder="Time You Want your data to be available for with link that will be generated"
              onChange={(e)=> setExpiryTime(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
             Please enter a valid expiry time.
            </Form.Control.Feedback>
        </Form.Group>
        </Form.Row>
         {!isLoadingPublic ? <Button variant="primary" type="submit">
            Generate Public Link
          </Button> : <Loader /> }
          </Form>
          {publicToken && <Row>
            <Col md="12">
              <Form.Control
                className="mt-4"
                type="text" 
                value={`http://localhost:3000/public/${publicToken}`}
                readOnly={true}
              />
            </Col>
          </Row>}
          
        </Col>
    </Row>
);
}