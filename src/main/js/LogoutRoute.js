import axios from 'axios';
import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';

const LogoutRoute = (props) => {
    const [isPending, setPending] = useState(true);
    const [isLoggedOut, setLoggedOut] = useState(false);
    const {setLogIn, ...rest} = props;
    function logout() {
        axios.head("/api/logout", {
                headers : { Authorization: "Bearer " + localStorage.getItem("bearer-token") }
            })
                .then(response => {
                    setLoggedOut(response.status == 200);
                    setPending(false);
                    localStorage.removeItem("bearer-token");
                    localStorage.removeItem("user");
                    setLogIn(false);
                    throw response;
                })
                .catch(error => {
                    setLoggedOut(true);
                    setPending(false);
                    localStorage.removeItem("bearer-token");
                    localStorage.removeItem("user");
                    setLogIn(false);
                })
    }
    return (
        <Route {...rest} render={props => {if (isPending && !isLoggedOut) logout();return(
            isPending ? "..." :
                isLoggedOut ?
                    <Redirect to="/" />
                    : <Redirect render={props => console.log("hello")} to="/error" />
        )}} />
    );
};

export default LogoutRoute;