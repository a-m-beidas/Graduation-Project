'use strict';


const React = require('react'); // <1>
const ReactDOM = require('react-dom'); // <2>
const client = require('./client'); // <3>
import { Redirect } from 'react-router-dom'
import Scan from "./scan"
class App extends React.Component { // <1>



	render() { // <3>
		return (
			<Login/>
		)
	}
}

class Login extends React.Component{

	constructor(props) {
		super(props);
		this.state = {username: '', password: '', response: ''};
		this.onChangeUsername = this.onChangeUsername.bind(this);
    	this.onChangePassword = this.onChangePassword.bind(this);
    	this.login = this.login.bind(this);
	}

    login(event) {
		event.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"username": this.state.username, "password": this.state.password})
        };
        fetch('http://localhost:81/api/login', requestOptions)
            .then(function(response) {
                if (response.ok)
                    return response.text();
                else
                    throw response;
            })
            .then(token => {
                localStorage.setItem('bearer-token', token);
                this.setState({response: token});
            })
    }

	onChangeUsername(event) {
		this.setState({username: event.target.value});
	}

	onChangePassword(event) {
		this.setState({password: event.target.value});
	}

	render() {
	    if (localStorage.getItem('bearer-token')) {
	        return <Scan/>
	    }
		return (
			<div>
				<form onSubmit={this.login}>
					Username:<input onChange={this.onChangeUsername} type="text" name="username" value={this.state.username}/><br/>
					Password:<input onChange={this.onChangePassword} type="password" name="password" value={this.state.password}/><br/>
					<input type="submit" value="Login"/>
				</form>
				TODO: remove this later
				<div>{this.state.response}</div>
			</div>
		)
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('react')
)