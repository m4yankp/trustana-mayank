import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import UserData from '../../components/userData'
import Loader from '../../layout/Loader'

export default function Public(video: any): JSX.Element {
  return (
    <Container className="mt-3 mb-3">
      <Row>
        <Col md="12">
          <UserData />
        </Col>
      </Row>
    </Container>
  )
}
