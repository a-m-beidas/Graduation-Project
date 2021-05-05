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
        client({
            method: 'POST',
            path: '/api/login',
            entity: {"username": this.state.username, "password": this.state.password},
            headers: {'Content-Type': 'application/json'}})
            .done(response => {
                console.log(response);
        });



		// console.log(typeof(event))
		// var cache = []
		// console.log(JSON.stringify(event, (key, value) => {
		// 	if (typeof value === 'object' && value !== null) {
		// 	  // Duplicate reference found, discard key
		// 	  if (cache.includes(value)) return;

		// 	  // Store value in our collection
		// 	  cache.push(value);
		// 	}
		// 	return value;
		//   }))
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
					<input onClick={this.login} type="submit" value="Login"/>
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