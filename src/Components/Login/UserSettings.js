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
            avatarUrl: (this.state.avatarUrl) ? this.state.avatarUrl : this.state.user.avatarUrl
        }

        api.editUser(userToken, edits, this.state.user.id)
        .then(this.setState((prevState) => {return {redirect: !prevState.redirect}}))

    }

    render(){
        if (!this.state.redirect){
            return (
                <React.Fragment>
                    <Typography variant="headline">Change Account Information</Typography>
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
                        <Button variant="contained" color="primary" id="registerButton" type="submit">Submit Changes</Button>

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