import axios from 'axios';
import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => {

    const [isPending, setPending] = useState(true);
    const [isLoggedIn, setLoggedIn] = useState(false);

    function authorize() {
        axios.head("/api/check", {
                headers : { Authorization: "Bearer " + localStorage.getItem("bearer-token") }
            })
                .then(response => { setLoggedIn(response.status == 200); setPending(false) })
                .catch(error => { setLoggedIn(false); setPending(false) })
    }
    return (
        <Route {...rest} render={props => {authorize();return(
            isPending ? "..." :
                isLoggedIn ?
                    <Component {...props} />
                    : <Redirect to="/error" />
        )}} />
    );
};

export default PrivateRoute;