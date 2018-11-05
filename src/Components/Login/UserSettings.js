import React, { Component } from 'react'
import {Redirect} from "react-router-dom"
import api from "../Api/Api"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import 'typeface-roboto';

export default class UserSettings extends Component {

    state = {
        redirect: false,
        open: false,
        firstName: "",
        lastName: "",
        avatarUrl: "",
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

    submitChanges = () => {
        const userToken = sessionStorage.getItem("loginToken")
        const edits = {
            Id: this.state.user.id,
            firstName: (this.state.firstName) ? this.state.firstName : this.state.user.firstName,
            lastName: (this.state.lastName) ? this.state.lastName : this.state.user.lastName,
            avatarUrl: (this.state.avatarUrl) ? this.state.avatarUrl : this.state.user.avatarUrl,
            isActive: true
        }

        api.editUser(userToken, edits, this.state.user.id)
        .then(this.setState((prevState) => {return {redirect: !prevState.redirect}}))

    }

    setUserInactive = () => {
        const userToken = sessionStorage.getItem("loginToken")
        const edits = {
            Id: this.state.user.id,
            firstName: (this.state.firstName) ? this.state.firstName : this.state.user.firstName,
            lastName: (this.state.lastName) ? this.state.lastName : this.state.user.lastName,
            avatarUrl: (this.state.avatarUrl) ? this.state.avatarUrl : this.state.user.avatarUrl,
            isActive: false
        }

        api.editUser(userToken, edits, this.state.user.id)
        .then( () => {
            sessionStorage.removeItem("loginToken")
            this.setState((prevState) => {return {redirect: !prevState.redirect}})
        })
    }

    render(){
        if (!this.state.redirect){
            return (
                <React.Fragment>
                    <Typography variant="h3">Change Account Information</Typography>
                    <form onSubmit={(e) => {e.preventDefault(); this.submitChanges()}}>
                        <TextField
                            id="firstName"
                            label="First Name"
                            type="text"
                            name="firstName"
                            variant="outlined"
                            defaultValue={this.state.user.firstName}
                            InputLabelProps={{ shrink: true }}
                            autoFocus
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
                            onChange={this.handleFieldChange}
                        />
                        <TextField
                            id="avatarUrl"
                            label="Avatar Url"
                            type="text"
                            name="avatarUrl"
                            variant="outlined"
                            defaultValue={this.state.user.avatarUrl}
                            InputLabelProps={{ shrink: true }}
                            onChange={this.handleFieldChange}
                        />
                        <Button variant="contained" color="primary" id="registerButton" type="submit">
                            {(this.state.firstName !== "" || this.state.lastName !== "" || this.state.avatarUrl !== "") 
                                ? "Submit Changes" 
                                : "Back Home"
                            }
                        </Button>
                    </form>

                    <Button variant="text" color="secondary" onClick={() => this.setState({open: true})}>Delete Account</Button>
                        
                    
                    
                    {/* <-----------------Alert Dialog if user wants to delete account --------------------------------------------->*/}
                    <Dialog 
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                         <DialogContent>
                            {/* <DialogContentText id="alert-dialog-description"> */}
                                <Typography variant="h4" color="secondary">Are you sure you want to delete your account?</Typography>
                                <Typography variant="h6">This action cannot be undone</Typography> 
                            {/* </DialogContentText> */}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">Cancel</Button>
                            <Button color="secondary" variant="contained" onClick={this.setUserInactive}>Confirm Delete</Button>
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