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
import Avatar from "@material-ui/core/Avatar"
import api from "../Api/Api"
import Drawer from '@material-ui/core/Drawer';
import Chatroom from "../Chatroom/Chatroom"
import { HubConnectionBuilder, LogLevel } from "@aspnet/signalr"
import PopulateChatroomList from "../Chatroom/PopulateChatroomList"
import 'typeface-roboto';
import Lips from "../img/lips.png"

//use new materialUI typography variants
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

const ipAddr = "https://chattrapi.azurewebsites.net"

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
  headline: {
    display: 'block'
  },
  // avatar: {
  //   borderRadius: '40%',
  // }
};

class MainPage extends React.Component {
  state = {
    auth: true,
    anchorEl: null,
    user: {},
    logout: false,
    showDrawer: false,
    settingsPage: false,
    chatrooms: [],
    currentChatroom: "",
    messages: [],
    previousMessages: [] 
  };

  componentDidMount = () => {
    const userToken = sessionStorage.getItem("loginToken")
    api.userDetails(userToken).then(res => this.setState( (prevState) => {return {user: res}}))
    api.getAllChatrooms(userToken).then(res => this.setState({chatrooms: res, userToken: userToken})).then(console.log(this.state.chatrooms))

    const hubConnection = new HubConnectionBuilder()
        .withUrl(`${ipAddr}/Hubs/ChatHub`)
        .configureLogging(LogLevel.Information)
        .build();

      this.setState({ hubConnection }, () => {
            this.state.hubConnection
            .start({withCredentials: false})
            .then(() => console.log('Connection started!'))
            .catch(err => console.log('Error while establishing connection :('));
        
        });
        
        hubConnection.on("downloadMessage", (incomingMessage, groupName) =>{
            // this.receiveMessage(incomingMessage, groupName)
            console.log(groupName)
            let newMessage = this.state.messages
            newMessage.push(incomingMessage)
            // this.setState({messages: newMessage})
            this.setState((prevState) => {
              return {messages: newMessage}
            })
        })

        hubConnection.on("downloadPreviousMessages", chatroomName => {
            const userToken = sessionStorage.getItem("loginToken")
            api.getPreviousChatroomMessages(userToken, this.state.currentChatroom).then(res => this.setState({previousMessages: res}))
        })

        hubConnection.on("chatClosed", groupName => {
          alert("This chat has ended.")
          this.removeFromChatroom()
        })
      
  }

  removeAllUsersFromChat = (groupName) => {
    this.state.hubConnection.invoke("RemoveAllUsersFromChat", groupName)
  }

  removeFromChatroom = () => {
    if (this.state.currentChatroom){
      this.state.hubConnection.invoke("RemoveFromChat", this.state.currentChatroom, `${this.state.user.firstName} ${this.state.user.lastName}`)
      this.setState({currentChatroom: ""})
    }
  }

  getUpdatedUserInfo = () => {
    const userToken = sessionStorage.getItem("loginToken")
    api.userDetails(userToken).then(res => this.setState({user: res}))
  }

  sendMessage = (e, message) => {
    e.preventDefault()
    const userToken = sessionStorage.getItem("loginToken")
    let user = `${this.state.user.firstName} ${this.state.user.lastName}`
    let avatar = `${this.state.user.avatarUrl}`
    let newMessage = {
      user: user,
      avatar: avatar,
      message: message
    }
    console.log("sending message", message)
    if (this.state.hubConnection){
      console.log("Sending message")
      this.state.hubConnection.invoke("NewMessage", newMessage, this.state.currentChatroom,).catch(err => console.error(err.toString()))
      api.writeMessageToDb(newMessage.message, this.state.currentChatroom, this.state.user.id, userToken)
    }
  
  }

  clearMessagesOnRoomChange = () => {
    this.setState({messages: []})
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

  setCurrentChatroom = (e, room) => {
    let joinMessage = {
      avatar: this.state.user.avatarUrl,
      user: `${this.state.user.firstName} ${this.state.user.lastName}`,
      message: `Has joined ${e.currentTarget.id}`
    }
    this.state.hubConnection.invoke("AddToGroup", e.currentTarget.id, joinMessage)
    this.setState(() => {
      return {currentChatroom: room}
    })
  }

  joinChatAfterCreate = (room) => {
    if (this.state.currentChatroom)
    {
      this.removeFromChatroom()
    }
    let joinMessage = {
      avatar: this.state.user.avatarUrl,
      user: `${this.state.user.firstName} ${this.state.user.lastName}`,
      message: `Has joined ${room}`
    } 
    this.state.hubConnection.invoke("AddToGroup", room, joinMessage)
    this.setState(() => {
      return {
        currentChatroom: room, 
        messages: []
      }
    })
  }

  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const sideList = (
      <PopulateChatroomList 
        toggleDrawer={this.toggleDrawer}
        user={this.state.user}
        setCurrentChatroom={this.setCurrentChatroom}
        hubConnection={this.state.hubConnection}
        chatrooms={this.state.chatrooms}
        clearMessages={this.clearMessagesOnRoomChange}
        removeFromChatroom={this.removeFromChatroom}
        removeAllUsersFromChat={this.removeAllUsersFromChat}
        joinChatAfterCreate={this.joinChatAfterCreate}
      />
    )

    return (
      (this.state.logout) 
      ? 
      <Redirect to="/" /> 
      :
        (this.state.settingsPage)
          ?
          // <Redirect to="/userSettings"/>
          <Redirect to={{
            pathname: '/userSettings',
            props: {getUpdatedInfo: this.getUpdatedUserInfo}
          }} />
          
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
            <Typography variant="h5" color="inherit" className={classes.grow}>
              {(this.state.user) ? `${this.state.user.firstName} ${this.state.user.lastName}` : ""}
            </Typography>
            <Typography variant="caption" color="inherit" className={classes.grow}>
              {(this.state.currentChatroom) ? `Chatting in: ${this.state.currentChatroom}` : ""}
            </Typography>
            {auth && (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  {(this.state.user.avatarUrl) ? <Avatar src={this.state.user.avatarUrl} /> : <AccountCircle style={{height:40,width:40}}/>}
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
                  <MenuItem onClick={() => {
                    this.setState({settingsPage: true})
                    this.handleClose()}}>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={() => {
                    this.handleClose()
                    this.logout()}}>
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
      <div>
        {(this.state.currentChatroom) 
          ? <Chatroom 
              currentRoom={this.state.currentChatroom} 
              messages={this.state.messages} 
              sendMessage={this.sendMessage} 
              previousMessages={this.state.previousMessages} /> 
          : <div style={{marginTop:50}}>
              <Typography variant="h2" color="textPrimary" align="center">Welcome to Chattr!</Typography>
              <Typography align="center"><img src={Lips} alt="lips" style={{height:200}}></img></Typography>
              <Typography variant="h4" color="textSecondary" align="center">Please select a chat room from the left menu</Typography>
            </div>}
      </div>
    </React.Fragment>
    );
  }
}

export default withStyles(styles)(MainPage);