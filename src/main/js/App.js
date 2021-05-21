'use strict';


const React = require('react'); // <1>
const ReactDOM = require('react-dom'); // <2
import { BrowserRouter, Switch } from 'react-router-dom'
import Login from "./login"
import XSS from "./xss"
class App extends React.Component { // <1>


	render() { // <3>
		return (
			<BrowserRouter>
                <Switch>
                   <PublicRoute restricted={false} component={Home} path="/" exact />
                   <PublicRoute restricted={true} component={SignIn} path="/signin" exact />
                   <PrivateRoute component={Dashboard} path="/dashboard" exact />
               </Switch>
            </BrowserRouter>
		)
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('react')
)