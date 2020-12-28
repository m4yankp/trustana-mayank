import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { IUserData } from "../../Interfaces";
import { useParams } from 'react-router-dom';
import UserTable from '../../components/userTable'
import { GetPublicData } from '../../services';
import Loader from '../../layout/Loader'

export default function Public():JSX.Element {
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [state, setState] = useState<IUserData>({
    firstName:"",
    lastName:"",
    dateOfBirth:"",
    address:"",
    filePath:"",
    dateCreated:""
  })
  const [isError, setError] = useState(false);
  const {token} = useParams<{token:string}>();

  useEffect(()=>{
    state.firstName === "" && loadData()   
  },[ state ])

  const loadData = async() =>{
    setLoading(true);
    const response = await GetPublicData(token);
    
    if(response.error)
    {
      setMessage(response.message);
      setError(true);
      setLoading(false);
    }
    else
    {
      setLoading(false);
      setState({firstName: response.firstName, lastName: response.lastName,dateOfBirth: response.dateOfBirth,address: response.address, filePath: response.filePath, dateCreated: response.dateCreated});
    }
  }
  return (
    <Container className="mt-3 mb-3">
      <Row>
        <Col md="12">
          {isError && <Alert data-testid="alert" variant="danger">{message}</Alert> }
          {isLoading ? <Loader /> : <UserTable state={state} />}
        </Col>
      </Row>
    </Container>
  )
}
