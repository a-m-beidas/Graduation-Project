import React, { useState } from 'react';

const Register = () => {
	const [username, onChangeUsername] = useState("http://localhost/xss/index.php");
    const [password, onChangePassword] = useState([]);

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
                setResponse(token);
            })
    }
	return (
		<div>
			<form onSubmit={login}>
				Username:<input onChange={onChangeUsername} type="text" name="username" value={username}/><br/>
				Password:<input onChange={onChangePassword} type="password" name="password" value={password}/><br/>
				<input type="submit" value="Login"/>
			</form>
		</div>
	)
}

export default Register