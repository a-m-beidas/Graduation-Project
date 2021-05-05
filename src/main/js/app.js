'use strict';


const React = require('react'); // <1>
const ReactDOM = require('react-dom'); // <2>
const client = require('./client'); // <3>


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
                return response.text();
            })
            .then(data => this.setState({response: data}))
    }

	onChangeUsername(event) {
		this.setState({username: event.target.value});
	}

	onChangePassword(event) {
		this.setState({password: event.target.value});
	}

	render() {
		return (
			<div>
				<form onSubmit={this.login}>
					Username:<input onChange={this.onChangeUsername} type="text" name="username" value={this.state.username}/><br/>
					Password:<input onChange={this.onChangePassword} type="password" name="password" value={this.state.password}/><br/>
					<input type="submit" value="Login"/>
				</form>
				<br/>
				<div>{this.state.response}</div>
			</div>
		)
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('react')
)