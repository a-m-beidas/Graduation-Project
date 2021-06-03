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
                .then(response => {
                    if (response.status == 200) {
                        setLoggedIn(true);
                        setPending(false);
                    } else {
                        throw response;
                    }
                })
                .catch(error => { setLoggedIn(false); setPending(false) })
    }
    return (
        <Route {...rest} render={props => {if (isPending && !isLoggedIn) authorize();return(
            isPending ? "..." :
                isLoggedIn ?
                    <Component {...props} />
                    : <Redirect to={{
                        pathname: "/error",
                        state: { message: "Unauthorized" }
                      }} />
        )}} />
    );
};

export default PrivateRoute;