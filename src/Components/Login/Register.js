import React, { Component } from 'react'
import {Redirect} from "react-router-dom"
import api from "../Api/Api"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class Register extends Component {

    state = {
        redirect: false,
        alreadyRegistered: false,
        open: false,
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

    handleClose = () => {
        this.setState({open: false})
    }

    registerUser = (e) => {
        e.preventDefault()
        api.userRegister(this.state.email, this.state.password, this.state.firstName, this.state.lastName)
        .then(res => {
            console.log(res)
            if (res === "registered"){
                this.setState({
                    open: true,
                    firstName: "",
                    lastName: "",
                    password: "",
                    email: ""
                })
            }
            else {
                sessionStorage.setItem("loginToken", res)
                this.setState({redirect: true})
            }
        })
    }

    render(){
        if (!this.state.redirect){
            return (
                <React.Fragment>
                    <h1>Register for Chattr</h1>
                    <form onSubmit={this.registerUser}>
                        <TextField
                            id="firstName"
                            label="First Name"
                            type="text"
                            name="firstName"
                            variant="outlined"
                            value={this.state.firstName}
                            autoFocus
                            required
                            onChange={this.handleFieldChange}
                        />
                        <TextField
                            id="lastName"
                            label="Last Name"
                            type="text"
                            name="lastName"
                            variant="outlined"
                            value={this.state.lastName}
                            required
                            onChange={this.handleFieldChange}
                        />
                        <TextField
                            id="email"
                            label="Email"
                            type="email"
                            name="email"
                            variant="outlined"
                            value={this.state.email}
                            required
                            onChange={this.handleFieldChange}
                        />
                        <TextField
                            id="password"
                            label="Password"
                            type="password"
                            name="password"
                            variant="outlined"
                            value={this.state.password}
                            required
                            onChange={this.handleFieldChange}
                        />
                        <Button variant="contained" color="primary" id="registerButton" type="submit">Create Account</Button>
                    </form>
                    
                    {/* <-----------------Alert Dialog if user is already registered --------------------------------------------->*/}
                    <Dialog 
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                    <DialogTitle id="alert-dialog-title">{"User Exists"}</DialogTitle>
                         <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                I'm sorry, that email address is already registered
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                            Close
                            </Button>
                        </DialogActions>
                    </Dialog>

                </React.Fragment>

            )
        }
        else {
            return <Redirect to="/" />
        }
    }
}