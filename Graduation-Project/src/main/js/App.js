import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import PrivateRoute from './routes/PrivateRoute';
import LogoutRoute from './routes/LogoutRoute';
import Home from './urls/Home';
import LogIn from "./urls/LogIn";
import Register from "./urls/Register";
import Scan from "./urls/Scan";
import Report from "./urls/Report";
import Alert from './urls/Alert'
import Error from "./urls/Error";
import DashboardPath from './urls/DashboardPath';

const App = () => {

    const [isLoggedIn, setLogIn] = useState(localStorage.getItem("bearer-token") != undefined);
    return (
        <Router>
            <Navbar bg="light" expand="sm" className="px-4 justify-content-between" >
                <Navbar.Brand href="/">
                    <img src="images/logo.png"
                        height="30"
                        className="d-inline-block align-top px-2" />
                    Vulnerability Scanner
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav style={{ textAlign: "right" }}>
                        <Nav.Link href={isLoggedIn ? "/dashboard": "/"}>Home</Nav.Link>
                        <Nav.Link hidden={isLoggedIn} href="/login">Login</Nav.Link>
                        <Nav.Link hidden={isLoggedIn} href="/register">Register</Nav.Link>
                        <Nav.Link hidden={!isLoggedIn} href="/scan">Scan</Nav.Link>
                        <Nav.Link hidden={!isLoggedIn} href="/logout">Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            {/* <Container className="px-4" fluid> */}
            {/* <div style={{ marginTop: "10px" }}> */}
            <Switch>
                <Route component={isLoggedIn ? DashboardPath : Home} path="/" exact />
                <Route path="/login" exact render={(props) => (
                    <LogIn setLogIn={setLogIn} />
                )} />
                <Route component={Register} path="/register" />
                <Route component={Error} path="/error" />
                <PrivateRoute component={DashboardPath} path="/dashboard"/>
                <PrivateRoute component={Scan} path="/scan"/>
                <PrivateRoute component={Report} path="/report" />
                <PrivateRoute component={Report} path="/report:id" />
                <PrivateRoute component={Alert} path="/alert" />
                <LogoutRoute setLogIn={setLogIn} path="/logout" />
            </Switch>

            {/* </div> */}
            {/* </Container> */}

        </Router>
    )
}

export default App;