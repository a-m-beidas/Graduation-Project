import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import PrivateRoute from './PrivateRoute';
import LogoutRoute from './LogoutRoute';
import Home from './components/Home';
import LogIn from "./components/LogIn";
import Register from "./components/Register";
import XSS from "./components/XSS";
import Scan from "./components/Scan";
import Error from "./components/Error";

const App = () => {

    const [isLoggedIn, setLogIn] = useState(localStorage.getItem("bearer-token") != undefined);
    return (
        <Router>
            <Navbar bg="light" expand="sm" className="d-flex justify-content-start px-4">
                <Navbar.Brand href="/">
                    <img src="/logo192.png"
                        height="30"
                        className="d-inline-block align-top px-2"
                        alt="React Bootstrap logo"/>
                    Demo App
                </Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link hidden={isLoggedIn} href="/login">Login</Nav.Link>
                    <Nav.Link hidden={isLoggedIn} href="/register">Register</Nav.Link>
                    <Nav.Link hidden={!isLoggedIn} href="/xss">XSS</Nav.Link>
                    <Nav.Link hidden={!isLoggedIn} href="/scan">Scan</Nav.Link>
                    <Nav.Link hidden={!isLoggedIn} href="/logout">Logout</Nav.Link>
                </Nav>
            </Navbar>
            <Container className="px-4" fluid>
                <Switch>
                    <Route component={Home} path="/" exact/>
                    <Route path="/login" exact render={(props) => (
                                    <LogIn setLogIn={setLogIn} />
                                )}/>
                    <Route component={Register} path="/register"/>
                    <Route component={Error} path="/error"/>
                    <PrivateRoute component={XSS} path="/scan"/>
                    <PrivateRoute component={Scan} path="/scan"/>
                    <LogoutRoute setLogIn={setLogIn} path="/logout"/>
                </Switch>
            </Container>

        </Router>
    )
}

export default App;