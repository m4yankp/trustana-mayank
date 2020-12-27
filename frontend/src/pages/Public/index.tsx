import React from 'react'
import { Container, Row, Col, Table } from 'react-bootstrap'
import UserData from '../../components/userData'
import Loader from '../../layout/Loader'
import { API_URL } from '../../config'

export default function Public(video: any): JSX.Element {
  const vid = video.history.location.state
  return (
    <Container className="mt-3 mb-3">
      <Row>
        <Col md="12">
          <UserData userData={'as'} />
        </Col>
      </Row>
    </Container>
  )
}
