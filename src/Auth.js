import React from 'react';
import axios from 'axios';

class Auth extends React.Component {
	constructor() {
		super()
		this.state = {
			email: "",
			password: "",
			loggedIn: localStorage.getItem('userToken') || false
			//...
		}
	}

	handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value });
  }

  handleSubmit = (event) => {
  	event.preventDefault()
  	let credentials = {email: this.state.email, password: this.state.password}
  	console.log(credentials)
	 	axios.post("https://reqres.in/api/register", { credentials })
		  .then(res => {
		    if(res.token) {
		    	this.setState({loggedIn: res.token})
	    		localStorage.setItem("userToken", "09efe90fe90")
		    	localStorage.setItem(res.token)
		    }
		  }).catch( (error) => {
		    console.log(error);
		  }).finally( (res) => {
		  	// uncomment to pretend registration is successful
		  	let fakeToken = "09efe90fe90"
		    this.setState({loggedIn: fakeToken})
	    	localStorage.setItem("userToken", fakeToken)
		  });
	 }


	render() {
		let hidden = this.state.loggedIn ? "This is only visible if logged in." : null
		return (
	    <div className="App">
	    	<h1>This is visible to everyone!</h1>
	    	{hidden}

    	  <form onSubmit={this.handleSubmit}>
          <label>
            email:
            <input name="email" type="text" value={this.state.userName} onChange={this.handleChange} />
          </label>
          <label>
            password:
            <input name="password" type="text" value={this.state.password} onChange={this.handleChange} />
          </label>
          <button type="submit"> Submit </button>
        </form>
	    </div>
	  );
	}
 
}

export default Auth;
