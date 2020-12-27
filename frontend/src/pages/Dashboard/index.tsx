import React, {useContext} from 'react';
import { Container, Row, Col} from 'react-bootstrap'
import GeneratePublicToken from '../../components/GeneratePublicToken';
import GetUserData from '../../components/GetUserData';
import { Store } from '../../Store'


export default function Dashboard(): JSX.Element {
   const { state, dispatch } = useContext(Store);
   return (
    <Container className="mt-3 mb-3">
      <Row>
        <Col md="12">
          <h2 className="text-center">Hello! {state.username}</h2>
        </Col>
      </Row>
      <GetUserData />
      <Row>
        <Col md="12">
          <p style={{marginTop:20, textAlign:'center',marginBottom:20}}>Or Enter details below to generate a public link</p>
        </Col>
      </Row>
       
      <GeneratePublicToken />
      
    </Container>
  )
}
