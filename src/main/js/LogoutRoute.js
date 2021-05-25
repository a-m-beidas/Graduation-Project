import axios from 'axios';
import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => {

    const [isPending, setPending] = useState(true);
    const [isLoggedOut, setLoggedOut] = useState(false);

    function logout() {
        axios.head("/api/logout", {
                headers : { Authorization: "Bearer " + localStorage.getItem("bearer-token") }
            })
                .then(response => {
                    setLoggedOut(response.status == 200);
                    setPending(false);
                    localStorage.removeItem("bearer-token");
                    localStorage.removeItem("user")
                })
                .catch(error => { setLoggedOut(false); setPending(false) })
    }
    return (
        <Route {...rest} render={props => {logout();return(
            isPending ? "..." :
                isLoggedOut ?
                    <Redirect to="/" />
                    : <Redirect to="/error" />
        )}} />
    );
};

export default PrivateRoute;