import React, { useContext } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Public from './pages/Public';
import Logout from './pages/Logout';
import { Store } from './Store';

export default function Routes() {
  const { state, dispatch } = useContext(Store);
    return (
       <HashRouter>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path='/register' component={Register} />
          {state.loginToken &&  <Route exact path='/dashboard' component={Dashboard} /> }
          <Route exact path='/logout' component={Logout} />
          <Route exact path='/public/:token' component={Public} />
          <Route path='*' >
             <Container className="mt-3 mb-3">
                <Row>
                    <Col md={12}>
                        <h1>404 Page Not Found</h1>
                    </Col>
                </Row>
             </Container>
          </Route>
        </Switch>
      </HashRouter>
    )
}
