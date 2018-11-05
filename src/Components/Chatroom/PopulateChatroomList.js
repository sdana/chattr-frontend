import React, { Component } from "react"
import { Redirect } from "react-router-dom"
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Add from "@material-ui/icons/Add"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import { withStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from "@material-ui/core/Divider"
import RemoveCircle from "@material-ui/icons/RemoveCircle"
import IconButton from "@material-ui/core/IconButton"
import api from "../Api/Api"


const classes = {
    list: {
        width: 250,
      },  
}


class PopulateChatroomList extends Component {
    state = {
        open: false,
        redirect: false
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };
    
    handleClose = () => {
        this.setState({ open: false });
    };

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    createNewChatRoom = (token, chatName) => {
        if (this.state.name == null){
            alert("chatroom name cannot be null")
        }
        else {
            let token = sessionStorage.getItem("loginToken")
            api.createChatRoom(token, this.state.name, this.props.user.id).then(res => console.log(res))
        }
    }

    removeChatroom = (e) => {
        console.log(e.currentTarget.id)
        const token = sessionStorage.getItem("loginToken")
        api.deleteChatRoom(token, e.currentTarget.id).then(res => {
            console.log(res)
            this.props.removeAllUsersFromChat(res.title)
        })
    }


    render(){
        if (this.state.open === false){
        return (   
            <div className={classes.list}>
                <List>
                    <Typography variant="display1" style={{margin:20}}>Chat Rooms</Typography>
                    <Divider />
                    {this.props.chatrooms.map((room, index) => (
                    <div key={index}>
                        <ListItem button key={room.title} onClick={() => this.props.toggleDrawer(false)}>
                        <ListItemText primary={room.title} id={room.title} onClick={(e) => {
                            this.props.clearMessages()                        
                            this.props.removeFromChatroom()
                            this.props.setCurrentChatroom(e, e.currentTarget.id)
                        }} />
                        {(this.props.user.id === room.userId) ? <RemoveCircle id={room.chatroomId} onClick={this.removeChatroom} color="secondary"></RemoveCircle> : null}
                        </ListItem>
                        </div>
            ))}
            </List>
            {/* <IconButton onClick={() => {this.handleClickOpen();}}><Add /></IconButton> */}
            <Button variant="fab" color="primary" aria-label="add" style={{margin:20}} onClick={() => {this.handleClickOpen();}}><Add /></Button>
        </div>
        )}

        /*------------------------------------------Dialog for creating chat room ------------------------------------*/
        else if (this.state.open === true){
            return (
                <React.Fragment>
                <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Create New Chat Room</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Please enter a title for the room
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Chat Name"
                    type="text"
                    fullWidth
                    autoComplete="no"
                    onChange={this.handleFieldChange}
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                    Cancel
                </Button>
                <Button variant="raised" onClick={() => { this.props.toggleDrawer(); this.handleClose(); this.createNewChatRoom()}} color="primary">
                    Create
                </Button>
                </DialogActions>
            </Dialog>
            </React.Fragment>
            )
        }
        else if (this.state.redirect === true){
            return (
                <Redirect to="/" />
            )
        }
        }
}

    export default withStyles(classes)(PopulateChatroomList)
