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

class Login extends Component {

    state = {
        open: false,
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

    handleClose = () => {
        this.setState({open: false})
    }

    handleLogin = (e) => {
        e.preventDefault()
        console.log("Working")
        api.userLogIn(this.state.username, this.state.password).then(token => {
            if(token !== "invalid"){
                sessionStorage.setItem("loginToken", token)
                this.setState({authenticated: true})
            }
            else {
                this.setState({
                    open: true,
                    username: "",
                    password: ""
                })
            }
        })
        
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
                    value={this.state.username}
                    autoFocus
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
                <Button variant="contained" color="primary" id="loginButton" type="submit">Login</Button>
                <Button variant="contained" color="secondary" id="registerButton" onClick={this.registerNewAccount}>New User?</Button>
                </form>

                {/* <-----------------Alert Dialog if login incorrect --------------------------------------------->*/}
                <Dialog 
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                    <DialogTitle id="alert-dialog-title">{"Incorrect Login"}</DialogTitle>
                         <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                I'm sorry, the login information is incorrect. Please try again.
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
}

export default Login