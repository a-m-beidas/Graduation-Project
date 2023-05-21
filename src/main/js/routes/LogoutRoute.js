import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { LoginContext } from '../contexts/LoginContext';

const LogoutRoute = (props) => {
    const [isPending, setPending] = useState(true);
    const [isLoggedOut, setLoggedOut] = useState(false);
    const [isLoggedIn, setLogIn] = useContext(LoginContext);
    const {...rest} = props;

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
        <Route {...rest} render={props => {
            if (isPending && !isLoggedOut)
                logout();
            return(
                isPending ? "..." :
                    isLoggedOut ?
                        <Redirect to="/" />
                        : <Redirect to={{
                            pathname: "/error",
                            state: { message: "Unauthorized" }
                        }} />
            )}} />
    );
};

export default LogoutRoute;