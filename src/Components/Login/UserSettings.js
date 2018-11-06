import React, { Component } from 'react'
import { Redirect } from "react-router-dom"
import api from "../Api/Api"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from "@material-ui/core/Grid"
import 'typeface-roboto';
import Lips from "../img/lips.png"

class UserSettings extends Component {

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
        api.userDetails(userToken).then(res => this.setState({ user: res }))
    }

    // Update state whenever an input field is edited
    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    handleClose = () => {
        this.setState({ open: false })
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
            .then(e =>
                this.setState((prevState) => {
                    this.props.location.props.getUpdatedInfo()
                    return { redirect: !prevState.redirect }
                })
            )

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
            .then(() => {
                sessionStorage.removeItem("loginToken")
                this.setState((prevState) => { return { redirect: !prevState.redirect } })
            })
    }

    render() {
        if (!this.state.redirect) {
            return (
                <React.Fragment>
                    <Grid
                        containter
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justify="center"
                        style={{ minHeight: '100vh' }}
                    >
                        {/* <div classes={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}> */}
                        <Grid item>
                            <Typography variant="h3" style={{ margin: 40 }} align="center">Change Account Information</Typography>
                        </Grid>
                        <Grid item>
                            <Typography align="center"><img src={Lips} alt="lips" style={{ height: 200 }}></img></Typography>
                        </Grid>
                        <form onSubmit={(e) => { e.preventDefault(); this.submitChanges() }}>
                            <Grid item align="center">
                                <TextField
                                    id="firstName"
                                    label="First Name"
                                    type="text"
                                    name="firstName"
                                    variant="standard"
                                    defaultValue={this.state.user.firstName}
                                    // InputLabelProps={{ shrink: true }}
                                    autoFocus
                                    onChange={this.handleFieldChange}
                                    style={{ margin: 25 }}
                                />
                                <TextField
                                    id="lastName"
                                    label="Last Name"
                                    type="text"
                                    name="lastName"
                                    variant="standard"
                                    defaultValue={this.state.user.lastName}
                                    // InputLabelProps={{ shrink: true }}
                                    onChange={this.handleFieldChange}
                                    style={{ margin: 25 }}
                                />
                                <TextField
                                    id="avatarUrl"
                                    label="Avatar Url"
                                    type="text"
                                    name="avatarUrl"
                                    variant="standard"
                                    defaultValue={this.state.user.avatarUrl}
                                    // InputLabelProps={{ shrink: true }}
                                    onChange={this.handleFieldChange}
                                    style={{ margin: 25 }}
                                />
                            </Grid>
                            <Grid item align="center">
                                <Button variant="contained" color="primary" id="registerButton" type="submit">
                                    {(this.state.firstName !== "" || this.state.lastName !== "" || this.state.avatarUrl !== "")
                                        ? "Submit Changes"
                                        : "Back Home"
                                    }
                                </Button>
                            </Grid>
                        </form>

                        <Grid item align="center">
                            <Button variant="text" color="secondary" style={{ marginTop: 30, fontSize: '1.2rem' }} onClick={() => this.setState({ open: true })}>Delete Account</Button>
                        </Grid>
                    </Grid>


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
            return <Redirect to={{
                pathname: '/',
                state: { user: this.state.user }
            }} />
        }
    }
}

export default UserSettings;