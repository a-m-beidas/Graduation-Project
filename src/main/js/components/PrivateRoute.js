import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function loggedIn() {
    const requestOptions = {
        method: 'HEAD'
    };
    fetch('http://localhost:81/api/check', requestOptions)
        .then(function(response) {
            if (response.ok)
                return response.text();
            else
                throw response;
        })
        .then(() => {
            return true
        })
        return false
}

const PrivateRoute = ({component: Component, ...rest}) => {
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            loggedIn() ?
                <Component {...props} />
            : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute;