import React, { useContext } from 'react';
import { Row, Col, Form, Button, Alert } from 'react-bootstrap'
import { LoggedInUserData } from '../../services';
import UserData from '../../components/userData';
import { useFormFields } from '../../hooks';
import Loader from '../../layout/Loader';
import { Store } from '../../Store';


export default function GetUserData(): JSX.Element {
    const { state, dispatch } = useContext(Store);
    const { formFields, createChangeHandler, setValue } = useFormFields({
      isLoading: false,
      isError: false,
      validated: false,
      secretToken: ''
    });
   
    const handleSubmit = async(event: any) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        setValue("validated",true);
        if (!form.checkValidity() === false) {
        setValue("isLoading",true);
        const response = await LoggedInUserData(state.loginToken, formFields.secretToken);
        setValue("isLoading",false);
        if(response.error)
        {
            setValue("isError",true);
        }
        else
        {
            dispatch({
            type: 'GET_USER_DATA',
            payload: response
            });
            setValue("validated",false);
            setValue("secretToken","");
            setValue("isError",false);
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
       <Form noValidate validated={formFields.validated} onSubmit={handleSubmit}>
         {formFields.isError && <Alert data-testid="alert" variant="danger">Invalid Secret Code</Alert>}
      <Form.Row>
          <Form.Group as={Col} md="12" controlId="validationCustomUsername">
          <Form.Label>Secret Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Secret Token To Access Your Data"
              value={formFields.secretToken}
              onChange={createChangeHandler("secretToken")}
              required
            />
            <Form.Control.Feedback type="invalid">
             Please enter a valid secret token.
            </Form.Control.Feedback>
        </Form.Group>
        </Form.Row>
          {!formFields.isLoading ? <Button variant="primary" type="submit">
            Decrypt My Data
          </Button> : <Loader /> }
              </Form>
        </Col>
      </Row> 
      </Col>
    </Row> 

 );
}