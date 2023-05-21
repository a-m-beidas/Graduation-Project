import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { LoginContext } from './contexts/LoginContext';
import { Navbar, Nav } from 'react-bootstrap';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import LogoutRoute from './routes/LogoutRoute';
import DashboardPath from './urls/DashboardPath';
import Home from './urls/Home';
import LogIn from "./urls/LogIn";
import Register from "./urls/Register";
import Scan from "./urls/Scan";
import Report from "./urls/Report";
import Alert from './urls/Alert'
import Error from "./urls/Error";



const App = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(localStorage.getItem('bearer-token') !== null);
    }, [isLoggedIn]);

    return (
        <Router>
            {/* <div style={{display:'flex'}}> */}
            <LoginContext.Provider value={[isLoggedIn, setIsLoggedIn]}>
                <Navbar bg="light" expand="sm" className="px-4 justify-content-between" >
                    <Navbar.Brand href="/">
                        <img src="images/logo.png"
                            height="30"
                            className="d-inline-block align-top px-2" />
                        Vulnerability Scanner
                    </Navbar.Brand>

                    {/* <Navbar.Toggle aria-controls="navbarScroll" /> */}
                    <Navbar.Collapse id="navbarScroll" className="navbar-left">
                                <Nav>
                                    <Nav.Link hidden={!isLoggedIn} href="/scan">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8 2C11.3 2 14 4.7 14 8C14 11.3 11.3 14 8 14C4.7 14 2 11.3 2 8C2 4.7 4.7 2 8 2ZM8 1C4.15 1 1 4.15 1 8C1 11.85 4.15 15 8 15C11.85 15 15 11.85 15 8C15 4.15 11.85 1 8 1Z" fill="black" />
                                            <path d="M12 7.5H8.5V4H7.5V7.5H4V8.5H7.5V12H8.5V8.5H12V7.5Z" fill="black" />
                                        </svg> Scan
                                    </Nav.Link>
                                    <Nav.Link hidden={isLoggedIn} href="/">Home</Nav.Link>
                                    <Nav.Link hidden={!isLoggedIn} href="/dashboard">Dashboard</Nav.Link>
                                    <Nav.Link hidden={isLoggedIn} href="/login">Login</Nav.Link>
                                    <Nav.Link hidden={isLoggedIn} href="/register">Register</Nav.Link>
                                    <Nav.Link hidden={!isLoggedIn} href="/logout">Logout</Nav.Link>
                                </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <Switch>
                    <PublicRoute    component={Home}                path="/" exact />
                    <PublicRoute    component={LogIn}               path="/login"/>
                    <PublicRoute    component={Register}            path="/register" />
                    <PublicRoute    component={Error}               path="/error" />
                    <PrivateRoute   component={DashboardPath}       path="/dashboard" />
                    <PrivateRoute   component={Scan}                path="/scan" />
                    <PrivateRoute   component={Report}              path="/report"/>
                    <PrivateRoute   component={Report}              path="/report:id" />
                    <PrivateRoute   component={Alert}               path="/alert" />
                    <LogoutRoute    path="/logout" />
                </Switch>

                {/* </div> */}
                {/* </Container> */}

            </LoginContext.Provider>

        </Router>
    )
}

export default App;