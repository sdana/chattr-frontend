import React from 'react';
import { Redirect } from "react-router-dom"
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import api from "../Api/Api"
import Drawer from '@material-ui/core/Drawer';
import Chatroom from "../Chatroom/Chatroom"
import { HubConnectionBuilder, LogLevel } from "@aspnet/signalr"
import PopulateChatroomList from "../Chatroom/PopulateChatroomList"

//use new materialUI typography variants
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  plusIcon: {
    display: 'inline'
  },
  typography: {
    useNextVariants: true,
  },
};

class MainPage extends React.Component {
  state = {
    auth: true,
    anchorEl: null,
    user: {},
    logout: false,
    showDrawer: false,
    chatrooms: [],
    currentChatroom: "",
    messages: [] 
  };

  componentDidMount = () => {
    const userToken = sessionStorage.getItem("loginToken")
    api.userDetails(userToken).then(res => this.setState({user: res}))
    api.getAllChatrooms(userToken).then(res => this.setState({chatrooms: res, userToken: userToken}))

    const hubConnection = new HubConnectionBuilder()
        .withUrl("http://localhost:5555/Hubs/ChatHub")
        .configureLogging(LogLevel.Information)
        .build();

      this.setState({ hubConnection }, () => {
            this.state.hubConnection
            .start({withCredentials: false})
            .then(() => console.log('Connection started!'))
            .catch(err => console.log('Error while establishing connection :('));
        
        });
        
        hubConnection.on("downloadMessage", incomingMessage =>{
            this.receiveMessage(incomingMessage)
        })
      
  }

  receiveMessage = (incomingMessage) => {
    let newMessage = this.state.messages
            newMessage.push(incomingMessage)
            this.setState({messages: newMessage})
  }

  sendMessage = (e, message) => {
    e.preventDefault()
    console.log("sending message", message)
    if (this.state.hubConnection){
      console.log("Sending message")
      this.state.hubConnection.invoke("NewMessage", message, this.state.currentChatroom).catch(err => console.error(err.toString()))
    //   this.setState({
    //     switcher: !this.state.switcher
    //   })
    }
  
  }
  

  toggleDrawer = (open) => {
    api.getAllChatrooms(this.state.userToken).then(res => this.setState({chatrooms: res, showDrawer: open}))
  };

  logout = () => {
    sessionStorage.removeItem("loginToken")
    this.setState({logout: true})
  }

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  setCurrentChatroom = (room) => {
    this.setState({currentChatroom: room})
  }

  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const sideList = (
      <PopulateChatroomList setCurrentChatroom={this.setCurrentChatroom} hubConnection={this.state.hubConnection} chatrooms={this.state.chatrooms} toggleDrawer={this.toggleDrawer} />
    )

    return (
      (this.state.logout) 
      ? 
      <Redirect to="/" /> 
      :
      <React.Fragment>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={() => this.toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer open={this.state.showDrawer} onClose={() => this.toggleDrawer(false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={() => this.toggleDrawer(false)}
            onKeyDown={() => this.toggleDrawer(false)}
          >
          </div>
          {sideList}
        </Drawer>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Welcome to Chattr {(this.state.user) ? `${this.state.user.firstName} ${this.state.user.lastName}` : ""}
            </Typography>
            {auth && (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                  <MenuItem onClick={() => {
                    this.handleClose()
                    this.logout()

                  }}>Logout</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
      <div>
        <Chatroom currentRoom={this.state.currentChatroom} messages={this.state.messages} sendMessage={this.sendMessage} hubConnection={this.state.hubConnection} />
      </div>
    </React.Fragment>
    );
  }
}

export default withStyles(styles)(MainPage);