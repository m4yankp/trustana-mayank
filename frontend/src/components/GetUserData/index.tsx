import React, { useState, useContext } from 'react';
import { Row, Col, Form, Button, Alert } from 'react-bootstrap'
import { LoggedInUserData } from '../../services';
import UserData from '../../components/userData';
import Loader from '../../layout/Loader';
import { Store } from '../../Store';


export default function GetUserData(): JSX.Element {
    const { state, dispatch } = useContext(Store);
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState(false);
    const [validated, setValidated] = useState(false);
    const [secretToken, setSecretToken] = useState('');
    const handleSubmit = async(event: any) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        setValidated(true);
        if (!form.checkValidity() === false) {
        setLoading(true);
        const response = await LoggedInUserData(state.loginToken, secretToken);
        setLoading(false);
        if(response.error)
        {
            setError(true);
        }
        else
        {
            dispatch({
            type: 'GET_USER_DATA',
            payload: response
            });
            setError(false);
            setSecretToken('');
            setValidated(false);
        }
        }
    
  };
 return ( 
    <Row>
        <Col md="12">    
        {state.firstName && <Row className="mt-4 mb-4">
        <Col md="12">
          <UserData />
        </Col>
      </Row> } 
      <Row>
        <Col md="12">
       <Form noValidate validated={validated} onSubmit={handleSubmit}>
         {isError && <Alert data-testid="alert" variant="danger">Invalid Secret Code</Alert>}
      <Form.Row>
          <Form.Group as={Col} md="12" controlId="validationCustomUsername">
          <Form.Label>Secret Code</Form.Label>
            <Form.Control
              type="text"
              value={secretToken}
              placeholder="Secret Token To Access Your Data"
              onChange={(e) => setSecretToken(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
             Please enter a valid secret token.
            </Form.Control.Feedback>
        </Form.Group>
        </Form.Row>
          {!isLoading ? <Button variant="primary" type="submit">
            Decrypt My Data
          </Button> : <Loader /> }
              </Form>
        </Col>
      </Row> 
      </Col>
    </Row> 

 );
}