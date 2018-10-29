import React, { Component } from 'react'
import {Redirect} from "react-router-dom"
import api from "../Api/Api"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"

export default class Register extends Component {

    state = {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    }

    // Update state whenever an input field is edited
    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    render(){
        return (
            <React.Fragment>
                <h1>Register for Chattr</h1>
                <form>
                    <TextField
                        id="firstName"
                        label="firstName"
                        type="text"
                        name="firstName"
                        variant="outlined"
                        required
                        onChange={this.handleFieldChange}
                    />
                    <TextField
                        id="lastName"
                        label="lastName"
                        type="text"
                        name="lastName"
                        variant="outlined"
                        required
                        onChange={this.handleFieldChange}
                    />
                    <TextField
                        id="email"
                        label="email"
                        type="email"
                        name="email"
                        variant="outlined"
                        required
                        onChange={this.handleFieldChange}
                    />
                    <TextField
                        id="password"
                        label="password"
                        type="password"
                        name="password"
                        variant="outlined"
                        required
                        onChange={this.handleFieldChange}
                    />
                    <Button variant="contained" color="primary" id="registerButton" type="submit">Create Account</Button>
                </form>

            </React.Fragment>

        )
    }
}