import React, { Component } from 'react'
import {Redirect} from "react-router-dom"
import api from "../Api/Api"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"

class Login extends Component {

    state = {
        authenticated: false,
        register: false,
        username: "",
        password: ""
    }

    // Update state whenever an input field is edited
    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    handleLogin = (e) => {
        e.preventDefault()
        console.log("Working")
        api.userLogIn(this.state.username, this.state.password).then(token => sessionStorage.setItem("loginToken", token))
        .then(n => this.setState({authenticated: true}))
        
    }

    registerNewAccount = (e) => {
        e.preventDefault()
        this.setState({register: true})
    }

    render(){
        if (this.state.authenticated){
            return <Redirect to="/" />
        }
        else if (this.state.register) {
                return (
                    <Redirect to="/register" />
                )
        }
        else
        return(
            <React.Fragment>
                <form onSubmit={(e) => this.handleLogin(e)}>
                <TextField
                    id="username"
                    label="Email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    variant="outlined"
                    required
                    onChange={this.handleFieldChange}
                />
                <TextField
                    id="password"
                    label="Password"
                    type="password"
                    name="password"
                    variant="outlined"
                    required
                    onChange={this.handleFieldChange}
                />
                <Button variant="contained" color="primary" id="loginButton" type="submit">Login</Button>
                <Button variant="contained" color="secondary" id="registerButton" onClick={this.registerNewAccount}>New User?</Button>
                </form>
        </React.Fragment>
        )
 
   }
}

export default Login