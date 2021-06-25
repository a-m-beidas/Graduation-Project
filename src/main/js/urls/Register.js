import React, { useState } from 'react';

import { Form, Button } from "react-bootstrap";

const Register = () => {
	const [username, setUsername] = useState("");
    const [password, setPassword] = useState([]);

	function register(event) {
		event.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"username": username, "password": password})
        };
        fetch('http://localhost:81/api/register', requestOptions)
            .then(function(response) {
                if (response.ok)
                    return response.text();
                else
                    throw response;
            })
            .then(token => {
                localStorage.setItem('bearer-token', token);
            })
    }

    const onChangeUsername = (event) => setUsername(event.target.value);

    const onChangePassword = (event) => setPassword(event.target.value);

	return (
		<div className="form-app">
			<Form onSubmit={register}>
				<Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control onChange={onChangeUsername} type="text" name="username" value={username}/>
                </Form.Group>
				<Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={onChangePassword} type="password" name="password" value={password}/>
                </Form.Group>
				<Button type="submit">Register</Button>
			</Form>
		</div>
	)
}

export default Register