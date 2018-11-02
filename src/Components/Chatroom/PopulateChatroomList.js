import React from "react"
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Add from "@material-ui/icons/Add"
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography"

const classes = {
    list: {
        width: 250,
      }
}

const PopulateChatroomList = (props) => {
     return (   
        <div className={classes.list}>
            <List>
                <Typography variant="display1">Chat Rooms</Typography>
                {props.chatrooms.map((room, index) => (
                <div key={index}>
                    <ListItem button key={room.title} onClick={() => props.toggleDrawer(false)}>
                    <ListItemText primary={room.title} id={room.title} onClick={(e) => {
                        props.clearMessages()                        
                        props.removeFromChatroom()
                        props.setCurrentChatroom(e, e.currentTarget.id)
                        // props.setCurrentChatroom(e, e.currentTarget.id)
                        // props.hubConnection.invoke("AddToGroup", e.currentTarget.id, `${props.user.firstName} ${props.user.lastName}`)
                    }} />
                    {/* <IconButton id={room.title} onClick={(e) => {
                        props.clearMessages()                        
                        props.removeFromChatroom()
                        props.setCurrentChatroom(e, e.currentTarget.id)
                        // props.setCurrentChatroom(e, e.currentTarget.id)
                        // props.hubConnection.invoke("AddToGroup", e.currentTarget.id, `${props.user.firstName} ${props.user.lastName}`)
                    }}><Add /></IconButton> */}
                    </ListItem>
                    </div>
          ))}
        </List>
        <IconButton><Add /></IconButton>
      </div>
        )
    }

    export default withStyles(classes)(PopulateChatroomList)
