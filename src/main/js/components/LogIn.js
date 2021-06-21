import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { Form, Button, Spinner } from "react-bootstrap";

const Login = (props) => {
	const [username, setUsername] = useState("");
    const [password, setPassword] = useState([]);
    const [status, setStatus] = useState('');
    const history = useHistory();
    const setLogIn = props.setLogIn;
	function login(event) {
		event.preventDefault();
        setStatus('p');
        const config = {
            headers: { 'Content-Type': 'application/json' }
        };
        const body = JSON.stringify({"username": username, "password": password})
        axios.post('/api/login', body, config)
            .then(response => {
                if (response.status === 200) {
                    setStatus('s');
                    const token = response.data;
                    localStorage.setItem('bearer-token', token);
                    setTimeout(() => {history.push("/"); setLogIn(true)}, 1000);
                } else
                    throw response;
            })
            .catch(error_response => {
                setStatus(error_response.data);
            });
    }

    const onChangeUsername = (event) => setUsername(event.target.value);

    const onChangePassword = (event) => setPassword(event.target.value);

	return (
		<div className="d-flex justify-content-start">
            <div className="sm-hidden  px-4">
                <img width="500" src="LogIn.png"/>
            </div>
            <div style={{width: "100%"}} className="d-flex flax-wrap justify-content-around flex-column">
                <Form onSubmit={login}>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control style={{width: "256px"}} onChange={onChangeUsername} type="text" name="username" value={username}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control style={{width: "256px"    }} onChange={onChangePassword} type="password" name="password" value={password}/>
                    </Form.Group>
                    <Button type="submit">Login</Button>
                    <div>{ status == 'p' || status == 's' ? 
                        <Spinner animation={status == 'p' ? "border": "grow"} /> : status}
                </div>
                </Form>
            </div>
        </div>
	)
}

export default Login