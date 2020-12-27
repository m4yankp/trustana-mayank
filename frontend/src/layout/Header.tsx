import React, { useContext } from 'react'
import { Navbar, Image, Nav } from 'react-bootstrap'
import { Store } from '../Store';

export default function Header(): JSX.Element {
  const { state, dispatch } = useContext(Store);
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">
        <Image src={'/trustana-logo.png'} height={24} className="p5" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
       {!state.loginToken ? <Nav className="ml-auto">
          <Nav.Link href="/register">Register</Nav.Link>
          <Nav.Link href="/">Login</Nav.Link> 
        </Nav> : 
        <Nav className="ml-auto">
        <Nav.Link href="/logout">Logout</Nav.Link> 
        </Nav>}
      </Navbar.Collapse>
    </Navbar>
  )
}
