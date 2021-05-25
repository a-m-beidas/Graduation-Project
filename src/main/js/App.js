'use strict';

import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute'
import LogoutRoute from './LogoutRoute'
import Home from './components/Home';
import Login from "./components/Login";
import Register from "./components/Register";
import XSS from "./components/XSS";
import Error from "./components/Error"

const App = () => {
    return (
        <Router>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/scan">Scan</Link></li>
                <li><Link to="/logout">Logout</Link></li>
            </ul>
            <Route component={Home} path="/" exact />
            <Route component={Login} path="/login" exact />
            <Route component={Register} path="/register" exact />
            <Route component={Error} path="/error"/>
            <PrivateRoute component={XSS} path="/scan" exact />
            <LogoutRoute path="/logout" exact/>
        </Router>
    )
}

export default App;