import React, { Component } from 'react'
import {Route} from "react-router-dom"
// import api from "./Components/Api/Api"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"

class Login extends Component {

    state = {}

    // Update state whenever an input field is edited
    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    handleLogin = (e) => {
        e.preventDefault()
        console.log("Working")
    }

    render(){
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
                </form>
        </React.Fragment>
        )
 
   }
}

export default Login