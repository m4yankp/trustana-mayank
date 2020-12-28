import React, { useContext } from 'react';
import { Row, Col, Form, Button, Alert } from 'react-bootstrap'
import * as dotenv from 'dotenv';
import { PublicToken } from '../../services';
import Loader from '../../layout/Loader';
import { useFormFields } from '../../hooks';
import { Store } from '../../Store';


export default function GeneratePublicToken(): JSX.Element {
  dotenv.config();
  const { state, dispatch } = useContext(Store);
   const { formFields, createChangeHandler, setValue } = useFormFields({
      isLoadingPublic: false,
      isErrorPublic: false,
      validatedPublicForm: false,
      secretTokenPublic: '',
      expiryTime:'',
      publicToken:''
    });


  const handleSubmitPublicForm = async(event: any) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    setValue("validatedPublicForm",true);
    if (!form.checkValidity() === false) {
      setValue("isLoadingPublic",true);      
      if(formFields.expiryTime.length > 0 && formFields.secretTokenPublic)
      {
        const response = await PublicToken(state.loginToken, formFields.secretTokenPublic, formFields.expiryTime);
          setValue("isLoadingPublic",false);   
        if(response.error)
        {
          setValue("isErrorPublic",true); 
        }
        else
        {
          setValue("validatedPublicForm",false);
          setValue("publicToken",response.token);
          setValue("secretTokenPublic",'');
          setValue("expiryTime",'');
        }
      }
      else
      {
        setValue("isLoadingPublic",false);
        setValue("isErrorPublic",false);
        setValue("validatedPublicForm",false);
      }
      
    }
  };
 return (
     <Row>
        <Col md="12">

     <Form noValidate validated={formFields.validatedPublicForm} onSubmit={handleSubmitPublicForm}>
         {formFields.isErrorPublic && <Alert data-testid="alert" variant="danger">Invalid Secret Code or expiry time</Alert>}
      <Form.Row>
          <Form.Group as={Col} md="12" controlId="validationCustomToken">
          <Form.Label>Secret Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Secret Token To Access Your Data"
              value={formFields.secretTokenPublic}
              onChange={createChangeHandler("secretTokenPublic")}
              required
            />
            <Form.Control.Feedback type="invalid">
             Please enter a valid secret token.
            </Form.Control.Feedback>
        </Form.Group>
         <Form.Group as={Col} md="12" controlId="validationCustomExpiryTime">
          <Form.Label>Link expiry Time</Form.Label>
            <Form.Control
              type="text"
              placeholder='Time should be a number of seconds or string representing a timespan eg: "1d", "20h"'
              value={formFields.expiryTime}
              onChange={createChangeHandler("expiryTime")}
              required
            />
            <Form.Control.Feedback type="invalid">
             Please enter a valid expiry time. It should be a number of seconds or string representing a timespan eg: "1d", "20h"
            </Form.Control.Feedback>
        </Form.Group>
        </Form.Row>
         {!formFields.isLoadingPublic ? <Button variant="primary" type="submit">
            Generate Public Link
          </Button> : <Loader /> }
          </Form>
          {formFields.publicToken && <Row>
            <Col md="12">
              <Form.Control
                className="mt-4"
                type="text" 
                value={`${process.env.REACT_APP_URL}/#/public/${formFields.publicToken}`}
                readOnly={true}
              />
            </Col>
          </Row>}
          
        </Col>
    </Row>
);
}