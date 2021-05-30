import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import PrivateRoute from './PrivateRoute'
import LogoutRoute from './LogoutRoute'
import Home from './components/Home';
import LogIn from "./components/LogIn";
import Register from "./components/Register";
import XSS from "./components/XSS";
import Error from "./components/Error"

const App = () => {

    const [isLoggedIn, setLogIn] = useState(localStorage.getItem("bearer-token") != undefined);
    return (
        <Router>
            <Navbar bg="light">
                <Navbar.Brand href="/">
                    <img src="/logo192.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"/>
                    Home
                </Navbar.Brand>
                <Nav>
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link hidden={isLoggedIn} href="/login">Login</Nav.Link>
                    <Nav.Link hidden={isLoggedIn} href="/register">Register</Nav.Link>
                    <Nav.Link hidden={!isLoggedIn} href="/scan">Scan</Nav.Link>
                    <Nav.Link hidden={!isLoggedIn} href="/logout">Logout</Nav.Link>
                </Nav>
            </Navbar>
            <Route component={Home} path="/" exact />
            <Route path="/login" exact render={(props) => (
                            <LogIn setLogIn={setLogIn} />
                        )}/>
            <Route component={Register} path="/register" exact />
            <Route component={Error} path="/error"/>
            <PrivateRoute component={XSS} path="/scan" exact />
            <LogoutRoute setLogIn={setLogIn} path="/logout" exact/>
        </Router>
    )
}

export default App;