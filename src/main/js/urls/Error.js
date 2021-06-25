import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
const Error = (props) => {
	if (props.location.state != undefined)
		var message = props.location.state.message;
	return (
		<div className="form-app">
		    <Alert variant="danger">
                { message == undefined ? "General Error" : message }
            </Alert>
		</div>
	)
}

export default Error;