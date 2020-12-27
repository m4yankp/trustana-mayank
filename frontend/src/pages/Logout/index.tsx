import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap'

import { Store } from '../../Store'
export default function Logout(): JSX.Element {
    const { state, dispatch } = useContext(Store);
    const history = useHistory();
    dispatch({
            type:'LOGOUT',
          });
    history.push('/');
    return (
    <Container className="mt-3 mb-3">
      <Row>
        <Col md="12">
            <h2>Logging Out</h2>
        </Col>
    </Row>
    </Container>
    )
}