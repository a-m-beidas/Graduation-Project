import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import jwt from "jwt-decode";

const Login = () => {
	const [username, setUsername] = useState("");
    const [password, setPassword] = useState([]);
    const [message, setMessage] = useState("");
    const history = useHistory();

	function login(event) {
		event.preventDefault();
        setMessage("Logging In...");
        const config = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        };
        const body = JSON.stringify({"username": username, "password": password})
        axios.post('/api/login', body, config)
            .then(response => {
                if (response.status == 200) {
                    setMessage("Successful login! Redirecting..");
                    const token = response.data;
                    const user = jwt(token);
                    localStorage.setItem("user", JSON.stringify(user));
                    localStorage.setItem('bearer-token', token);
                    setTimeout(() => {history.push("/")}, 1000);
                } else
                    throw response; 
            })
            .catch(error_response => {
                setMessage(error_response.data);
            });
    }

    const onChangeUsername = (event) => setUsername(event.target.value);

    const onChangePassword = (event) => setPassword(event.target.value);
    
	return (
		<div>
			<form onSubmit={login}>
				Username:<input onChange={onChangeUsername} type="text" name="username" value={username}/><br/>
				Password:<input onChange={onChangePassword} type="password" name="password" value={password}/><br/>
				<input type="submit" value="Login"/>
			</form>
            <div>{ message }</div>
		</div>
	)
}

export default Login