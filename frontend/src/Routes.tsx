import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Public from './pages/Public';

export default function Routes() {
    return (
       <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/dashboard' component={Dashboard} />
          <Route exact path='/public/:token' component={Public} />
          <Route exact path='*' >
             <Container className="mt-3 mb-3">
                <Row>
                    <Col md={12}>
                        <h1>404 Page Not Found</h1>
                    </Col>
                </Row>
             </Container>
          </Route>
        </Switch>
      </BrowserRouter>
    )
}
