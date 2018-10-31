import React, { Component } from 'react'
import {Redirect} from "react-router-dom"
import api from "../Api/Api"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import 'typeface-roboto';

export default class UserSettings extends Component {

    state = {
        redirect: false,
        open: false,
        firstName: "",
        lastName: "",
        newPassword1: "",
        newPassword2: "",
        oldPassword: "",
        user: {},
    }

    componentDidMount = () => {
        const userToken = sessionStorage.getItem("loginToken")
        api.userDetails(userToken).then(res => this.setState({user: res}))
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

    changePassword = () => {
        if (this.state.oldPassword !== this.state.user.password) {
            alert("password incorrect")
        }
        else if (this.state.newPassword1 !== this.state.newPassword2){
            alert("New passwords do not match")
        }
        else {

        }
    }

    submitChanges = () => {
        const userToken = sessionStorage.getItem("loginToken")
        let changedPassword = ""
        // if (this.state.newPassword1 !== "" || this.state.newPassword2 !== ""){
        //     if (this.state.user.password !== this.state.oldPassword){
        //         alert("Password Incorrect")
        //     }
        //     else if (this.state.newPassword1 !== this.state.newPassword2){
        //         alert("New passwords do not match")
        //     }
        //     else {
        //         changedPassword = this.state.newPassword1
        //     }
        // }
        const edits = {
            id: this.state.user.id,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            password: changedPassword
        }

        api.editUser(userToken, edits).then(res => console.log(res))

    }

    render(){
        if (!this.state.redirect){
            return (
                <React.Fragment>
                    <Typography variant="headline">Change Account Information</Typography>
                    <form onSubmit={this.registerUser}>
                        <TextField
                            id="firstName"
                            label="First Name"
                            type="text"
                            name="firstName"
                            variant="outlined"
                            defaultValue={this.state.user.firstName}
                            InputLabelProps={{ shrink: true }}
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
                            defaultValue={this.state.user.lastName}
                            InputLabelProps={{ shrink: true }}
                            required
                            onChange={this.handleFieldChange}
                        />
                        <TextField
                            id="oldPassword"
                            label="Current Password"
                            type="password"
                            name="oldPassword"
                            variant="outlined"
                            value={this.state.user.password}
                            onChange={this.handleFieldChange}
                        />
                        <TextField
                            id="newPassword1"
                            label="New Password"
                            type="password"
                            name="newPassword1"
                            variant="outlined"
                            onChange={this.handleFieldChange}
                        />
                        <TextField
                            id="newPassword2"
                            label="New Password Again"
                            type="password"
                            name="newPassword2"
                            variant="outlined"
                            onChange={this.handleFieldChange}
                        />
                        <Button variant="contained" color="primary" id="registerButton" type="submit" onSubmit={(e) => {e.preventDefault(); this.submitChanges()}}>Submit Changes</Button>

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